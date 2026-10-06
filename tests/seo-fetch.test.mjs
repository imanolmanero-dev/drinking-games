import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import * as reporting from '../scripts/seo-reporting.mjs';

function loadRegistryModule(file, dependencies = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, { exports, require: (name) => dependencies[name] });
  return exports;
}
const locales = loadRegistryModule('lib/i18n/locales.ts');
const routes = loadRegistryModule('lib/i18n/routes.ts', { './locales': locales });

// Run the actual extractor with an in-memory API and filesystem. No credentials,
// network, generated files or execution of the real CLI are involved.
const code = ts.transpileModule(readFileSync('scripts/fetch-seo-data.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const instant = '2026-09-28T02:40:00Z';
const metrics = { clicks: 10, impressions: 100, ctr: 0.1, position: 5 };
const metadata = { first_incomplete_date: '2026-09-25' };
// The all response includes the partial date described by its metadata.
const dates = Array.from({ length: 15 }, (_, index) => ({
  keys: [`2026-09-${String(index + 11).padStart(2, '0')}`], ...metrics,
}));

async function runExtractor(reply, { artifacts = new Map(), reportingOverrides = {} } = {}) {
  const requests = [], writes = [], errors = [], logs = [], snapshots = [], capturedRuns = [];
  const processMock = { env: { GCP_CREDENTIALS: '{}' }, cwd: () => '/memory', exitCode: undefined };
  const modules = {
    googleapis: { google: {
      auth: { GoogleAuth: class {} },
      searchconsole: () => ({ searchanalytics: { query: async ({ requestBody }) => {
        requests.push(requestBody);
        const response = await reply(requestBody);
        return { data: response && typeof response === 'object' && !Array.isArray(response)
          ? { responseAggregationType: requestBody.dimensionFilterGroups ? 'byPage' : 'byProperty', ...response }
          : response };
      } } }),
    } },
    'node:fs': {
      readFileSync: (file) => {
        if (!artifacts.has(path.basename(file))) throw new Error('ENOENT');
        return artifacts.get(path.basename(file));
      },
      writeFileSync: (...args) => {
        writes.push(args);
        artifacts.set(path.basename(args[0]), args[1]);
      },
    },
    'node:path': path,
    dotenv: { config() {} },
    './seo-reporting.mjs': { ...reporting, buildSeoSnapshot: (...args) => {
      capturedRuns.push(...args[0].reportRuns);
      const snapshot = reporting.buildSeoSnapshot(...args);
      snapshots.push(snapshot);
      return snapshot;
    }, ...reportingOverrides },
    '../lib/i18n/routes': routes,
    '../lib/i18n/locales': locales,
  };
  await vm.runInNewContext(code, {
    exports: {}, require: (name) => {
      assert.ok(Object.hasOwn(modules, name), name);
      return modules[name];
    },
    process: processMock,
    console: { log: (message) => logs.push(message), error: (message) => errors.push(message) },
    Date: class extends Date { constructor(...args) { super(...(args.length ? args : [instant])); } },
  });
  const diagnostics = logs.filter((line) => line.startsWith('{')).map((line) => JSON.parse(line));
  return { requests, writes, errors, logs, diagnostics, snapshots, capturedRuns, artifacts, exitCode: processMock.exitCode };
}

test('extractor usa metadata all y 14 informes final: exactamente 15 peticiones, sin duplicar dimensiones EN', async () => {
  const run = await runExtractor((request) => request.dimensions?.[0] === 'date'
    ? { rows: dates, metadata } : { rows: request.dimensions ? [] : [metrics] });
  assert.equal(run.exitCode, undefined);
  assert.equal(run.requests.length, 15);
  assert.deepEqual([...run.requests[0].dimensions], ['date']);
  assert.equal(run.requests[0].dataState, 'all');
  assert.equal(run.requests[0].endDate, '2026-09-27');
  assert.equal(run.requests[0].type, 'web');
  for (const request of run.requests.slice(1)) {
    assert.equal(request.dataState, 'final');
    assert.equal(request.type, 'web');
  }
  for (const request of run.requests.slice(1)) {
    assert.ok(['2026-09-07', '2026-09-14'].includes(request.startDate));
    assert.equal(request.endDate, request.startDate === '2026-09-07' ? '2026-09-13' : '2026-09-20');
  }
  assert.equal(run.requests.filter((request) => !request.dimensions).length, 4);
  const englishRequests = run.requests.filter((request) => request.dimensionFilterGroups);
  assert.equal(englishRequests.length, 2);
  for (const request of englishRequests) {
    assert.equal(request.dimensions, undefined);
    assert.equal(request.aggregationType, 'auto');
    assert.deepEqual(JSON.parse(JSON.stringify(request.dimensionFilterGroups)), reporting.EN_TOTAL_DEFINITION.dimensionFilterGroups);
  }
  assert.equal(run.requests.filter((request) => request.dimensions?.join() === 'page').length, 2);
  assert.equal(run.requests.filter((request) => request.dimensions?.join() === 'query,page').length, 2);
  assert.deepEqual(run.writes.map(([file]) => path.basename(file)).sort(), ['SEO_DATA.md', 'seo-data.json']);
  const snapshot = JSON.parse(run.writes.find(([file]) => file.endsWith('seo-data.json'))[1]);
  assert.equal(reporting.validateSeoSnapshot(snapshot), true);
  assert.equal(snapshot.schemaVersion, 4);
  assert.deepEqual(snapshot.english.publishedPages, Array.from(routes.publishedRoutes('en-US'), (route) => locales.absoluteUrl(route.pathname)).sort());
  assert.equal(snapshot.english.quality.totals.current.responseAggregationType, 'byPage');
  assert.equal(snapshot.dataQuality.reportsRequested, 14);
  assert.equal(snapshot.dataQuality.dateCoverage.status, 'mature_lag');
  assert.equal(snapshot.dataQuality.dateCoverage.firstIncompleteDate, '2026-09-25');
  assert.equal(outcomeLog(run).finalWorkflowOutcome, 'REPORT_UPDATED');
  assert.equal(outcomeLog(run).exitCode, 0);
});


const probeLogs = run => run.diagnostics.filter(item => item.event === 'seo_coverage_probe');
const outcomeLog = run => run.diagnostics.find(item => item.event === 'seo_reporting_outcome');
const successfulMetrics = request => ({ rows: request.dimensions ? [] : [metrics] });
const maturePeriods = {
  current: { start: '2026-09-14', end: '2026-09-20' },
  previous: { start: '2026-09-07', end: '2026-09-13' },
};

for (const [label, response] of [
  ['number', 42], ['boolean', true], ['string', 'bad'], ['array', []],
  ['null', null], ['undefined', undefined], ['function', () => {}],
  ['rows:null', { rows: null }], ['rows:object', { rows: {} }],
  ['rows:number', { rows: 42 }], ['rows:boolean', { rows: true }],
  ['rows:string', { rows: 'bad' }], ['rows:undefined', { rows: undefined }],
]) {
  test(`invalid metric envelope ${label} cannot write or enable publication`, async () => {
    const artifacts = new Map([['SEO_DATA.md', 'historical markdown'],
      ['seo-data.json', '{"schemaVersion":3,"updatedAt":"2026-09-21T02:40:00Z"}']]);
    const original = [...artifacts];
    const run = await runExtractor(request => request.dataState === 'all'
      ? { metadata: {} } : response, { artifacts });
    assert.equal(run.requests.length, 15);
    assert.equal(run.requests.filter(request => request.dataState === 'final').length, 14);
    assert.equal(run.capturedRuns.length, 14);
    assert.ok(run.capturedRuns.every(metric => metric.invalidResponse === true));
    assert.equal(run.writes.length, 0);
    assert.deepEqual([...artifacts], original);
    assert.equal(run.exitCode, 1);
    assert.equal(outcomeLog(run).exitCode, 1);
    assert.equal(outcomeLog(run).reportsWritten, false);
    assert.equal(outcomeLog(run).finalWorkflowOutcome, 'METRIC_REPORT_FAILURE');
  });
}

test('array rows and omitted rows are valid empty responses, never confirmed zero traffic', async () => {
  for (const response of [{ rows: [] }, {}]) {
    const run = await runExtractor(request => request.dataState === 'all' ? { metadata: {} } : response);
    assert.equal(run.requests.length, 15);
    assert.ok(run.capturedRuns.every(metric => metric.succeeded && !metric.invalidResponse));
    assert.equal(run.writes.length, 2);
    assert.equal(outcomeLog(run).finalWorkflowOutcome, 'REPORT_UPDATED');
    assert.equal(outcomeLog(run).exitCode, 0);
    const saved = JSON.parse(run.artifacts.get('seo-data.json'));
    assert.equal(reporting.validateSeoSnapshot(saved), true);
    assert.equal(saved.globalMetrics.current, null);
    assert.equal(saved.dataQuality.globalReports.current, 'empty_response');
    assert.equal(saved.english.totals.current, null);
    assert.equal(saved.english.quality.totals.current.status, 'empty_response');
  }
});

test('production 28-row missing cutoff and missing object each publish after one advisory', async () => {
  const productionRows = Array.from({ length: 28 }, (_, i) => ({ keys: [new Date(Date.parse('2026-08-31') + i * 86400000).toISOString().slice(0, 10)], ...metrics }));
  for (const [response, reason] of [[{ rows: productionRows, metadata: {} }, 'first_incomplete_date_absent'], [{ rows: productionRows }, 'metadata_object_absent']]) {
    const run = await runExtractor(request => request.dataState === 'all' ? response : successfulMetrics(request));
    assert.equal(run.requests.length, 15);
    assert.equal(run.requests.filter(r => r.dataState === 'all').length, 1);
    assert.equal(run.requests.filter(r => r.dataState === 'final').length, 14);
    assert.equal(run.writes.length, 2);
    assert.equal(run.exitCode, undefined);
    assert.equal(probeLogs(run)[0].responseRowCount, 28);
    assert.equal(probeLogs(run)[0].reason, reason);
    const saved = JSON.parse(run.artifacts.get('seo-data.json'));
    assert.equal(saved.schemaVersion, 4);
    assert.deepEqual(saved.periods, maturePeriods);
    assert.equal(saved.dataQuality.dateCoverage.metadataCutoffAvailable, false);
    assert.equal(reporting.validateSeoSnapshot(saved), true);
    assert.equal(outcomeLog(run).retryClassification, 'not_attempted');
    assert.equal(outcomeLog(run).finalWorkflowOutcome, 'REPORT_UPDATED');
    assert.equal(outcomeLog(run).exitCode, 0);
  }
});

test('valid advisory preserves default or shifts older without widening or retry', async () => {
  for (const [cutoff, sunday, adjusted] of [['2026-09-25', '2026-09-20', false], ['2026-09-20', '2026-09-13', true], ['2026-08-31', '2026-08-30', true]]) {
    const run = await runExtractor(request => request.dataState === 'all' ? { rows: [], metadata: { first_incomplete_date: cutoff } } : successfulMetrics(request));
    assert.equal(run.requests.length, 15);
    assert.equal(run.exitCode, undefined);
    const saved = JSON.parse(run.artifacts.get('seo-data.json'));
    assert.equal(saved.periods.current.end, sunday);
    assert.equal(saved.dataQuality.dateCoverage.metadataAdjusted, adjusted);
    assert.equal(saved.dataQuality.dateCoverage.metadataCutoff, cutoff);
    assert.equal(reporting.validateSeoSnapshot(saved), true);
    assert.equal(probeLogs(run)[0].responseRowCount, 0);
    assert.equal(saved.globalMetrics.current.clicks, 10);
  }
});

test('malformed advisory or transient probe failure continues with successful metrics', async () => {
  for (const response of [null, [], 'PRIVATE_ENVELOPE', { rows: {} }, ...[null, 'PRIVATE_METADATA', 1, [], true].map(metadata => ({ metadata })),
    ...[null, 1, true, {}, '2026-02-30', 'bad', '2026-09-28', '2026-08-30'].map(first_incomplete_date => ({ metadata: { first_incomplete_date } })),
    new Error('PRIVATE_PROBE_ERROR')]) {
    const run = await runExtractor(request => {
      if (request.dataState !== 'all') return successfulMetrics(request);
      if (response instanceof Error) throw response;
      return response;
    });
    assert.equal(run.requests.length, 15);
    assert.equal(run.writes.length, 2);
    assert.equal(run.exitCode, undefined);
    assert.equal(outcomeLog(run).finalWorkflowOutcome, 'REPORT_UPDATED');
    assert.equal(outcomeLog(run).metadataAdvisoryUnavailable, true);
    const saved = JSON.parse(run.artifacts.get('seo-data.json'));
    assert.deepEqual(saved.periods, maturePeriods);
    assert.equal(saved.dataQuality.dateCoverage.metadataCutoff, null);
    assert.doesNotMatch(JSON.stringify([run.logs, run.errors, saved]), /PRIVATE_ENVELOPE|PRIVATE_METADATA|PRIVATE_PROBE_ERROR/);
  }
});

test('authentication, property access and outage affecting metrics fail without invented traffic', async () => {
  for (const code of [401, 403, 503, 'PRIVATE_TOKEN']) {
    const run = await runExtractor(() => { throw { code, message: 'PRIVATE_TOKEN', response: { data: 'PRIVATE_BODY' } }; });
    assert.equal(run.requests.length, 15);
    assert.equal(run.exitCode, 1);
    assert.equal(probeLogs(run)[0].reason, 'request_failed');
    assert.equal(probeLogs(run)[0].httpStatus, typeof code === 'number' ? code : null);
    assert.equal(outcomeLog(run).finalWorkflowOutcome, 'METRIC_REPORT_FAILURE');
    const saved = run.snapshots[0];
    assert.equal(saved.globalMetrics.current, null);
    assert.equal(saved.globalMetrics.previous, null);
    assert.equal(saved.english.totals.current, null);
    assert.equal(saved.dataQuality.reportsSucceeded, 0);
    assert.equal(run.writes.length, 0);
    assert.equal(outcomeLog(run).reportsWritten, false);
    assert.doesNotMatch(JSON.stringify([run.logs, run.errors, saved]), /PRIVATE_TOKEN|PRIVATE_BODY/);
  }
});

test('repeated validation failures preserve v3/v4 bytes and expose stale age', async () => {
  for (const schemaVersion of [3, 4]) {
    const artifacts = new Map([['SEO_DATA.md', 'Historical markdown'], ['seo-data.json', JSON.stringify({ schemaVersion, updatedAt: '2026-09-21T02:40:00Z' })]]);
    const original = [...artifacts];
    for (let invocation = 0; invocation < 3; invocation++) {
      const run = await runExtractor(request => request.dataState === 'all' ? { metadata: {} } : successfulMetrics(request), {
        artifacts, reportingOverrides: { validateSeoSnapshot() { throw new Error('PRIVATE_VALIDATION'); } },
      });
      assert.deepEqual([...artifacts], original);
      assert.equal(run.requests.length, 15);
      assert.equal(run.writes.length, 0);
      assert.equal(run.exitCode, 1);
      assert.equal(outcomeLog(run).preservedArtifactSchemaVersion, schemaVersion);
      assert.equal(outcomeLog(run).preservedArtifactAge, 7 * 86400);
    }
  }
});




test('advisory auth-shaped failure alone does not hide successful metric access', async () => {
  for (const code of [401, 403, 503]) {
    const run = await runExtractor(request => {
      if (request.dataState === 'all') throw { code, message: 'PRIVATE_ERROR' };
      return successfulMetrics(request);
    });
    assert.equal(run.requests.length, 15);
    assert.equal(run.exitCode, undefined);
    assert.equal(outcomeLog(run).finalWorkflowOutcome, 'REPORT_UPDATED');
    assert.equal(probeLogs(run)[0].httpStatus, code);
    assert.doesNotMatch(run.logs.join(''), /PRIVATE_ERROR/);
  }
});

test('malformed metric envelopes and rows make Actions fail', async () => {
  for (const dimensions of ['query', 'country', 'device', 'page', 'query,page']) {
    for (const rows of [{}, [{ keys: ['bad'], clicks: 1 }]]) {
      const run = await runExtractor(request => request.dataState === 'all' ? { metadata: {} }
        : request.dimensions?.join() === dimensions ? { rows } : successfulMetrics(request));
      assert.equal(run.exitCode, 1);
      assert.equal(outcomeLog(run).exitCode, 1);
      assert.notEqual(outcomeLog(run).finalWorkflowOutcome, 'REPORT_UPDATED');
      assert.equal(run.writes.length, 0);
    }
  }
});

test('artifact write failure preserves error status and suppresses private details', async () => {
  const artifacts = new Map([['SEO_DATA.md', 'original'], ['seo-data.json', '{"schemaVersion":3}']]);
  artifacts.set = () => { throw new Error('PRIVATE_WRITE_FAILURE'); };
  const run = await runExtractor(request => request.dataState === 'all' ? { metadata: {} } : successfulMetrics(request), { artifacts });
  assert.equal(run.exitCode, 1);
  assert.equal(outcomeLog(run).finalWorkflowOutcome, 'ARTIFACT_WRITE_FAILURE');
  assert.equal(outcomeLog(run).reportsWritten, false);
  assert.equal(artifacts.get('SEO_DATA.md'), 'original');
  assert.doesNotMatch(run.errors.join(''), /PRIVATE_WRITE_FAILURE/);
});

test('validación fallida preserva informes y emite SNAPSHOT_VALIDATION_FAILURE', async () => {
  const artifacts = new Map([['SEO_DATA.md', 'original'], ['seo-data.json', '{"schemaVersion":3}']]);
  const original = [...artifacts];
  const run = await runExtractor((request) => request.dataState === 'all' ? { metadata } : successfulMetrics(request), {
    artifacts,
    reportingOverrides: { validateSeoSnapshot() { throw new Error('PRIVATE_VALIDATION'); } },
  });
  assert.equal(run.requests.length, 15);
  assert.equal(run.writes.length, 0);
  assert.deepEqual([...artifacts], original);
  assert.equal(run.exitCode, 1);
  assert.equal(outcomeLog(run).finalWorkflowOutcome, 'SNAPSHOT_VALIDATION_FAILURE');
  assert.doesNotMatch(JSON.stringify([run.logs, run.errors]), /PRIVATE_VALIDATION/);
});

test('diagnósticos completos contienen solo campos seguros y un instante de ejecución', async () => {
  const run = await runExtractor((request) => request.dataState === 'all' ? { rows: dates, metadata } : successfulMetrics(request));
  const probe = probeLogs(run)[0];
  for (const field of ['attempt', 'checkedAt', 'siteUrl', 'probeStartDate', 'probeEndDate', 'timeZone',
    'dataState', 'dimensions', 'type', 'rowLimit', 'responseRowCount', 'rowsPresent', 'metadataObjectPresent',
    'metadataType', 'firstIncompleteDatePresent', 'firstIncompleteDateValue', 'firstReturnedDate', 'lastReturnedDate',
    'classification', 'reason']) assert.ok(Object.hasOwn(probe, field), field);
  assert.equal(probe.timeZone, 'America/Los_Angeles');
  assert.equal(probe.responseRowCount, 15);
  assert.equal(probe.firstReturnedDate, '2026-09-11');
  assert.equal(probe.lastReturnedDate, '2026-09-25');
  assert.equal(outcomeLog(run).retryClassification, 'not_attempted');
  const saved = JSON.parse(run.artifacts.get('seo-data.json'));
  assert.equal(saved.updatedAt, probe.checkedAt);
  assert.equal(outcomeLog(run).exitCode, 0);
});

test('extractor guarda current desconocido cuando query/page descarta una observación malformada', async () => {
  const observed = { clicks: 1, impressions: 10, ctr: 0.1, position: 8 };
  for (const currentRows of [[{ keys: ['reviewed', 'https://bebergames.com/en'], ...observed, ctr: 2 }], {}]) {
    const run = await runExtractor((request) => {
      if (request.dimensions?.[0] === 'date') return { rows: dates, metadata };
      if (request.dimensions?.join() === 'query,page') return { rows: request.startDate === '2026-09-14'
        ? currentRows : [{ keys: ['reviewed', 'https://bebergames.com/en'], ...observed }] };
      return { rows: request.dimensions ? [] : [metrics] };
    });
    assert.equal(run.exitCode, 1);
    assert.equal(run.requests.length, 15);
    assert.equal(run.writes.length, 0);
    const saved = run.snapshots[0];
    const row = saved.queryPagesFull[0];
    assert.equal(saved.english.quality.queryPages.current.status, 'invalid_response');
    assert.equal(saved.dataQuality.queryPageDataset.current.apiResponseStatus, 'report_unavailable');
    assert.equal(row.currentStatus, 'unknown_report_unavailable');
    for (const metric of ['clicks', 'impressions', 'ctr', 'position']) assert.equal(row[metric], null);
    assert.deepEqual(row.previous, observed);
    assert.equal(row.difference, null);
    assert.equal(row.percentDelta, null);
    assert.equal(reporting.validateSeoSnapshot(saved), true);
  }
});

test('actividad dispersa y días finales omitidos no bloquean ni desplazan la extracción', async () => {
  for (const rows of [
    dates.filter((row) => row.keys[0] !== '2026-09-15'),
    [...dates.slice(0, 9), dates.at(-1)],
  ]) {
    const run = await runExtractor((request) => request.dimensions?.[0] === 'date'
      ? { rows, metadata } : { rows: request.dimensions ? [] : [metrics] });
    assert.equal(run.exitCode, undefined);
    assert.equal(run.writes.length, 2);
    const snapshot = JSON.parse(run.writes.find(([file]) => file.endsWith('seo-data.json'))[1]);
    assert.deepEqual(snapshot.periods, {
      current: { start: '2026-09-14', end: '2026-09-20' },
      previous: { start: '2026-09-07', end: '2026-09-13' },
    });
    assert.equal(snapshot.globalMetrics.current.clicks, 10);
  }
});

test('extractor retains failed global null semantics in memory without writing artifacts', async () => {
  const run = await runExtractor((request) => {
    if (request.dimensions?.[0] === 'date') return { rows: dates, metadata };
    if (!request.dimensions && request.startDate === '2026-09-14') throw { code: 503 };
    return { rows: request.dimensions ? [] : [metrics] };
  });
  assert.equal(run.exitCode, 1);
  assert.equal(run.writes.length, 0);
  const snapshot = run.snapshots[0];
  assert.equal(snapshot.globalMetrics.current, null);
  assert.equal(snapshot.globalMetrics.previous.clicks, 10);
  assert.equal(snapshot.globalMetrics.percentDelta, null);
  assert.equal(snapshot.dataQuality.globalReports.current, 'report_unavailable');
  assert.match(reporting.renderSeoMarkdown(snapshot), /Comparación global no disponible/);
  assert.doesNotMatch(JSON.stringify(snapshot), /-100/);
});

test('extractor distingue cero clics válidos de una respuesta global vacía', async () => {
  const zeroClicks = { clicks: 0, impressions: 100, ctr: 0, position: 5 };
  for (const rows of [[zeroClicks], []]) {
    const run = await runExtractor((request) => {
      if (request.dimensions?.[0] === 'date') return { rows: dates, metadata };
      return { rows: request.dimensions ? [] : request.startDate === '2026-09-14' ? rows : [metrics] };
    });
    assert.equal(run.exitCode, undefined);
    const snapshot = JSON.parse(run.writes.find(([file]) => file.endsWith('seo-data.json'))[1]);
    if (rows.length) {
      assert.equal(snapshot.globalMetrics.current.clicks, 0);
      assert.equal(snapshot.globalMetrics.percentDelta.clicks, -100);
    } else {
      assert.equal(snapshot.globalMetrics.current, null);
      assert.equal(snapshot.globalMetrics.percentDelta, null);
      assert.equal(snapshot.dataQuality.globalReports.current, 'empty_response');
    }
  }
});
