import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import * as reporting from '../scripts/seo-reporting.mjs';

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
        return { data: await reply(requestBody) };
      } } }),
    } },
    'node:fs': { writeFileSync: (...args) => writes.push(args) },
    'node:path': path,
    dotenv: { config() {} },
    './seo-reporting.mjs': reporting,
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

test('extractor usa metadata all y 12 informes final, sin consumir los días incompletos', async () => {
  const run = await runExtractor((request) => request.dimensions?.[0] === 'date'
    ? { rows: dates, metadata } : { rows: request.dimensions ? [] : [metrics] });
  assert.equal(run.exitCode, undefined);
  assert.equal(run.requests.length, 13);
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
  assert.equal(run.requests.filter((request) => !request.dimensions).length, 2);
  assert.deepEqual(run.writes.map(([file]) => path.basename(file)).sort(), ['SEO_DATA.md', 'seo-data.json']);
  const snapshot = JSON.parse(run.writes.find(([file]) => file.endsWith('seo-data.json'))[1]);
  assert.equal(reporting.validateSeoSnapshot(snapshot), true);
  assert.equal(snapshot.schemaVersion, 4);
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
