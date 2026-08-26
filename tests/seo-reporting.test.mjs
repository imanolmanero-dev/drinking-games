import assert from 'node:assert/strict';
import test from 'node:test';
import {
  REPORT_DEFINITIONS,
  TOP_LIMIT,
  buildSeoSnapshot,
  calculatePercentDelta,
  calculatePeriods,
  countInclusiveDays,
  renderSeoMarkdown,
} from '../scripts/seo-reporting.mjs';

const PERIODS = {
  current: { start: '2026-08-20', end: '2026-08-26' },
  previous: { start: '2026-08-13', end: '2026-08-19' },
};

function emptyReports() {
  return {
    current: { global: [], query: [], page: [], country: [], device: [], queryPage: [] },
    previous: { global: [], query: [], page: [], country: [], device: [], queryPage: [] },
  };
}

function reportRuns(reports) {
  return ['current', 'previous'].flatMap((period) => REPORT_DEFINITIONS.map((definition) => ({
    name: `${period}.${definition.key}`,
    period,
    key: definition.key,
    dimensions: definition.dimensions,
    rowLimit: definition.rowLimit,
    rows: reports[period][definition.key],
    succeeded: true,
  })));
}

function snapshotFrom(reports) {
  return buildSeoSnapshot({
    generatedAt: '2026-08-27T10:00:00.000Z',
    periods: PERIODS,
    reports,
    reportRuns: reportRuns(reports),
  });
}

test('calcula 7/7 días, excluye hoy y no solapa periodos', () => {
  const periods = calculatePeriods(new Date('2026-08-27T23:59:59.000Z'));

  assert.deepEqual(periods, PERIODS);
  assert.equal(countInclusiveDays(periods.current), 7);
  assert.equal(countInclusiveDays(periods.previous), 7);
  assert.notEqual(periods.current.end, '2026-08-27');
  assert.equal(new Date(`${periods.previous.end}T00:00:00Z`).getTime() + 86_400_000,
    new Date(`${periods.current.start}T00:00:00Z`).getTime());
});

test('resuelve cambios de mes', () => {
  assert.deepEqual(calculatePeriods(new Date('2026-03-03T12:00:00Z')), {
    current: { start: '2026-02-24', end: '2026-03-02' },
    previous: { start: '2026-02-17', end: '2026-02-23' },
  });
});

test('resuelve cambios de año', () => {
  assert.deepEqual(calculatePeriods(new Date('2026-01-04T12:00:00Z')), {
    current: { start: '2025-12-28', end: '2026-01-03' },
    previous: { start: '2025-12-21', end: '2025-12-27' },
  });
});

test('resuelve febrero no bisiesto', () => {
  assert.deepEqual(calculatePeriods(new Date('2025-03-02T12:00:00Z')), {
    current: { start: '2025-02-23', end: '2025-03-01' },
    previous: { start: '2025-02-16', end: '2025-02-22' },
  });
});

test('resuelve febrero de año bisiesto', () => {
  assert.deepEqual(calculatePeriods(new Date('2024-03-02T12:00:00Z')), {
    current: { start: '2024-02-24', end: '2024-03-01' },
    previous: { start: '2024-02-17', end: '2024-02-23' },
  });
});

test('previous = 0 produce percentDelta null y nunca +100%', () => {
  assert.equal(calculatePercentDelta(12, 0), null);

  const reports = emptyReports();
  reports.current.global = [{ clicks: 12, impressions: 120, ctr: 0.1, position: 4 }];
  const snapshot = snapshotFrom(reports);
  assert.equal(snapshot.globalMetrics.percentDelta.clicks, null);
  assert.doesNotMatch(renderSeoMarkdown(snapshot), /\+100%/);
});

test('usa el informe sin dimensiones para los totales globales', () => {
  const reports = emptyReports();
  reports.current.global = [{ clicks: 1_000, impressions: 20_000, ctr: 0.05, position: 7.5 }];
  reports.previous.global = [{ clicks: 800, impressions: 16_000, ctr: 0.05, position: 8 }];
  reports.current.query = [{ keys: ['top parcial'], clicks: 10, impressions: 100, ctr: 0.1, position: 2 }];

  const snapshot = snapshotFrom(reports);
  assert.equal(snapshot.schemaVersion, 2);
  assert.equal(snapshot.globalMetrics.current.clicks, 1_000);
  assert.equal(snapshot.globalMetrics.current.impressions, 20_000);
  assert.equal(snapshot.globalMetrics.current.position, 7.5);
  assert.notEqual(snapshot.globalMetrics.current.clicks, snapshot.topQueries[0].clicks);

  const globalDefinition = REPORT_DEFINITIONS.find((definition) => definition.key === 'global');
  assert.deepEqual(globalDefinition.dimensions, []);
});

test('limita y ordena top queries a 50 filas', () => {
  const reports = emptyReports();
  reports.current.query = Array.from({ length: 60 }, (_, index) => ({
    keys: [`query-${index}`],
    clicks: index,
    impressions: index * 10,
    ctr: 0.1,
    position: 5,
  }));

  const snapshot = snapshotFrom(reports);
  assert.equal(snapshot.topQueries.length, TOP_LIMIT);
  assert.equal(snapshot.topQueries[0].query, 'query-59');
  assert.deepEqual(snapshot.dataQuality.truncatedReports, ['current.query']);
});

test('estructura métricas de country y device con comparativas', () => {
  const reports = emptyReports();
  reports.current.country = [{ keys: ['esp'], clicks: 30, impressions: 300, ctr: 0.1, position: 4 }];
  reports.previous.country = [{ keys: ['esp'], clicks: 20, impressions: 250, ctr: 0.08, position: 5 }];
  reports.current.device = [{ keys: ['MOBILE'], clicks: 25, impressions: 200, ctr: 0.125, position: 3 }];
  reports.previous.device = [{ keys: ['MOBILE'], clicks: 10, impressions: 100, ctr: 0.1, position: 4 }];

  const snapshot = snapshotFrom(reports);
  assert.equal(snapshot.countries[0].country, 'esp');
  assert.equal(snapshot.countries[0].difference.clicks, 10);
  assert.equal(snapshot.countries[0].percentDelta.clicks, 50);
  assert.equal(snapshot.devices[0].device, 'MOBILE');
  assert.equal(snapshot.devices[0].current.ctr, 0.125);
  assert.equal(snapshot.devices[0].previous.position, 4);
});

test('mantiene query + page separado y compara solo la misma combinación', () => {
  const reports = emptyReports();
  reports.current.queryPage = [
    { keys: ['juegos para beber', 'https://bebergames.com/'], clicks: 8, impressions: 100, ctr: 0.08, position: 5 },
    { keys: ['juegos para beber', 'https://bebergames.com/juegos'], clicks: 4, impressions: 40, ctr: 0.1, position: 6 },
  ];
  reports.previous.queryPage = [
    { keys: ['juegos para beber', 'https://bebergames.com/'], clicks: 5, impressions: 80, ctr: 0.0625, position: 6 },
  ];

  const snapshot = snapshotFrom(reports);
  assert.equal(snapshot.queryPages[0].query, 'juegos para beber');
  assert.equal(snapshot.queryPages[0].url, '/');
  assert.equal(snapshot.queryPages[0].previous.clicks, 5);
  assert.equal(snapshot.queryPages[1].url, '/juegos');
  assert.equal(snapshot.queryPages[1].percentDelta.clicks, null);
  assert.deepEqual(
    REPORT_DEFINITIONS.find((definition) => definition.key === 'queryPage').dimensions,
    ['query', 'page'],
  );
});

test('tolera periodos vacíos y los declara en dataQuality', () => {
  const reports = emptyReports();
  const snapshot = snapshotFrom(reports);

  assert.deepEqual(snapshot.globalMetrics.current, { clicks: 0, impressions: 0, ctr: 0, position: 0 });
  assert.equal(snapshot.topQueries.length, 0);
  assert.equal(snapshot.dataQuality.emptyReports.length, 12);
  assert.match(renderSeoMarkdown(snapshot), /Sin filas para este periodo/);
});

test('genera JSON y Markdown deterministas con las mismas entradas', () => {
  const reports = emptyReports();
  reports.current.global = [{ clicks: 10, impressions: 100, ctr: 0.1, position: 2 }];
  const first = snapshotFrom(reports);
  const second = snapshotFrom(structuredClone(reports));

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(renderSeoMarkdown(first), renderSeoMarkdown(second));
});

test('la salida no conserva secretos ni credenciales', () => {
  const reports = emptyReports();
  const fakeSecret = 'FAKE_PRIVATE_KEY_SHOULD_NOT_APPEAR';
  const snapshot = buildSeoSnapshot({
    generatedAt: '2026-08-27T10:00:00.000Z',
    periods: PERIODS,
    reports,
    reportRuns: reportRuns(reports),
    credentials: { private_key: fakeSecret },
  });
  const output = `${JSON.stringify(snapshot)}\n${renderSeoMarkdown(snapshot)}`;

  assert.doesNotMatch(output, /GCP_CREDENTIALS|private_key|FAKE_PRIVATE_KEY_SHOULD_NOT_APPEAR/);
});
