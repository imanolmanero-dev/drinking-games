import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DISPLAY_LIMIT,
  FETCH_LIMIT,
  REPORT_DEFINITIONS,
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

function reportRuns(reports, rowLimitOverrides = {}) {
  return ['current', 'previous'].flatMap((period) => REPORT_DEFINITIONS.map((definition) => ({
    name: `${period}.${definition.key}`,
    period,
    key: definition.key,
    dimensions: definition.dimensions,
    rowLimit: rowLimitOverrides[`${period}.${definition.key}`] ?? definition.rowLimit,
    rows: reports[period][definition.key],
    succeeded: true,
  })));
}

function snapshotFrom(reports, rowLimitOverrides = {}) {
  return buildSeoSnapshot({
    generatedAt: '2026-08-27T10:00:00.000Z',
    periods: PERIODS,
    reports,
    reportRuns: reportRuns(reports, rowLimitOverrides),
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

test('separa el límite visible del límite de descarga', () => {
  const reports = emptyReports();
  reports.current.query = Array.from({ length: 60 }, (_, index) => ({
    keys: [`query-${index}`],
    clicks: index,
    impressions: index * 10,
    ctr: 0.1,
    position: 5,
  }));

  const snapshot = snapshotFrom(reports);
  assert.equal(snapshot.topQueries.length, DISPLAY_LIMIT);
  assert.equal(snapshot.topQueries[0].query, 'query-59');
  assert.equal(snapshot.dataQuality.displayLimit, 50);
  assert.equal(snapshot.dataQuality.fetchLimit, 25_000);
  assert.deepEqual(snapshot.dataQuality.reportsAtFetchLimit, []);
  assert.equal(REPORT_DEFINITIONS.find((definition) => definition.key === 'query').rowLimit, FETCH_LIMIT);
});

test('compara una query con previous real cuando la identidad existe', () => {
  const reports = emptyReports();
  reports.current.query = [
    { keys: ['query compartida'], clicks: 12, impressions: 120, ctr: 0.1, position: 5 },
  ];
  reports.previous.query = [
    { keys: ['query compartida'], clicks: 8, impressions: 100, ctr: 0.08, position: 6 },
  ];

  const row = snapshotFrom(reports).topQueries[0];
  assert.equal(row.previousStatus, 'matched');
  assert.equal(row.previousUnknownBecauseTruncated, false);
  assert.equal(row.previous.clicks, 8);
  assert.equal(row.difference.clicks, 4);
  assert.equal(row.percentDelta.clicks, 50);
});

test('interpreta como cero real una query ausente cuando previous no está truncado', () => {
  const reports = emptyReports();
  reports.current.query = [
    { keys: ['query nueva comprobada'], clicks: 12, impressions: 120, ctr: 0.1, position: 5 },
  ];

  const row = snapshotFrom(reports).topQueries[0];
  assert.equal(row.previousStatus, 'known_absent');
  assert.equal(row.previousUnknownBecauseTruncated, false);
  assert.deepEqual(row.previous, { clicks: 0, impressions: 0, ctr: 0, position: 0 });
  assert.equal(row.difference.clicks, 12);
  assert.equal(row.percentDelta.clicks, null);
});

test('deja previous desconocido cuando una query falta y previous está truncado', () => {
  const reports = emptyReports();
  reports.current.query = [
    { keys: ['query fuera del rango'], clicks: 12, impressions: 120, ctr: 0.1, position: 5 },
  ];
  reports.previous.query = [
    { keys: ['otra query'], clicks: 1, impressions: 1, ctr: 1, position: 1 },
  ];

  const snapshot = snapshotFrom(reports, { 'previous.query': 1 });
  const row = snapshot.topQueries[0];
  assert.equal(row.previousStatus, 'unknown_truncated');
  assert.equal(row.previousUnknownBecauseTruncated, true);
  assert.equal(row.previous, null);
  assert.equal(row.difference, null);
  assert.equal(row.percentDelta, null);
  assert.equal(row.prevClicks, null);
  assert.deepEqual(snapshot.dataQuality.reportsAtFetchLimit, ['previous.query']);
  assert.equal(snapshot.dataQuality.previousUnknownBecauseTruncated.topQueries, 1);
  assert.equal(snapshot.dataQuality.previousUnknownBecauseTruncated.total, 1);
  assert.match(renderSeoMarkdown(snapshot), /query fuera del rango \| 12 \| N\/D \| N\/D \| N\/D/);
});

test('encuentra previous más allá del displayLimit pero dentro del fetchLimit', () => {
  const reports = emptyReports();
  reports.current.query = [
    { keys: ['query profunda'], clicks: 20, impressions: 200, ctr: 0.1, position: 5 },
  ];
  reports.previous.query = Array.from({ length: DISPLAY_LIMIT }, (_, index) => ({
    keys: [`query-visible-${index}`],
    clicks: 100 - index,
    impressions: 1_000 - index,
    ctr: 0.1,
    position: 4,
  }));
  reports.previous.query.push({
    keys: ['query profunda'], clicks: 10, impressions: 100, ctr: 0.1, position: 6,
  });

  const row = snapshotFrom(reports).topQueries[0];
  assert.equal(reports.previous.query.length, DISPLAY_LIMIT + 1);
  assert.equal(row.previousStatus, 'matched');
  assert.equal(row.previous.clicks, 10);
  assert.equal(row.percentDelta.clicks, 100);
});

test('mantiene previous desconocido al alcanzar exactamente el fetchLimit real', () => {
  const reports = emptyReports();
  reports.current.page = [
    { keys: ['https://bebergames.com/no-recuperada'], clicks: 4, impressions: 40, ctr: 0.1, position: 5 },
  ];
  reports.previous.page = Array.from({ length: FETCH_LIMIT }, (_, index) => ({
    keys: [`https://bebergames.com/otra-${index}`],
    clicks: FETCH_LIMIT - index,
    impressions: FETCH_LIMIT - index,
    ctr: 1,
    position: 1,
  }));

  const snapshot = snapshotFrom(reports);
  assert.equal(snapshot.topPages[0].previousStatus, 'unknown_truncated');
  assert.equal(snapshot.topPages[0].previous, null);
  assert.equal(snapshot.topPages[0].difference, null);
  assert.equal(snapshot.topPages[0].percentDelta, null);
  assert.deepEqual(snapshot.dataQuality.reportsAtFetchLimit, ['previous.page']);
});

test('aplica previous desconocido a pages y queryPages truncados', () => {
  const reports = emptyReports();
  reports.current.page = [
    { keys: ['https://bebergames.com/actual'], clicks: 9, impressions: 90, ctr: 0.1, position: 5 },
  ];
  reports.previous.page = [
    { keys: ['https://bebergames.com/otra'], clicks: 8, impressions: 80, ctr: 0.1, position: 6 },
  ];
  reports.current.queryPage = [
    { keys: ['query actual', 'https://bebergames.com/actual'], clicks: 7, impressions: 70, ctr: 0.1, position: 5 },
  ];
  reports.previous.queryPage = [
    { keys: ['otra query', 'https://bebergames.com/otra'], clicks: 6, impressions: 60, ctr: 0.1, position: 6 },
  ];

  const snapshot = snapshotFrom(reports, {
    'previous.page': 1,
    'previous.queryPage': 1,
  });
  assert.equal(snapshot.topPages[0].previous, null);
  assert.equal(snapshot.topPages[0].difference, null);
  assert.equal(snapshot.topPages[0].previousUnknownBecauseTruncated, true);
  assert.equal(snapshot.queryPages[0].previous, null);
  assert.equal(snapshot.queryPages[0].percentDelta, null);
  assert.equal(snapshot.queryPages[0].previousUnknownBecauseTruncated, true);
  assert.equal(snapshot.dataQuality.previousUnknownBecauseTruncated.topPages, 1);
  assert.equal(snapshot.dataQuality.previousUnknownBecauseTruncated.queryPages, 1);
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

test('detecta canibalización más allá del top 50 visible de query + page', () => {
  const reports = emptyReports();
  reports.current.queryPage = Array.from({ length: DISPLAY_LIMIT }, (_, index) => ({
    keys: [`query-visible-${index}`, `https://bebergames.com/visible-${index}`],
    clicks: 100 - index,
    impressions: 200 - index,
    ctr: 0.5,
    position: 2,
  }));
  reports.current.queryPage.push(
    {
      keys: ['conflicto profundo', 'https://bebergames.com/uno'],
      clicks: 0,
      impressions: 40,
      ctr: 0,
      position: 8,
    },
    {
      keys: ['conflicto profundo', 'https://bebergames.com/dos'],
      clicks: 0,
      impressions: 20,
      ctr: 0,
      position: 10,
    },
  );

  const snapshot = snapshotFrom(reports);
  assert.equal(snapshot.queryPages.length, DISPLAY_LIMIT);
  assert.equal(snapshot.dataQuality.analysisRows.queryPages, DISPLAY_LIMIT + 2);
  assert.equal(snapshot.queryPages.some((row) => row.query === 'conflicto profundo'), false);
  assert.deepEqual(snapshot.cannibalization, [{
    query: 'conflicto profundo',
    urls: [
      { url: '/uno', clicks: 0, impressions: 40, imp: 40, ctr: 0, position: 8 },
      { url: '/dos', clicks: 0, impressions: 20, imp: 20, ctr: 0, position: 10 },
    ],
  }]);
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
