import { google, type searchconsole_v1 } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { publishedRoutes } from '../lib/i18n/routes';
import { absoluteUrl } from '../lib/i18n/locales';
import {
  EN_TOTAL_DEFINITION,
  REPORT_DEFINITIONS,
  buildSeoSnapshot,
  discoverDateCoverage,
  renderSeoMarkdown,
  safeApiFailure,
  validateSeoSnapshot,
} from './seo-reporting.mjs';

dotenv.config();

const SITE_URL = 'https://bebergames.com/';
const OUTPUT_MD = path.join(process.cwd(), 'SEO_DATA.md');
const OUTPUT_JSON = path.join(process.cwd(), 'seo-data.json');
const PERIOD_NAMES = ['current', 'previous'] as const;

type PeriodName = (typeof PERIOD_NAMES)[number];
type ApiRow = {
  clicks?: number | null;
  impressions?: number | null;
  ctr?: number | null;
  position?: number | null;
  keys?: string[] | null;
};

type ReportRun = {
  name: string;
  period: PeriodName;
  key: string;
  dimensions: readonly string[];
  rowLimit: number;
  rows: ApiRow[];
  succeeded: boolean;
  warning?: string;
  responseAggregationType?: string | null;
  invalidResponse?: boolean;
};

function safeFailureWarning(name: string, error: unknown) {
  const status = safeApiFailure(error).httpStatus ?? 'desconocido';
  return `${name}: la API no completó el informe (código ${status}).`;
}

function preservedArtifactInfo(now: Date) {
  try {
    const artifact = JSON.parse(fs.readFileSync(OUTPUT_JSON, 'utf8'));
    const timestamp = typeof artifact.updatedAt === 'string' && Number.isFinite(Date.parse(artifact.updatedAt))
      ? new Date(artifact.updatedAt).toISOString() : null;
    return {
      preservedArtifactSchemaVersion: [3, 4].includes(artifact.schemaVersion) ? artifact.schemaVersion : null,
      preservedArtifactTimestamp: timestamp,
      preservedArtifactAge: timestamp === null ? null : Math.max(0, (now.getTime() - Date.parse(timestamp)) / 1000),
    };
  } catch {
    return { preservedArtifactSchemaVersion: null, preservedArtifactTimestamp: null, preservedArtifactAge: null };
  }
}

async function fetchSeoData() {
  const now = new Date();
  const preserved = preservedArtifactInfo(now);
  let dateCoverage: Awaited<ReturnType<typeof discoverDateCoverage>> | null = null;
  let finalWorkflowOutcome = 'API_FAILURE';
  let reportsWritten = false;
  try {
    console.log('Iniciando extracción de datos SEO...');

    const credentials = process.env.GCP_CREDENTIALS;
    if (!credentials) {
      throw new Error('Falta la variable GCP_CREDENTIALS.');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    dateCoverage = await discoverDateCoverage(async (requestBody: searchconsole_v1.Schema$SearchAnalyticsQueryRequest) => {
      const response = await searchconsole.searchanalytics.query({ siteUrl: SITE_URL, requestBody });
      return response.data;
    }, now, (diagnostic) => {
      console.log(JSON.stringify({ event: 'seo_coverage_probe', siteUrl: SITE_URL, ...diagnostic }));
    });
    if (dateCoverage.status !== 'verified') {
      finalWorkflowOutcome = dateCoverage.status === 'unverified' ? 'COVERAGE_UNRESOLVED'
        : dateCoverage.reason === 'request_failed' ? 'API_FAILURE' : 'INVALID_COVERAGE_RESPONSE';
      console.error(`Cobertura temporal ${dateCoverage.status} (${dateCoverage.reason}); no se reemplazan los informes existentes.`);
      throw new Error(`Cobertura temporal ${dateCoverage.status} (${dateCoverage.reason}); no se reemplazan los informes existentes.`);
    }
    const periods = dateCoverage.periods!;

    console.log(`Corte temporal por metadata: first_incomplete_date=${dateCoverage.firstIncompleteDate}; se excluye esa fecha y las posteriores.`);
    console.log(`Actual: ${periods.current.start} a ${periods.current.end}`);
    console.log(`Anterior: ${periods.previous.start} a ${periods.previous.end}`);

    const requests = PERIOD_NAMES.flatMap((period) => [...REPORT_DEFINITIONS, EN_TOTAL_DEFINITION].map((definition) => ({
      period,
      definition,
      name: `${period}.${definition.key}`,
    })));

    const reportRuns: ReportRun[] = await Promise.all(requests.map(async ({ period, definition, name }) => {
      try {
        const requestBody: searchconsole_v1.Schema$SearchAnalyticsQueryRequest = {
          startDate: periods[period].start,
          endDate: periods[period].end,
          rowLimit: definition.rowLimit,
          dataState: 'final',
          type: 'web',
        };

        // La ausencia de `dimensions` es intencionada: este informe aporta los
        // totales globales y no se reconstruye sumando un top dimensional.
        if (definition.dimensions.length > 0) {
          requestBody.dimensions = [...definition.dimensions];
        }
        if (definition.key === EN_TOTAL_DEFINITION.key) {
          requestBody.dimensionFilterGroups = EN_TOTAL_DEFINITION.dimensionFilterGroups;
          requestBody.aggregationType = 'auto';
        }

        const response = await searchconsole.searchanalytics.query({
          siteUrl: SITE_URL,
          requestBody,
        });

        return {
          name,
          period,
          key: definition.key,
          dimensions: definition.dimensions,
          rowLimit: definition.rowLimit,
          rows: Array.isArray(response.data.rows) ? response.data.rows : [],
          succeeded: true,
          responseAggregationType: response.data.responseAggregationType ?? null,
          invalidResponse: response.data.rows != null && !Array.isArray(response.data.rows),
        };
      } catch (error: unknown) {
        return {
          name,
          period,
          key: definition.key,
          dimensions: definition.dimensions,
          rowLimit: definition.rowLimit,
          rows: [],
          succeeded: false,
          warning: safeFailureWarning(name, error),
        };
      }
    }));

    const reports = {
      current: Object.fromEntries(reportRuns
        .filter((report) => report.period === 'current')
        .map((report) => [report.key, report.rows])),
      previous: Object.fromEntries(reportRuns
        .filter((report) => report.period === 'previous')
        .map((report) => [report.key, report.rows])),
    };

    const generatedAt = now.toISOString();
    const publishedEnglishPages = publishedRoutes('en-US').map((route) => absoluteUrl(route.pathname));
    finalWorkflowOutcome = 'SNAPSHOT_VALIDATION_FAILURE';
    const snapshot = buildSeoSnapshot({ generatedAt, periods, dateCoverage, reports, reportRuns, publishedEnglishPages });
    validateSeoSnapshot(snapshot);
    const markdown = renderSeoMarkdown(snapshot);

    finalWorkflowOutcome = 'ARTIFACT_WRITE_FAILURE';
    fs.writeFileSync(OUTPUT_MD, markdown, 'utf8');
    fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

    reportsWritten = true;
    finalWorkflowOutcome = 'REPORT_UPDATED';
    console.log(`Extracción terminada: ${snapshot.dataQuality.reportsSucceeded}/${snapshot.dataQuality.reportsRequested} informes completados.`);
  } catch {
    // Never serialize arbitrary errors: auth/SDK errors can embed credentials or request bodies.
    console.error(`Error al generar el reporting SEO: ${finalWorkflowOutcome}`);
    process.exitCode = 1;
  } finally {
    const classify = (attempt: NonNullable<typeof dateCoverage>['attempts'][number] | undefined) => attempt
      ? { status: attempt.coverage.status, reason: attempt.coverage.reason } : 'not_attempted';
    console.log(JSON.stringify({
      event: 'seo_reporting_outcome',
      primaryClassification: classify(dateCoverage?.attempts[0]),
      retryClassification: classify(dateCoverage?.attempts[1]),
      selectedCutoff: dateCoverage?.status === 'verified' ? dateCoverage.firstIncompleteDate : null,
      selectedPeriods: dateCoverage?.status === 'verified' ? dateCoverage.periods : null,
      finalWorkflowOutcome, reportsWritten,
      ...preserved,
      exitCode: reportsWritten ? 0 : 1,
    }));
  }
}

fetchSeoData();
