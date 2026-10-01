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

async function runExtractor(reply) {
  const requests = [], writes = [], errors = [];
  const processMock = { env: { GCP_CREDENTIALS: '{}' }, cwd: () => '/memory', exitCode: undefined };
  const modules = {
    googleapis: { google: {
      auth: { GoogleAuth: class {} },
      searchconsole: () => ({ searchanalytics: { query: async ({ requestBody }) => {
        requests.push(requestBody);
        return { data: { responseAggregationType: requestBody.dimensionFilterGroups ? 'byPage' : 'byProperty',
          ...await reply(requestBody) } };
      } } }),
    } },
    'node:fs': { writeFileSync: (...args) => writes.push(args) },
    'node:path': path,
    dotenv: { config() {} },
    './seo-reporting.mjs': reporting,
    '../lib/i18n/routes': routes,
    '../lib/i18n/locales': locales,
  };
  await vm.runInNewContext(code, {
    exports: {}, require: (name) => {
      assert.ok(Object.hasOwn(modules, name), name);
      return modules[name];
    },
    process: processMock,
    console: { log() {}, error: (message) => errors.push(message) },
    Date: class extends Date { constructor(...args) { super(...(args.length ? args : [instant])); } },
  });
  return { requests, writes, errors, exitCode: processMock.exitCode };
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
    assert.ok(['2026-09-11', '2026-09-18'].includes(request.startDate));
    assert.equal(request.endDate, request.startDate === '2026-09-11' ? '2026-09-17' : '2026-09-24');
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
  assert.equal(snapshot.dataQuality.dateCoverage.status, 'verified');
  assert.equal(snapshot.dataQuality.dateCoverage.firstIncompleteDate, '2026-09-25');
});

test('extractor conserva los outputs si falta metadata, falla la petición o la evidencia es inválida', async () => {
  for (const [reply, reason] of [
    [() => { throw new Error('PRIVATE_API_DETAILS'); }, 'unavailable (request_failed)'],
    [() => ({}), 'unverified (metadata_absent)'],
    [() => ({ rows: [], metadata: {} }), 'unverified (metadata_absent)'],
    [() => ({ rows: dates }), 'unverified (metadata_absent)'],
    [() => ({ metadata: { first_incomplete_date: 'bad' } }), 'unavailable (invalid_response)'],
    [() => ({ metadata: { first_incomplete_date: '2026-08-31' } }), 'unverified (insufficient_metadata_range)'],
  ]) {
    const run = await runExtractor(reply);
    assert.equal(run.requests.length, 1);
    assert.equal(run.writes.length, 0);
    assert.equal(run.exitCode, 1);
    assert.ok(run.errors.join('').includes(`Cobertura temporal ${reason}`));
    assert.doesNotMatch(run.errors.join(''), /PRIVATE_API_DETAILS/);
  }
});

test('extractor guarda current desconocido cuando query/page descarta una observación malformada', async () => {
  const observed = { clicks: 1, impressions: 10, ctr: 0.1, position: 8 };
  for (const currentRows of [[{ keys: ['reviewed', 'https://bebergames.com/en'], ...observed, ctr: 2 }], {}]) {
    const run = await runExtractor((request) => {
      if (request.dimensions?.[0] === 'date') return { rows: dates, metadata };
      if (request.dimensions?.join() === 'query,page') return { rows: request.startDate === '2026-09-18'
        ? currentRows : [{ keys: ['reviewed', 'https://bebergames.com/en'], ...observed }] };
      return { rows: request.dimensions ? [] : [metrics] };
    });
    assert.equal(run.exitCode, undefined);
    assert.equal(run.requests.length, 15);
    assert.equal(run.writes.length, 2);
    const saved = JSON.parse(run.writes.find(([file]) => file.endsWith('seo-data.json'))[1]);
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
      current: { start: '2026-09-18', end: '2026-09-24' },
      previous: { start: '2026-09-11', end: '2026-09-17' },
    });
    assert.equal(snapshot.globalMetrics.current.clicks, 10);
  }
});

test('extractor publica un fallo global como no disponible, nunca como cero ni caída del 100%', async () => {
  const run = await runExtractor((request) => {
    if (request.dimensions?.[0] === 'date') return { rows: dates, metadata };
    if (!request.dimensions && request.startDate === '2026-09-18') throw { code: 503 };
    return { rows: request.dimensions ? [] : [metrics] };
  });
  assert.equal(run.exitCode, undefined);
  const snapshot = JSON.parse(run.writes.find(([file]) => file.endsWith('seo-data.json'))[1]);
  assert.equal(snapshot.globalMetrics.current, null);
  assert.equal(snapshot.globalMetrics.previous.clicks, 10);
  assert.equal(snapshot.globalMetrics.percentDelta, null);
  assert.equal(snapshot.dataQuality.globalReports.current, 'report_unavailable');
  assert.match(run.writes.find(([file]) => file.endsWith('SEO_DATA.md'))[1], /Comparación global no disponible/);
  assert.doesNotMatch(JSON.stringify(snapshot), /-100/);
});

test('extractor distingue cero clics válidos de una respuesta global vacía', async () => {
  const zeroClicks = { clicks: 0, impressions: 100, ctr: 0, position: 5 };
  for (const rows of [[zeroClicks], []]) {
    const run = await runExtractor((request) => {
      if (request.dimensions?.[0] === 'date') return { rows: dates, metadata };
      return { rows: request.dimensions ? [] : request.startDate === '2026-09-18' ? rows : [metrics] };
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
