import assert from 'node:assert/strict';
import test from 'node:test';
import {
  REPORT_DEFINITIONS, EN_TOTAL_DEFINITION, EN_SCOPE, isEnglishPageUrl,
  assessDateCoverage, buildSeoSnapshot, validateSeoSnapshot, renderSeoMarkdown,
} from '../scripts/seo-reporting.mjs';

const origin = EN_SCOPE.origin;
const metric = { clicks: 1, impressions: 10, ctr: 0.1, position: 8 };
const zero = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
const page = (path, metrics = metric) => ({ keys: [`${origin}${path}`], ...metrics });
const query = (path, text = 'query', metrics = metric) => ({ keys: [text, `${origin}${path}`], ...metrics });
const coverage = assessDateCoverage(new Date('2026-09-28T02:40:00Z'), {
  metadata: { first_incomplete_date: '2026-09-25' },
});

function create(overrides = {}, runOverrides = {}, published = [`${origin}/en`]) {
  const reports = Object.fromEntries(['current', 'previous'].map((period) => [period,
    Object.fromEntries([...REPORT_DEFINITIONS, EN_TOTAL_DEFINITION].map((definition) => [definition.key,
      overrides[`${period}.${definition.key}`] ?? (definition.dimensions.length ? [] : [metric])])),
  ]));
  const reportRuns = ['current', 'previous'].flatMap((period) => [...REPORT_DEFINITIONS, EN_TOTAL_DEFINITION].map((definition) => ({
    ...definition, period, name: `${period}.${definition.key}`, rows: reports[period][definition.key],
    succeeded: true, responseAggregationType: definition.key === 'englishTotal' ? 'byPage' : 'byProperty',
    ...runOverrides[`${period}.${definition.key}`],
  })));
  const snapshot = buildSeoSnapshot({ reports, reportRuns, periods: coverage.periods, dateCoverage: coverage,
    generatedAt: coverage.checkedAt, publishedEnglishPages: published });
  validateSeoSnapshot(snapshot);
  return snapshot;
}
function englishMarkdown(snapshot) {
  return renderSeoMarkdown(snapshot).split('## English performance')[1].split('## Top ')[0];
}

for (const [url, expected] of [
  [`${origin}/en`, true], [`${origin}/en/`, true], [`${origin}/en/games`, true],
  [`${origin}/en?ref=test`, true], [`${origin}/en/games?ref=test`, true],
  [`${origin}/english`, false], [`${origin}/enough`, false],
  ['https://foreign.example/en', false], ['https://bebergames.com.evil/en', false],
  ['http://bebergames.com/en', false], ['/en', false],
]) test(`shared EN expression in JavaScript: ${url}`, () => {
  assert.equal(isEnglishPageUrl(url), expected);
  assert.equal(new RegExp(EN_TOTAL_DEFINITION.dimensionFilterGroups[0].filters[0].expression).test(url), expected);
});

test('all EN observations survive global top 50, including previous/query-only and published inventory', () => {
  const snapshot = create({
    'current.page': [...Array.from({ length: 50 }, (_, i) => page(`/es-${i}`, { ...metric, clicks: 10 })),
      page('/en/games', { ...metric, clicks: 0 }), page('/en/games?ref=test')],
    'previous.page': [page('/en/old')],
    'current.queryPage': [query('/en/query-only')],
    'previous.queryPage': [query('/en/previous-query-only')],
  });
  assert.equal(snapshot.topPages.some((row) => row.page === '/en/games'), false);
  assert.equal(snapshot.english.pages.length, 6);
  const rows = new Map(snapshot.english.pages.map((row) => [row.page, row]));
  assert.equal(rows.get(`${origin}/en`).currentStatus, 'no_observation');
  assert.equal(rows.get(`${origin}/en/old`).previousStatus, 'observed');
  assert.equal(rows.get(`${origin}/en/old`).current, null);
  assert.equal(rows.get(`${origin}/en/query-only`).currentStatus, 'page_row_missing');
  assert.equal(rows.get(`${origin}/en/query-only`).current, null);
  assert.equal(rows.get(`${origin}/en/previous-query-only`).previousStatus, 'page_row_missing');
  const md = englishMarkdown(snapshot);
  assert.match(md, /No observed Search Console data in this period/);
  assert.match(md, /page_row_missing/);
  assert.match(md, /\/en\/old/);
  assert.doesNotMatch(md, /-100/);
});

test('observed zero clicks and explicit zero totals differ from no observation', () => {
  const snapshot = create({ 'current.page': [page('/en', { ...metric, clicks: 0, ctr: 0 })],
    'previous.page': [page('/en')], 'current.englishTotal': [zero] });
  assert.equal(snapshot.english.pages[0].currentStatus, 'observed');
  assert.equal(snapshot.english.pages[0].percentDelta.clicks, -100);
  assert.equal(snapshot.english.quality.totals.current.status, 'valid_zero');
  assert.equal(snapshot.english.totals.percentDelta.clicks, -100);
  assert.match(englishMarkdown(snapshot), /Average position \| 8,0 \| N\/D/);
  assert.equal(snapshot.english.totals.difference.position, null);
});

for (const [label, rows, run, status] of [
  ['failed', [], { succeeded: false }, 'report_unavailable'],
  ['empty', [], {}, 'empty_response'],
  ['missing metric', [{ clicks: 0 }], {}, 'invalid_response'],
  ['CTR out of range', [{ ...metric, ctr: 2 }], {}, 'invalid_response'],
  ['multiple rows', [metric, metric], {}, 'invalid_response'],
  ['wrong aggregation', [metric], { responseAggregationType: 'byProperty' }, 'invalid_response'],
  ['missing aggregation', [metric], { responseAggregationType: null }, 'invalid_response'],
]) test(`EN totals ${label} remain unavailable without fake decline`, () => {
  const snapshot = create({ 'current.englishTotal': rows }, { 'current.englishTotal': run });
  assert.equal(snapshot.english.quality.totals.current.status, status);
  assert.equal(snapshot.english.totals.current, null);
  assert.equal(snapshot.english.totals.difference, null);
  assert.equal(snapshot.english.totals.percentDelta, null);
  assert.doesNotMatch(englishMarkdown(snapshot), /-100/);
});

test('capped page source marks missing identities unknown, without truncating observed rows', () => {
  const snapshot = create({ 'current.page': [page('/en/observed')] }, { 'current.page': { rowLimit: 1 } });
  assert.equal(snapshot.english.pages.find((row) => row.page === `${origin}/en`).currentStatus, 'unknown_truncated');
  assert.equal(snapshot.english.pages[0].currentStatus, 'observed');
  assert.match(englishMarkdown(snapshot), /potentially_truncated_by_fetch_limit/);
});

test('failed and malformed page sources never normalize EN observations to zero', () => {
  for (const [rows, run, status] of [[[], { succeeded: false }, 'report_unavailable'],
    [[{ keys: [`${origin}/en`], clicks: 0 }], {}, 'invalid_response']]) {
    const snapshot = create({ 'current.page': rows }, { 'current.page': run });
    assert.equal(snapshot.english.pages[0].currentStatus, status);
    assert.equal(snapshot.english.pages[0].current, null);
  }
});

test('malformed dimensional rows are rejected before legacy normalization, with visible source failure', () => {
  for (const key of ['page', 'queryPage']) {
    for (const malformed of [null, { keys: 'bad' }, { keys: [], ...metric }]) {
      const snapshot = create({ [`current.${key}`]: [malformed] });
      const collection = key === 'page' ? 'pages' : 'queryPages';
      assert.equal(snapshot.english.quality[collection].current.status, 'invalid_response');
      assert.equal(key === 'page' ? snapshot.topPages.length : snapshot.queryPagesFull.length, 0);
      assert.doesNotMatch(englishMarkdown(snapshot), /-100/);
    }
  }
});

test('discarded malformed current query/page observation stays unknown in saved JSON', () => {
  const snapshot = create({
    'current.queryPage': [query('/en', 'reviewed', { ...metric, ctr: 2 }), query('/en/valid', 'valid')],
    'previous.queryPage': [query('/en', 'reviewed'), query('/en/valid', 'valid'), query('/en/absent', 'absent')],
  });
  const saved = JSON.parse(JSON.stringify(snapshot));
  const row = saved.queryPagesFull.find((item) => item.query === 'reviewed');
  assert.equal(saved.english.quality.queryPages.current.status, 'invalid_response');
  assert.equal(saved.dataQuality.queryPageDataset.current.apiResponseStatus, 'report_unavailable');
  assert.equal(row.currentStatus, 'unknown_report_unavailable');
  for (const key of ['clicks', 'impressions', 'ctr', 'position']) assert.equal(row[key], null);
  assert.deepEqual(row.previous, metric);
  assert.equal(row.difference, null);
  assert.equal(row.percentDelta, null);
  assert.equal(saved.queryPagesFull.find((item) => item.query === 'absent').currentStatus, 'unknown_report_unavailable');
  const valid = saved.queryPagesFull.find((item) => item.query === 'valid');
  assert.equal(valid.currentStatus, 'present');
  assert.equal(valid.clicks, 1);
  assert.equal(valid.impressions, 10);
  assert.equal(valid.difference.impressions, 0);
  assert.equal(validateSeoSnapshot(saved), true);
});

test('discarded malformed previous query/page observation is not known_absent', () => {
  const snapshot = create({ 'current.queryPage': [query('/en')],
    'previous.queryPage': [query('/en', 'query', { ...metric, ctr: 2 })] });
  const row = snapshot.queryPagesFull[0];
  assert.equal(row.currentStatus, 'present');
  assert.equal(row.clicks, 1);
  assert.equal(row.previousStatus, 'unknown_report_unavailable');
  assert.equal(row.previous, null);
  assert.equal(row.difference, null);
  assert.equal(row.percentDelta, null);
  assert.equal(validateSeoSnapshot(snapshot), true);
});

test('malformed page sources preserve the other period and suppress fabricated comparisons', () => {
  for (const malformedPeriod of ['current', 'previous']) {
    const snapshot = create({
      'current.page': [page('/en')], 'previous.page': [page('/en')],
      [`${malformedPeriod}.page`]: [page('/en', { ...metric, ctr: 2 })],
      'current.queryPage': [query('/en')],
    });
    const row = snapshot.english.pages[0];
    const otherPeriod = malformedPeriod === 'current' ? 'previous' : 'current';
    assert.equal(row[`${malformedPeriod}Status`], 'invalid_response');
    assert.equal(row[malformedPeriod], null);
    assert.deepEqual(row[otherPeriod], metric);
    assert.equal(row.difference, null);
    assert.equal(row.percentDelta, null);
    if (malformedPeriod === 'previous') {
      const displayed = snapshot.topPages[0];
      assert.equal(displayed.previousStatus, 'unknown_report_unavailable');
      assert.equal(displayed.previous, null);
      assert.equal(displayed.difference, null);
      assert.equal(displayed.percentDelta, null);
    } else {
      assert.equal(snapshot.pageQueryCoverage[0].pageReportStatus, 'report_unavailable');
      assert.equal(snapshot.pageQueryCoverage[0].pageClicks, null);
      assert.equal(snapshot.pageQueryCoverage[0].pageImpressions, null);
    }
    assert.equal(validateSeoSnapshot(snapshot), true);
  }
});

test('failed/capped query sources expose quality, preserve observed prior data and unknown current values', () => {
  for (const run of [{ succeeded: false }, { rowLimit: 1 }]) {
    const snapshot = create({ 'current.queryPage': [query('/en/current')],
      'previous.queryPage': [query('/en/old', 'prior')] }, { 'current.queryPage': run });
    const md = englishMarkdown(snapshot);
    assert.match(md, /10 → N\/D/);
    assert.doesNotMatch(md, /-100/);
    assert.match(md, run.succeeded === false ? /report_unavailable/ : /potentially_truncated_by_fetch_limit/);
  }
});

test('queries suppress known_absent zeros, keep previous-only evidence and escape Markdown', () => {
  const snapshot = create({
    'current.queryPage': Array.from({ length: 7 }, (_, i) => query('/en', `new-${i}`, { ...metric, impressions: 10 + i })),
    'previous.queryPage': [query('/en', 'old|<script>[text]`\nquery', { ...metric, impressions: 100 })],
  });
  const old = snapshot.queryPagesFull.find((row) => row.presence === 'previous_only');
  assert.equal(old.currentStatus, 'known_absent');
  assert.equal(old.impressions, 0);
  const md = englishMarkdown(snapshot);
  assert.match(md, /Showing 5 of 8 retrieved combinations/);
  assert.match(md, /100 → N\/D/);
  assert.match(md, /old\\\|&lt;script&gt;/);
  assert.doesNotMatch(md, /<script>|-100/);
  assert.equal(snapshot.english.pages[0].current, null);
  assert.equal(snapshot.english.totals.current.impressions, 10);
  assert.equal(snapshot.queryPagesFull.length, 8);
});

test('foreign query/page origins do not become EN through relative URL normalization', () => {
  const snapshot = create({ 'current.queryPage': [{ keys: ['foreign', 'https://foreign.example/en'], ...metric }] });
  assert.doesNotMatch(englishMarkdown(snapshot), /foreign/);
  assert.equal(snapshot.english.pages[0].currentStatus, 'no_observation');
});

test('query table escapes backslashes, pipes, HTML and formatting characters', () => {
  const snapshot = create({ 'current.queryPage': [query('/en', '\\|<b>*_`[q]\r\n')] });
  const md = englishMarkdown(snapshot);
  assert.ok(md.includes('\\\\\\|&lt;b&gt;\\*\\_\\`\\[q\\] '));
  assert.doesNotMatch(md, /<b>/);
});

test('EN ordering uses current impressions, clicks and deterministic URL ties', () => {
  const rows = [page('/en/b'), page('/en/a'), page('/en/c', { ...metric, clicks: 2, ctr: 0.2 }),
    page('/en/z', { ...metric, impressions: 100 })];
  const first = create({ 'current.page': rows });
  const second = create({ 'current.page': [...rows].reverse() });
  assert.deepEqual(first.english, second.english);
  assert.equal(renderSeoMarkdown(first), renderSeoMarkdown(second));
  assert.deepEqual(first.english.pages.slice(0, 4).map((row) => row.page),
    [`${origin}/en/z`, `${origin}/en/c`, `${origin}/en/a`, `${origin}/en/b`]);
});

test('EN observed pages cannot contradict zero retrieved page rows in either period', () => {
  const valid = create({ 'current.page': [page('/en')], 'previous.page': [page('/en')] });
  for (const period of ['current', 'previous']) {
    const snapshot = structuredClone(valid);
    // Keep parent and EN provenance consistent so rejection must come from the observation invariant.
    snapshot.english.quality.pages[period].fetchedRows = 0;
    snapshot.dataQuality.rowsFetched[`${period}.page`] = 0;
    assert.throws(() => validateSeoSnapshot(snapshot), /Snapshot SEO inválido/);
  }
});

test('EN missing-page status must agree with disclosed query evidence in either period', () => {
  for (const period of ['current', 'previous']) {
    const valid = create({ [`${period}.queryPage`]: [query('/en')] });
    assert.equal(valid.english.pages[0][`${period}Status`], 'page_row_missing');
    assert.equal(validateSeoSnapshot(valid), true);
    const snapshot = structuredClone(valid);
    snapshot.english.pages[0][`${period}Status`] = 'no_observation';
    assert.throws(() => validateSeoSnapshot(snapshot), /Snapshot SEO inválido/);
  }
});

test('EN missing-page validation respects query evidence, truncation and source failure precedence', () => {
  for (const [overrides, runs, expected] of [
    [{ 'current.page': [page('/en')] }, {}, 'observed'],
    [{}, {}, 'no_observation'],
    [{ 'current.page': [page('/en/other')] }, { 'current.page': { rowLimit: 1 } }, 'unknown_truncated'],
    [{ 'current.queryPage': [query('/en')] }, {}, 'page_row_missing'],
    [{ 'current.page': [page('/en/other')], 'current.queryPage': [query('/en')] },
      { 'current.page': { rowLimit: 1 } }, 'page_row_missing'],
    [{ 'current.queryPage': [query('/en')] }, { 'current.page': { succeeded: false } }, 'report_unavailable'],
    [{ 'current.page': [page('/en', { ...metric, ctr: 2 })], 'current.queryPage': [query('/en')] }, {}, 'invalid_response'],
  ]) {
    const snapshot = create(overrides, runs);
    assert.equal(snapshot.english.pages.find((row) => row.page === `${origin}/en`).currentStatus, expected);
    assert.equal(validateSeoSnapshot(snapshot), true);
  }
});

test('v4 english validation rejects corrupt scope, inventory, metrics, arithmetic and provenance', () => {
  const valid = create({ 'current.page': [page('/en')], 'previous.page': [page('/en')] });
  for (const corrupt of [
    (en) => { en.scope.origin = 'https://foreign.example'; },
    (en) => { en.periods.current.end = '2026-09-23'; },
    (en) => { en.publishedPages.push(en.publishedPages[0]); },
    (en) => { en.publishedPages = [`${origin}/english`]; },
    (en) => { en.pages.push(en.pages[0]); },
    (en) => { en.pages = []; },
    (en) => { en.pages[0].current.ctr = 2; },
    (en) => { en.pages[0].current.impressions = Infinity; },
    (en) => { en.pages[0].currentStatus = 'no_observation'; },
    (en) => { en.pages[0].difference.clicks = 99; },
    (en) => { en.totals.percentDelta.ctr = 0; },
    (en) => { en.quality.totals.current.responseAggregationType = 'byProperty'; },
    (en) => { en.quality.pages.current.fetchedRows = 99; },
    (en) => { en.quality.pages.current.status = 'report_unavailable'; },
  ]) {
    const snapshot = structuredClone(valid);
    corrupt(snapshot.english);
    assert.throws(() => validateSeoSnapshot(snapshot), /Snapshot SEO inválido/);
  }
});

test('existing v4 and historical v3 without english remain readable without mutation', () => {
  for (const schemaVersion of [3, 4]) {
    const snapshot = create();
    delete snapshot.english;
    snapshot.schemaVersion = schemaVersion;
    if (schemaVersion === 3) {
      delete snapshot.dataQuality.dateCoverage;
      delete snapshot.dataQuality.globalReports;
    }
    const before = JSON.stringify(snapshot);
    validateSeoSnapshot(snapshot);
    assert.match(renderSeoMarkdown(snapshot), /EN extension not collected in this snapshot/);
    assert.equal(JSON.stringify(snapshot), before);
  }
});
