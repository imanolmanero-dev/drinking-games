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
  const status = typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code?: unknown }).code ?? 'desconocido')
    : 'desconocido';
  return `${name}: la API no completó el informe (código ${status}).`;
}

async function fetchSeoData() {
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
  const dateCoverage = await discoverDateCoverage(async (requestBody: searchconsole_v1.Schema$SearchAnalyticsQueryRequest) => {
    const response = await searchconsole.searchanalytics.query({ siteUrl: SITE_URL, requestBody });
    return response.data;
  }, new Date());
  if (dateCoverage.status !== 'verified') {
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

  const generatedAt = new Date().toISOString();
  const publishedEnglishPages = publishedRoutes('en-US').map((route) => absoluteUrl(route.pathname));
  const snapshot = buildSeoSnapshot({ generatedAt, periods, dateCoverage, reports, reportRuns, publishedEnglishPages });
  validateSeoSnapshot(snapshot);
  const markdown = renderSeoMarkdown(snapshot);

  fs.writeFileSync(OUTPUT_MD, markdown, 'utf8');
  fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

  console.log(`Extracción terminada: ${snapshot.dataQuality.reportsSucceeded}/${snapshot.dataQuality.reportsRequested} informes completados.`);
}

fetchSeoData().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Error desconocido';
  console.error(`Error al generar el reporting SEO: ${message}`);
  process.exitCode = 1;
});
