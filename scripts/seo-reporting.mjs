export const SCHEMA_VERSION = 4;
export const DISPLAY_LIMIT = 50;
// Máximo admitido por Search Analytics Query en una sola respuesta.
export const FETCH_LIMIT = 25_000;
// Alias conservado para consumidores del schema v2 anterior.
export const TOP_LIMIT = DISPLAY_LIMIT;
export const PERIOD_DAYS = 7;
export const SEARCH_CONSOLE_TIME_ZONE = 'America/Los_Angeles';
const AVAILABILITY_DAYS = 28;

export const REPORT_DEFINITIONS = Object.freeze([
  { key: 'global', dimensions: [], rowLimit: 1 },
  { key: 'query', dimensions: ['query'], rowLimit: FETCH_LIMIT },
  { key: 'page', dimensions: ['page'], rowLimit: FETCH_LIMIT },
  { key: 'country', dimensions: ['country'], rowLimit: FETCH_LIMIT },
  { key: 'device', dimensions: ['device'], rowLimit: FETCH_LIMIT },
  { key: 'queryPage', dimensions: ['query', 'page'], rowLimit: FETCH_LIMIT },
]);

export const EN_SCOPE = Object.freeze({
  origin: 'https://bebergames.com', pathnamePrefix: '/en',
  pageFilterExpression: '^https://bebergames\\.com/en(/|[?]|$)',
});
const englishUrlPattern = new RegExp(EN_SCOPE.pageFilterExpression);
export function isEnglishPageUrl(value) {
  return typeof value === 'string' && englishUrlPattern.test(value);
}
export const EN_TOTAL_DEFINITION = Object.freeze({
  key: 'englishTotal', dimensions: [], rowLimit: 1,
  dimensionFilterGroups: [{ groupType: 'and', filters: [{
    dimension: 'page', operator: 'includingRegex', expression: EN_SCOPE.pageFilterExpression,
  }] }],
});

const METRICS = ['clicks', 'impressions', 'ctr', 'position'];
const DAY_MS = 24 * 60 * 60 * 1000;

function pacificDate(value) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SEARCH_CONSOLE_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(value);
}

function dateValue(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Fecha SEO inválida');
  const date = new Date(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(date.getTime()) || formatDate(date) !== value) throw new Error('Fecha SEO inválida');
  return date;
}

function addUtcDays(value, days) {
  return new Date(value.getTime() + (days * DAY_MS));
}

export function formatDate(value) {
  return value.toISOString().slice(0, 10);
}

export function countInclusiveDays(period) {
  const start = new Date(`${period.start}T00:00:00.000Z`);
  const end = new Date(`${period.end}T00:00:00.000Z`);
  return Math.round((end.getTime() - start.getTime()) / DAY_MS) + 1;
}

// Calendar arithmetic uses UTC only after resolving the Pacific calendar date.
// This function constructs ranges; activity rows never certify finalization.
export function calculatePeriods(now = new Date(), finalizedEnd = null) {
  const yesterday = addUtcDays(dateValue(pacificDate(now)), -1);
  const currentEnd = finalizedEnd === null ? yesterday : dateValue(finalizedEnd);
  if (currentEnd > yesterday) throw new Error('El periodo incluye el día actual de Search Console');
  const currentStart = addUtcDays(currentEnd, -(PERIOD_DAYS - 1));
  const previousEnd = addUtcDays(currentStart, -1);
  const previousStart = addUtcDays(previousEnd, -(PERIOD_DAYS - 1));

  return {
    current: { start: formatDate(currentStart), end: formatDate(currentEnd) },
    previous: { start: formatDate(previousStart), end: formatDate(previousEnd) },
  };
}

export function dateAvailabilityRequest(now = new Date()) {
  // Include today only in the metadata probe, never in the metric periods.
  const end = dateValue(pacificDate(now));
  return {
    startDate: formatDate(addUtcDays(end, -(AVAILABILITY_DAYS - 1))),
    endDate: formatDate(end),
    dimensions: ['date'], dataState: 'all', type: 'web', rowLimit: AVAILABILITY_DAYS + 1,
  };
}

/**
 * @typedef {{status: 'unavailable' | 'unverified' | 'verified', reason: string, timeZone: string,
 * dataState: string, checkedAt: string, requested: {start: string, end: string},
 * firstIncompleteDate: string | null,
 * periods: ReturnType<typeof calculatePeriods> | null}} DateCoverage
 */
export function assessDateCoverage(now, response, succeeded = true) {
  const request = dateAvailabilityRequest(now);
  /** @type {DateCoverage} */
  const coverage = {
    status: 'unavailable', reason: succeeded ? 'invalid_response' : 'request_failed',
    timeZone: SEARCH_CONSOLE_TIME_ZONE, dataState: 'all',
    checkedAt: now.toISOString(), requested: { start: request.startDate, end: request.endDate },
    firstIncompleteDate: null, periods: null,
  };
  if (!succeeded) return coverage;
  if (!response || typeof response !== 'object' || Array.isArray(response)) return coverage;
  const metadata = response.metadata;
  if (metadata !== undefined && (!metadata || typeof metadata !== 'object' || Array.isArray(metadata))) return coverage;
  // Optional metadata is the only temporal evidence. Daily rows are deliberately
  // unused: missing activity neither proves zero traffic nor incomplete data.
  if (metadata === undefined || !Object.hasOwn(metadata, 'first_incomplete_date')) {
    return { ...coverage, status: 'unverified', reason: 'metadata_absent' };
  }
  const firstIncompleteDate = metadata.first_incomplete_date;
  try { dateValue(firstIncompleteDate); } catch { return coverage; }
  if (firstIncompleteDate < request.startDate || firstIncompleteDate > request.endDate) return coverage;
  coverage.firstIncompleteDate = firstIncompleteDate;
  const end = formatDate(addUtcDays(dateValue(firstIncompleteDate), -1));
  const periods = calculatePeriods(now, end);
  // The boundary describes this request's range; do not extrapolate before it.
  if (periods.previous.start < request.startDate) {
    return { ...coverage, status: 'unverified', reason: 'insufficient_metadata_range' };
  }
  coverage.status = 'verified';
  coverage.reason = 'first_incomplete_date';
  coverage.periods = periods;
  return coverage;
}

export async function discoverDateCoverage(query, now = new Date()) {
  let response;
  try { response = await query(dateAvailabilityRequest(now)); }
  catch { return assessDateCoverage(now, null, false); }
  return assessDateCoverage(now, response);
}

function assertDateCoverage(coverage, periods) {
  assertSnapshot(coverage?.status === 'verified', 'cobertura de fechas no verificada o no disponible');
  assertSnapshot(typeof coverage.checkedAt === 'string' && Number.isFinite(Date.parse(coverage.checkedAt)), 'evidencia de cobertura de fechas inválida');
  const expected = assessDateCoverage(new Date(coverage.checkedAt), {
    metadata: { first_incomplete_date: coverage.firstIncompleteDate },
  });
  for (const field of ['status', 'reason', 'timeZone', 'dataState', 'checkedAt', 'firstIncompleteDate']) {
    assertSnapshot(JSON.stringify(coverage[field]) === JSON.stringify(expected[field]), 'evidencia de cobertura de fechas inválida');
  }
  for (const boundary of ['start', 'end']) {
    assertSnapshot(coverage.requested?.[boundary] === expected.requested[boundary], 'solicitud de cobertura inválida');
    for (const period of ['current', 'previous']) {
      assertSnapshot(periods?.[period]?.[boundary] === expected.periods[period][boundary]
        && coverage.periods?.[period]?.[boundary] === expected.periods[period][boundary], 'periodos distintos de la cobertura verificada');
    }
  }
}

export function calculatePercentDelta(current, previous) {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

function metricValue(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

export function normalizeMetrics(row) {
  return {
    clicks: metricValue(row?.clicks),
    impressions: metricValue(row?.impressions),
    ctr: metricValue(row?.ctr),
    position: metricValue(row?.position),
  };
}

export function compareMetrics(current, previous) {
  if (current === null || previous === null) {
    return {
      current,
      previous,
      difference: null,
      percentDelta: null,
    };
  }

  const difference = {};
  const percentDelta = {};

  for (const metric of METRICS) {
    if (current[metric] === null || previous[metric] === null) {
      difference[metric] = null;
      percentDelta[metric] = null;
      continue;
    }

    difference[metric] = current[metric] - previous[metric];
    percentDelta[metric] = calculatePercentDelta(current[metric], previous[metric]);
  }

  return { current, previous, difference, percentDelta };
}

function legacyDelta(value) {
  if (value === null) return null;
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}

function rowKey(row) {
  return (row?.keys ?? []).join('\u0000');
}

function compareText(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    const clickDifference = metricValue(b.clicks) - metricValue(a.clicks);
    if (clickDifference !== 0) return clickDifference;

    const impressionDifference = metricValue(b.impressions) - metricValue(a.impressions);
    if (impressionDifference !== 0) return impressionDifference;

    return compareText(rowKey(a), rowKey(b));
  });
}

function reportState(reportRuns, period, key) {
  const report = reportRuns.find((candidate) => candidate.period === period && candidate.key === key);
  const fetchLimit = report?.rowLimit ?? FETCH_LIMIT;
  const fetchedRows = report?.rows?.length ?? 0;
  // API completion does not certify absence after malformed rows were discarded.
  // Valid retained rows remain observations; only missing identities use this state.
  const succeeded = report?.succeeded === true && !report.comparisonUnavailable;
  const reachedFetchLimit = Boolean(
    succeeded
    && report.dimensions.length > 0
    && fetchedRows >= fetchLimit,
  );

  return {
    succeeded,
    fetchLimit,
    fetchedRows,
    reachedFetchLimit,
    reachedLimit: reachedFetchLimit,
    potentiallyTruncated: reachedFetchLimit,
    apiResponseStatus: !succeeded
      ? 'report_unavailable'
      : reachedFetchLimit
        ? 'potentially_truncated_by_fetch_limit'
        : 'complete_from_api_response',
  };
}

function knownAbsentMetrics() {
  return {
    clicks: 0,
    impressions: 0,
    ctr: null,
    position: null,
  };
}

function missingPeriod(state) {
  if (state.succeeded && !state.reachedFetchLimit) {
    return { metrics: knownAbsentMetrics(), status: 'known_absent' };
  }

  return {
    metrics: null,
    status: state.reachedFetchLimit ? 'unknown_truncated' : 'unknown_report_unavailable',
  };
}

function compareRows(currentRows, previousRows, dimensions, previousReportState) {
  const previousByKey = new Map(previousRows.map((row) => [rowKey(row), row]));
  const sortedCurrent = sortRows(currentRows);

  return sortedCurrent.slice(0, DISPLAY_LIMIT).map((row) => {
    const keys = row.keys ?? [];
    const current = normalizeMetrics(row);
    const previousRow = previousByKey.get(rowKey(row));
    let previous;
    let previousStatus;

    if (previousRow) {
      previous = normalizeMetrics(previousRow);
      previousStatus = 'matched';
    } else if (previousReportState.succeeded && !previousReportState.reachedFetchLimit) {
      // Solo un informe completado por debajo del fetchLimit permite interpretar
      // una identidad ausente como cero real durante el periodo anterior.
      previous = knownAbsentMetrics();
      previousStatus = 'known_absent';
    } else {
      // Ausencia en un informe truncado o fallido no equivale a cero.
      previous = null;
      previousStatus = previousReportState.reachedFetchLimit
        ? 'unknown_truncated'
        : 'unknown_report_unavailable';
    }

    const comparison = compareMetrics(current, previous);
    const identity = Object.fromEntries(dimensions.map((dimension, index) => [dimension, keys[index] ?? '']));

    return {
      ...identity,
      ...current,
      prevClicks: previous?.clicks ?? null,
      delta: legacyDelta(comparison.percentDelta?.clicks ?? null),
      previousStatus,
      previousUnknownBecauseTruncated: previousStatus === 'unknown_truncated',
      ...comparison,
    };
  });
}

function currentRowsForAnalysis(rows, dimensions) {
  return sortRows(rows).map((row) => ({
    ...Object.fromEntries(dimensions.map((dimension, index) => [dimension, row.keys?.[index] ?? ''])),
    ...normalizeMetrics(row),
  }));
}

function nullableMetrics(metrics) {
  return metrics ?? {
    clicks: null,
    impressions: null,
    ctr: null,
    position: null,
  };
}

function compareAllRows(currentRows, previousRows, dimensions, currentReportState, previousReportState) {
  const currentByKey = new Map(currentRows.map((row) => [rowKey(row), row]));
  const previousByKey = new Map(previousRows.map((row) => [rowKey(row), row]));
  const allKeys = [...new Set([...currentByKey.keys(), ...previousByKey.keys()])];

  return allKeys.map((key) => {
    const currentRow = currentByKey.get(key);
    const previousRow = previousByKey.get(key);
    const identityRow = currentRow ?? previousRow;
    const identity = Object.fromEntries(dimensions.map((dimension, index) => [
      dimension,
      identityRow?.keys?.[index] ?? '',
    ]));
    const currentMissing = currentRow ? null : missingPeriod(currentReportState);
    const previousMissing = previousRow ? null : missingPeriod(previousReportState);
    const current = currentRow ? normalizeMetrics(currentRow) : currentMissing.metrics;
    const previous = previousRow ? normalizeMetrics(previousRow) : previousMissing.metrics;
    const comparison = compareMetrics(current, previous);
    let previousStatus = previousMissing?.status;
    if (previousRow) previousStatus = currentRow ? 'matched' : 'present';

    return {
      ...identity,
      ...nullableMetrics(current),
      presence: currentRow && previousRow
        ? 'matched'
        : currentRow
          ? 'current_only'
          : 'previous_only',
      currentStatus: currentRow ? 'present' : currentMissing.status,
      previousStatus,
      previous,
      difference: comparison.difference,
      percentDelta: comparison.percentDelta,
    };
  });
}

function relativeUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}` || '/';
  } catch {
    return url;
  }
}

function normalizePageRows(rows) {
  return rows.map((row) => ({
    ...row,
    page: relativeUrl(row.page),
    url: relativeUrl(row.page),
  }));
}

function sortFullQueryPages(rows) {
  return [...rows].sort((a, b) => {
    const pageDifference = compareText(a.page, b.page);
    if (pageDifference !== 0) return pageDifference;

    const currentImpressions = metricValue(b.impressions) - metricValue(a.impressions);
    if (currentImpressions !== 0) return currentImpressions;

    const currentClicks = metricValue(b.clicks) - metricValue(a.clicks);
    if (currentClicks !== 0) return currentClicks;

    const previousImpressions = metricValue(b.previous?.impressions) - metricValue(a.previous?.impressions);
    if (previousImpressions !== 0) return previousImpressions;

    const previousClicks = metricValue(b.previous?.clicks) - metricValue(a.previous?.clicks);
    if (previousClicks !== 0) return previousClicks;

    return compareText(a.query, b.query);
  });
}

function coveragePercent(queryMetric, pageMetric) {
  if (typeof queryMetric !== 'number' || typeof pageMetric !== 'number' || pageMetric === 0) {
    return null;
  }
  return (queryMetric / pageMetric) * 100;
}

function buildPageQueryCoverage(pageRows, queryPageRows, pageState, queryPageState) {
  const pages = normalizePageRows(currentRowsForAnalysis(pageRows, ['page']));
  const queryPages = normalizePageRows(currentRowsForAnalysis(queryPageRows, ['query', 'page']));
  const pageByUrl = new Map(pages.map((row) => [row.page, row]));
  const queriesByUrl = new Map();

  for (const row of queryPages) {
    const aggregate = queriesByUrl.get(row.page) ?? { clicks: 0, impressions: 0, rowCount: 0 };
    aggregate.clicks += row.clicks;
    aggregate.impressions += row.impressions;
    aggregate.rowCount += 1;
    queriesByUrl.set(row.page, aggregate);
  }

  const urls = [...new Set([...pageByUrl.keys(), ...queriesByUrl.keys()])].sort(compareText);
  return urls.map((page) => {
    const pageRow = pageByUrl.get(page);
    const queryAggregate = queriesByUrl.get(page) ?? { clicks: 0, impressions: 0, rowCount: 0 };
    const hasQueryRows = queryAggregate.rowCount > 0;
    const pageMissing = pageRow ? null : missingPeriod(pageState);
    // Una fila query + page sin su fila page es una inconsistencia entre
    // agregaciones, no evidencia de que las métricas de página sean cero.
    const pageMetrics = pageRow
      ? normalizeMetrics(pageRow)
      : hasQueryRows
        ? null
        : pageMissing.metrics;
    const queryMetricsAvailable = queryPageState.succeeded;
    const queryClicks = queryMetricsAvailable ? queryAggregate.clicks : null;
    const queryImpressions = queryMetricsAvailable ? queryAggregate.impressions : null;

    return {
      page,
      pageClicks: pageMetrics?.clicks ?? null,
      pageImpressions: pageMetrics?.impressions ?? null,
      queryClicks,
      queryImpressions,
      clicksCoveragePct: coveragePercent(queryClicks, pageMetrics?.clicks ?? null),
      impressionsCoveragePct: coveragePercent(queryImpressions, pageMetrics?.impressions ?? null),
      queryRowCount: queryMetricsAvailable ? queryAggregate.rowCount : 0,
      pageDataStatus: pageRow
        ? 'present'
        : hasQueryRows
          ? 'page_row_missing'
          : pageMissing.status,
      pageReportStatus: pageState.apiResponseStatus,
      queryDataStatus: queryPageState.apiResponseStatus,
    };
  });
}

function countStatuses(rows, field) {
  const counts = {};
  for (const row of rows) counts[row[field]] = (counts[row[field]] ?? 0) + 1;
  return counts;
}

function queryPageDatasetQuality(currentState, previousState, rows) {
  const reportSummary = (state) => ({
    fetchLimit: state.fetchLimit,
    fetchedRows: state.fetchedRows,
    reachedLimit: state.reachedLimit,
    potentiallyTruncated: state.potentiallyTruncated,
    apiResponseStatus: state.apiResponseStatus,
  });

  return {
    storedRows: rows.length,
    currentRows: currentState.fetchedRows,
    previousRows: previousState.fetchedRows,
    unionRows: rows.length,
    current: reportSummary(currentState),
    previous: reportSummary(previousState),
    presenceCounts: countStatuses(rows, 'presence'),
    currentStatusCounts: countStatuses(rows, 'currentStatus'),
    previousStatusCounts: countStatuses(rows, 'previousStatus'),
  };
}

function findCtrOpportunities(topQueries) {
  return topQueries
    .filter((row) => row.position <= 10 && row.ctr < 0.03 && row.impressions > 50)
    .map((row) => ({
      query: row.query,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));
}

function findPositionOpportunities(topQueries) {
  return topQueries
    .filter((row) => row.position >= 4 && row.position <= 15 && row.impressions >= 50)
    .sort((a, b) => b.impressions - a.impressions || a.position - b.position)
    .map((row) => ({
      query: row.query,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));
}

function findCannibalization(queryPages) {
  const byQuery = new Map();

  for (const row of queryPages) {
    if (row.impressions <= 10) continue;
    const entries = byQuery.get(row.query) ?? [];
    entries.push({
      url: row.url,
      clicks: row.clicks,
      impressions: row.impressions,
      imp: row.impressions,
      ctr: row.ctr,
      position: row.position,
    });
    byQuery.set(row.query, entries);
  }

  return [...byQuery.entries()]
    .map(([query, urls]) => ({
      query,
      urls: urls.sort((a, b) => b.impressions - a.impressions || compareText(a.url, b.url)),
    }))
    .filter(({ urls }) => urls.length > 1 && (urls[1].impressions / urls[0].impressions) > 0.3)
    .sort((a, b) => compareText(a.query, b.query));
}

function buildDataQuality(reportRuns, displayedCollections, analysisRows, queryPageDataset) {
  const succeeded = reportRuns.filter((report) => report.succeeded);
  const emptyReports = succeeded
    .filter((report) => report.rows.length === 0)
    .map((report) => report.name);
  const reportsAtFetchLimit = succeeded
    .filter((report) => report.dimensions.length > 0 && report.rows.length >= report.rowLimit)
    .map((report) => report.name);
  const warnings = reportRuns
    .filter((report) => report.warning)
    .map((report) => report.warning);

  if (reportsAtFetchLimit.length > 0) {
    warnings.push(`Posible truncamiento al alcanzar el límite real de descarga: ${reportsAtFetchLimit.join(', ')}.`);
  }

  const previousUnknownBecauseTruncated = Object.fromEntries(
    Object.entries(displayedCollections).map(([name, rows]) => [
      name,
      rows.filter((row) => row.previousUnknownBecauseTruncated).length,
    ]),
  );
  previousUnknownBecauseTruncated.total = Object.values(previousUnknownBecauseTruncated)
    .reduce((total, count) => total + count, 0);

  return {
    periodDays: PERIOD_DAYS,
    reportsRequested: reportRuns.length,
    reportsSucceeded: succeeded.length,
    warnings,
    emptyReports,
    reportsAtFetchLimit,
    // Compatibilidad con lectores existentes: ahora solo contiene informes que
    // alcanzaron el límite real de recuperación, nunca el límite visible.
    truncatedReports: reportsAtFetchLimit,
    displayLimit: DISPLAY_LIMIT,
    fetchLimit: FETCH_LIMIT,
    topLimit: DISPLAY_LIMIT,
    rowsFetched: Object.fromEntries(reportRuns.map((report) => [report.name, report.rows.length])),
    rowsDisplayed: Object.fromEntries(
      Object.entries(displayedCollections).map(([name, rows]) => [name, rows.length]),
    ),
    analysisRows,
    queryPageDataset,
    previousUnknownBecauseTruncated,
  };
}

function globalReport(rows, state) {
  if (!state.succeeded) return { status: 'report_unavailable', metrics: null };
  if (rows.length === 0) return { status: 'empty_response', metrics: null };
  const row = rows[0];
  if (rows.length !== 1 || !METRICS.every((metric) => Number.isFinite(row?.[metric]) && row[metric] >= 0)) {
    return { status: 'invalid_response', metrics: null };
  }
  return {
    status: row.clicks === 0 && row.impressions === 0 ? 'valid_zero' : 'available',
    metrics: normalizeMetrics(row),
  };
}

const EN_PERIODS = ['current', 'previous'];
const EN_SOURCE_STATUSES = ['complete_from_api_response', 'potentially_truncated_by_fetch_limit',
  'report_unavailable', 'invalid_response'];
const EN_PAGE_STATUSES = ['observed', 'no_observation', 'unknown_truncated',
  'report_unavailable', 'invalid_response', 'page_row_missing'];

function validObservedMetrics(row) {
  return METRICS.every((key) => typeof row?.[key] === 'number' && Number.isFinite(row[key]) && row[key] >= 0)
    && row.ctr <= 1 && row.clicks <= row.impressions
    && (row.impressions !== 0 || (row.clicks === 0 && row.ctr === 0));
}

function validAbsoluteUrl(value) {
  try { const url = new URL(value); return url.href === value && !url.hash && !url.username && !url.password; }
  catch { return false; }
}

function englishSource(reports, runs, period, key) {
  const state = reportState(runs, period, key);
  const run = runs.find((item) => item.period === period && item.key === key);
  const rows = reports[period][key];
  const keyCount = key === 'page' ? 1 : 2;
  const seen = new Set();
  const valid = Array.isArray(rows) && rows.every((row) => {
    if (!Array.isArray(row?.keys) || row.keys.length !== keyCount
      || !row.keys.every((value) => typeof value === 'string')) return false;
    const identity = rowKey(row);
    const unique = !seen.has(identity);
    seen.add(identity);
    return unique && validObservedMetrics(row) && Array.isArray(row.keys)
      && row.keys.length === keyCount && row.keys.every((value) => typeof value === 'string')
      && validAbsoluteUrl(row.keys[keyCount - 1]);
  });
  return {
    source: key, fetchedRows: state.fetchedRows, fetchLimit: state.fetchLimit,
    status: !state.succeeded ? 'report_unavailable'
      : run?.invalidResponse || !valid ? 'invalid_response' : state.apiResponseStatus,
  };
}

function sourceUsable(source) {
  return ['complete_from_api_response', 'potentially_truncated_by_fetch_limit'].includes(source.status);
}

function englishComparison(current, previous) {
  const comparison = compareMetrics(current, previous);
  // CTR/position have no meaningful movement without impressions in both periods.
  if (comparison.difference && (!current.impressions || !previous.impressions)) {
    comparison.difference.ctr = comparison.difference.position = null;
  }
  if (comparison.percentDelta) {
    comparison.percentDelta.ctr = comparison.percentDelta.position = null;
  }
  return comparison;
}

function englishTotal(reports, runs, period) {
  const key = EN_TOTAL_DEFINITION.key;
  const run = runs.find((item) => item.period === period && item.key === key);
  const rows = reports[period][key];
  const responseAggregationType = typeof run?.responseAggregationType === 'string'
    ? run.responseAggregationType : null;
  let status;
  if (!run?.succeeded) status = 'report_unavailable';
  else if (run.invalidResponse || !Array.isArray(rows)) status = 'invalid_response';
  else if (rows.length === 0) status = 'empty_response';
  else if (rows.length !== 1 || !validObservedMetrics(rows[0])
    || (rows[0].keys != null && (!Array.isArray(rows[0].keys) || rows[0].keys.length !== 0))
    || responseAggregationType !== 'byPage') status = 'invalid_response';
  else status = rows[0].impressions === 0 ? 'valid_zero' : 'available';
  return { metrics: ['available', 'valid_zero'].includes(status) ? normalizeMetrics(rows[0]) : null,
    quality: { source: key, status, fetchedRows: rows?.length ?? 0, fetchLimit: 1,
      requestedAggregationType: 'auto', responseAggregationType } };
}

function buildEnglishReport(reports, runs, periods, publishedPages) {
  const quality = { totals: {}, pages: {}, queryPages: {} };
  const totals = {};
  for (const period of EN_PERIODS) {
    const total = englishTotal(reports, runs, period);
    totals[period] = total.metrics;
    quality.totals[period] = total.quality;
    quality.pages[period] = englishSource(reports, runs, period, 'page');
    quality.queryPages[period] = englishSource(reports, runs, period, 'queryPage');
  }
  const urls = new Set(publishedPages);
  for (const period of EN_PERIODS) {
    for (const [key, index] of [['page', 0], ['queryPage', 1]]) {
      for (const row of reports[period][key]) {
        if (isEnglishPageUrl(row?.keys?.[index])) urls.add(row.keys[index]);
      }
    }
  }
  const pages = [...urls].map((page) => {
    const observations = {};
    const statuses = {};
    for (const period of EN_PERIODS) {
      const source = quality.pages[period];
      const row = reports[period].page.find((item) => item?.keys?.[0] === page);
      const queryEvidence = sourceUsable(quality.queryPages[period])
        && reports[period].queryPage.some((item) => item.keys[1] === page);
      observations[period] = sourceUsable(source) && row ? normalizeMetrics(row) : null;
      statuses[period] = !sourceUsable(source) ? source.status
        : row ? 'observed' : queryEvidence ? 'page_row_missing'
          : source.status === 'potentially_truncated_by_fetch_limit' ? 'unknown_truncated' : 'no_observation';
    }
    return { page, ...englishComparison(observations.current, observations.previous),
      currentStatus: statuses.current, previousStatus: statuses.previous };
  }).sort((a, b) => (b.current?.impressions ?? -1) - (a.current?.impressions ?? -1)
    || (b.current?.clicks ?? -1) - (a.current?.clicks ?? -1) || compareText(a.page, b.page));
  return { scope: { ...EN_SCOPE }, periods: structuredClone(periods),
    publishedPages: [...publishedPages].sort(compareText),
    totals: englishComparison(totals.current, totals.previous), pages, quality };
}

function assertEnglishComparison(value, label) {
  assertSnapshot(value && typeof value === 'object' && !Array.isArray(value), `${label}: objeto EN obligatorio`);
  for (const period of EN_PERIODS) {
    assertSnapshot(value[period] === null || validObservedMetrics(value[period]), `${label}.${period}: métricas EN inválidas`);
  }
  const expected = englishComparison(value.current, value.previous);
  for (const field of ['difference', 'percentDelta']) {
    if (expected[field] === null) assertSnapshot(value[field] === null, `${label}.${field} debe ser null`);
    else for (const metric of METRICS) {
      const actual = value[field]?.[metric];
      const wanted = expected[field][metric];
      assertSnapshot(wanted === null ? actual === null
        : typeof actual === 'number' && Number.isFinite(actual) && approximatelyEqual(actual, wanted),
      `${label}.${field}.${metric}: comparación EN inválida`);
    }
  }
}

function validateEnglishReport(snapshot) {
  const en = snapshot.english;
  assertSnapshot(snapshot.schemaVersion === 4 && en && typeof en === 'object', 'english requiere v4');
  for (const [key, value] of Object.entries(EN_SCOPE)) assertSnapshot(en.scope?.[key] === value, 'scope EN inválido');
  assertSnapshot(JSON.stringify(en.periods) === JSON.stringify(snapshot.periods), 'periodos EN distintos del padre');
  assertSnapshot(Array.isArray(en.publishedPages) && new Set(en.publishedPages).size === en.publishedPages.length,
    'inventario EN inválido');
  assertSnapshot(en.publishedPages.every((page) => isEnglishPageUrl(page) && validAbsoluteUrl(page)
    && !new URL(page).search), 'inventario publicado EN fuera del scope');
  assertEnglishComparison(en.totals, 'english.totals');
  for (const period of EN_PERIODS) {
    const total = en.quality?.totals?.[period];
    assertSnapshot(total?.source === EN_TOTAL_DEFINITION.key && total.requestedAggregationType === 'auto'
      && ['available', 'valid_zero', 'report_unavailable', 'empty_response', 'invalid_response'].includes(total.status)
      && (total.responseAggregationType === null || typeof total.responseAggregationType === 'string'), 'provenance EN inválida');
    assertSnapshot(Number.isInteger(total.fetchedRows) && total.fetchedRows >= 0 && total.fetchLimit === 1
      && total.fetchedRows === snapshot.dataQuality.rowsFetched[`${period}.englishTotal`], 'filas de totales EN incoherentes');
    const available = ['available', 'valid_zero'].includes(total.status);
    assertSnapshot(available ? en.totals[period] !== null && total.responseAggregationType === 'byPage'
      && ((en.totals[period].impressions === 0) === (total.status === 'valid_zero'))
      : en.totals[period] === null, 'estado de totales EN incoherente');
    if (available) assertSnapshot(total.fetchedRows === 1, 'total EN requiere una fila');
    if (total.status === 'empty_response') assertSnapshot(total.fetchedRows === 0, 'total EN vacío incoherente');
    for (const [collection, source] of [['pages', 'page'], ['queryPages', 'queryPage']]) {
      const item = en.quality?.[collection]?.[period];
      assertSnapshot(item?.source === source && EN_SOURCE_STATUSES.includes(item.status)
        && Number.isInteger(item.fetchedRows) && item.fetchedRows >= 0
        && Number.isInteger(item.fetchLimit) && item.fetchLimit > 0, 'calidad dimensional EN inválida');
      assertSnapshot(item.fetchedRows === snapshot.dataQuality.rowsFetched[`${period}.${source}`], 'filas EN incoherentes');
      if (sourceUsable(item)) assertSnapshot((item.fetchedRows >= item.fetchLimit)
        === (item.status === 'potentially_truncated_by_fetch_limit'), 'límite EN incoherente');
      if (collection === 'queryPages' && item.status !== 'invalid_response') {
        assertSnapshot(item.status === snapshot.dataQuality.queryPageDataset[period].apiResponseStatus,
          'estado de fuente query EN incoherente');
      }
    }
  }
  assertSnapshot(Array.isArray(en.pages) && new Set(en.pages.map((row) => row.page)).size === en.pages.length, 'páginas EN duplicadas');
  const pages = new Map(en.pages.map((row) => [row.page, row]));
  for (const page of en.publishedPages) assertSnapshot(pages.has(page), 'falta página EN publicada');
  for (const period of EN_PERIODS) {
    assertSnapshot(en.pages.filter((row) => row[`${period}Status`] === 'observed').length
      <= en.quality.pages[period].fetchedRows, 'observaciones EN exceden las filas page recuperadas');
  }
  for (const row of en.pages) {
    assertSnapshot(isEnglishPageUrl(row.page) && validAbsoluteUrl(row.page), 'página EN fuera del scope');
    assertEnglishComparison(row, 'english.pages');
    for (const period of EN_PERIODS) {
      const status = row[`${period}Status`];
      const source = en.quality.pages[period];
      assertSnapshot(EN_PAGE_STATUSES.includes(status), 'estado de página EN inválido');
      assertSnapshot(status === 'observed' ? row[period] !== null && sourceUsable(source) && source.fetchedRows > 0
        : row[period] === null, 'observación EN incoherente');
      if (!sourceUsable(source)) assertSnapshot(status === source.status, 'fallo EN incoherente');
      else if (status !== 'observed') {
        const queryEvidence = snapshot.queryPagesFull.some((query) => query.sourcePage === row.page
          && queryObserved(query, period, en));
        const expected = queryEvidence ? 'page_row_missing'
          : source.status === 'potentially_truncated_by_fetch_limit' ? 'unknown_truncated' : 'no_observation';
        assertSnapshot(status === expected, 'ausencia EN incoherente con fuente/evidencia query');
      }
    }
  }
  for (const row of snapshot.queryPagesFull) {
    assertSnapshot(validAbsoluteUrl(row.sourcePage) && relativeUrl(row.sourcePage) === row.page, 'origen query/page EN no conservado');
    if (isEnglishPageUrl(row.sourcePage)) {
      assertSnapshot(pages.has(row.sourcePage), 'falta página con evidencia query EN');
      for (const period of EN_PERIODS) {
        const metrics = queryObserved(row, period, en);
        if (metrics) assertSnapshot(validObservedMetrics(metrics), 'query EN inválida');
      }
    }
  }
}

function queryObserved(row, period, english) {
  if (!sourceUsable(english.quality.queryPages[period])) return null;
  const status = row[`${period}Status`];
  return ['present', 'matched'].includes(status)
    ? period === 'current' ? Object.fromEntries(METRICS.map((key) => [key, row[key]])) : row.previous
    : null;
}

export function buildSeoSnapshot({ generatedAt, periods, dateCoverage, reports, reportRuns, publishedEnglishPages }) {
  assertDateCoverage(dateCoverage, periods);
  const english = publishedEnglishPages === undefined ? undefined
    : buildEnglishReport(reports, reportRuns, periods, publishedEnglishPages);
  if (english) {
    // EN classified the untouched sources above. Unsafe dimensional rows must
    // not crash legacy display helpers or be normalized into fabricated zeros.
    reports = Object.fromEntries(EN_PERIODS.map((period) => [period, {
      ...reports[period],
      ...Object.fromEntries(['page', 'queryPage'].map((key) => [key, reports[period][key].filter((row) => {
        const count = key === 'page' ? 1 : 2;
        return validObservedMetrics(row) && Array.isArray(row.keys) && row.keys.length === count
          && row.keys.every((value) => typeof value === 'string') && validAbsoluteUrl(row.keys[count - 1]);
      })])),
    }]));
    // The existing v3/v4 dimensional contract represents unusable absence as
    // unknown_report_unavailable. Keep valid rows and raw retrieval counts, but
    // never infer known_absent from a source with invalid/discarded observations.
    reportRuns = reportRuns.map((run) => {
      const collection = run.key === 'page' ? 'pages' : run.key === 'queryPage' ? 'queryPages' : null;
      if (!collection || english.quality[collection][run.period].status !== 'invalid_response') return run;
      return { ...run, comparisonUnavailable: true,
        warning: `${run.name}: respuesta inválida; las identidades ausentes son desconocidas, no ceros.` };
    });
  }
  const currentGlobal = globalReport(reports.current.global, reportState(reportRuns, 'current', 'global'));
  const previousGlobal = globalReport(reports.previous.global, reportState(reportRuns, 'previous', 'global'));
  const topQueries = compareRows(
    reports.current.query,
    reports.previous.query,
    ['query'],
    reportState(reportRuns, 'previous', 'query'),
  );
  const topPages = normalizePageRows(compareRows(
    reports.current.page,
    reports.previous.page,
    ['page'],
    reportState(reportRuns, 'previous', 'page'),
  ));
  const countries = compareRows(
    reports.current.country,
    reports.previous.country,
    ['country'],
    reportState(reportRuns, 'previous', 'country'),
  );
  const devices = compareRows(
    reports.current.device,
    reports.previous.device,
    ['device'],
    reportState(reportRuns, 'previous', 'device'),
  );
  const queryPages = normalizePageRows(compareRows(
    reports.current.queryPage,
    reports.previous.queryPage,
    ['query', 'page'],
    reportState(reportRuns, 'previous', 'queryPage'),
  ));
  const queryPagesForAnalysis = normalizePageRows(currentRowsForAnalysis(
    reports.current.queryPage,
    ['query', 'page'],
  ));
  const currentQueryPageState = reportState(reportRuns, 'current', 'queryPage');
  const previousQueryPageState = reportState(reportRuns, 'previous', 'queryPage');
  const queryPagesFull = sortFullQueryPages(normalizePageRows(compareAllRows(
    reports.current.queryPage,
    reports.previous.queryPage,
    ['query', 'page'],
    currentQueryPageState,
    previousQueryPageState,
  ).map((row) => ({ ...row, sourcePage: row.page }))));
  const pageQueryCoverage = buildPageQueryCoverage(
    reports.current.page,
    reports.current.queryPage,
    reportState(reportRuns, 'current', 'page'),
    currentQueryPageState,
  );
  const displayedCollections = {
    topQueries,
    topPages,
    countries,
    devices,
    queryPages,
  };
  const queryPageDataset = queryPageDatasetQuality(
    currentQueryPageState,
    previousQueryPageState,
    queryPagesFull,
  );
  const dataQuality = buildDataQuality(
    reportRuns,
    displayedCollections,
    {
      queryPages: queryPagesForAnalysis.length,
      queryPagesFull: queryPagesFull.length,
      pageQueryCoverage: pageQueryCoverage.length,
    },
    queryPageDataset,
  );
  dataQuality.dateCoverage = dateCoverage;
  dataQuality.globalReports = { current: currentGlobal.status, previous: previousGlobal.status };
  for (const [period, report] of Object.entries({ current: currentGlobal, previous: previousGlobal })) {
    if (report.metrics === null) dataQuality.warnings.push(`${period}.global: no disponible (${report.status}); no equivale a tráfico cero.`);
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    schemaDescription: 'v4: conserva los datasets v3; verifica el corte temporal mediante first_incomplete_date y representa totales globales no disponibles con null.',
    updatedAt: generatedAt,
    periods,
    globalMetrics: compareMetrics(currentGlobal.metrics, previousGlobal.metrics),
    topQueries,
    topPages,
    countries,
    devices,
    queryPages,
    queryPagesFull,
    pageQueryCoverage,
    cannibalization: findCannibalization(queryPagesForAnalysis),
    ctrOpportunities: findCtrOpportunities(topQueries),
    positionOpportunities: findPositionOpportunities(topQueries),
    dataQuality,
    ...(english === undefined ? {} : { english }),
  };
}

function assertSnapshot(condition, message) {
  if (!condition) throw new Error(`Snapshot SEO inválido: ${message}`);
}

const API_RESPONSE_STATUSES = [
  'complete_from_api_response',
  'potentially_truncated_by_fetch_limit',
  'report_unavailable',
];
const UNKNOWN_STATUSES = ['unknown_truncated', 'unknown_report_unavailable'];

function isNonNegativeMetric(value) {
  return value === null || (typeof value === 'number' && Number.isFinite(value) && value >= 0);
}

function assertMetricSet(metrics, label) {
  assertSnapshot(metrics && typeof metrics === 'object' && !Array.isArray(metrics), `${label} debe ser un objeto`);
  for (const metric of METRICS) {
    assertSnapshot(Object.hasOwn(metrics, metric), `${label}.${metric} es obligatorio`);
    assertSnapshot(isNonNegativeMetric(metrics[metric]), `${label}.${metric} debe ser un número no negativo o null`);
  }
}

function assertKnownAbsent(metrics, label) {
  assertMetricSet(metrics, label);
  assertSnapshot(metrics.clicks === 0, `${label}.clicks debe ser 0 si la ausencia es conocida`);
  assertSnapshot(metrics.impressions === 0, `${label}.impressions debe ser 0 si la ausencia es conocida`);
  assertSnapshot(metrics.ctr === null, `${label}.ctr debe ser null si la ausencia es conocida`);
  assertSnapshot(metrics.position === null, `${label}.position debe ser null si la ausencia es conocida`);
}

function assertUnknownMetrics(metrics, label) {
  assertMetricSet(metrics, label);
  for (const metric of METRICS) {
    assertSnapshot(metrics[metric] === null, `${label}.${metric} debe ser null si el periodo es desconocido`);
  }
}

function approximatelyEqual(actual, expected) {
  return Math.abs(actual - expected) <= 1e-9 * Math.max(1, Math.abs(actual), Math.abs(expected));
}

function assertComparison(current, previous, difference, percentDelta, label) {
  assertMetricSet(current, `${label}.current`);

  if (previous === null) {
    assertSnapshot(difference === null, `${label}.difference debe ser null sin previous`);
    assertSnapshot(percentDelta === null, `${label}.percentDelta debe ser null sin previous`);
    return;
  }

  assertMetricSet(previous, `${label}.previous`);
  assertSnapshot(difference && typeof difference === 'object' && !Array.isArray(difference),
    `${label}.difference debe ser un objeto`);
  assertSnapshot(percentDelta && typeof percentDelta === 'object' && !Array.isArray(percentDelta),
    `${label}.percentDelta debe ser un objeto`);

  for (const metric of METRICS) {
    assertSnapshot(Object.hasOwn(difference, metric), `${label}.difference.${metric} es obligatorio`);
    assertSnapshot(Object.hasOwn(percentDelta, metric), `${label}.percentDelta.${metric} es obligatorio`);
    const differenceValue = difference[metric];
    const percentValue = percentDelta[metric];
    assertSnapshot(differenceValue === null || (typeof differenceValue === 'number' && Number.isFinite(differenceValue)),
      `${label}.difference.${metric} debe ser un número finito o null`);
    assertSnapshot(percentValue === null || (typeof percentValue === 'number' && Number.isFinite(percentValue)),
      `${label}.percentDelta.${metric} debe ser un número finito o null`);

    if (current[metric] === null || previous[metric] === null) {
      assertSnapshot(differenceValue === null, `${label}.difference.${metric} debe ser null si una métrica es desconocida`);
      assertSnapshot(percentValue === null, `${label}.percentDelta.${metric} debe ser null si una métrica es desconocida`);
      continue;
    }

    const expectedDifference = current[metric] - previous[metric];
    assertSnapshot(
      typeof differenceValue === 'number' && approximatelyEqual(differenceValue, expectedDifference),
      `${label}.difference.${metric} no coincide con current - previous`,
    );
    if (previous[metric] === 0) {
      assertSnapshot(percentValue === null, `${label}.percentDelta.${metric} debe ser null con denominador 0`);
    } else {
      const expectedPercent = calculatePercentDelta(current[metric], previous[metric]);
      assertSnapshot(
        typeof percentValue === 'number' && approximatelyEqual(percentValue, expectedPercent),
        `${label}.percentDelta.${metric} no coincide con las métricas`,
      );
    }
  }
}

export function validateSeoSnapshot(snapshot) {
  assertSnapshot([3, SCHEMA_VERSION].includes(snapshot?.schemaVersion), `schemaVersion debe ser 3 o ${SCHEMA_VERSION}`);
  const historical = snapshot.schemaVersion === 3;
  if (!historical) assertDateCoverage(snapshot.dataQuality?.dateCoverage, snapshot.periods);
  const global = snapshot.globalMetrics;
  assertSnapshot(global && typeof global === 'object', 'falta globalMetrics');
  for (const period of ['current', 'previous']) {
    const metrics = global[period];
    if (historical) {
      // v3 stored numeric totals without provenance. Validate their shape, but
      // never reclassify historical zeros as API-confirmed zeros.
      assertMetricSet(metrics, `globalMetrics.${period}`);
      assertSnapshot(METRICS.every((metric) => metrics[metric] !== null), 'total global v3 no puede ser null');
      continue;
    }
    const status = snapshot.dataQuality?.globalReports?.[period];
    assertSnapshot(['available', 'valid_zero', 'report_unavailable', 'empty_response', 'invalid_response'].includes(status), 'estado global inválido');
    if (['available', 'valid_zero'].includes(status)) {
      assertMetricSet(metrics, `globalMetrics.${period}`);
      assertSnapshot(METRICS.every((metric) => metrics[metric] !== null), 'total global válido no puede ser null');
      assertSnapshot((metrics.clicks === 0 && metrics.impressions === 0) === (status === 'valid_zero'), 'estado valid_zero incoherente');
    } else {
      assertSnapshot(metrics === null, 'global no disponible debe ser null');
    }
  }
  if (global.current === null || global.previous === null) {
    assertSnapshot(global.difference === null && global.percentDelta === null, 'comparación global no disponible debe ser null');
  } else {
    assertComparison(global.current, global.previous, global.difference, global.percentDelta, 'globalMetrics');
  }
  for (const field of [
    'topQueries',
    'topPages',
    'countries',
    'devices',
    'queryPages',
    'queryPagesFull',
    'pageQueryCoverage',
    'cannibalization',
    'ctrOpportunities',
    'positionOpportunities',
  ]) {
    assertSnapshot(Array.isArray(snapshot[field]), `${field} debe ser un array`);
  }

  const dataset = snapshot.dataQuality?.queryPageDataset;
  assertSnapshot(dataset && typeof dataset === 'object', 'falta dataQuality.queryPageDataset');
  assertSnapshot(dataset.storedRows === snapshot.queryPagesFull.length, 'storedRows no coincide');
  assertSnapshot(dataset.unionRows === snapshot.queryPagesFull.length, 'unionRows no coincide');
  for (const period of ['current', 'previous']) {
    const report = dataset[period];
    assertSnapshot(report && typeof report === 'object', `falta queryPageDataset.${period}`);
    assertSnapshot(Number.isInteger(report.fetchLimit) && report.fetchLimit > 0,
      `${period}.fetchLimit debe ser entero positivo`);
    assertSnapshot(Number.isInteger(report.fetchedRows) && report.fetchedRows >= 0,
      `${period}.fetchedRows debe ser entero no negativo`);
    assertSnapshot(typeof report.reachedLimit === 'boolean', `${period}.reachedLimit debe ser boolean`);
    assertSnapshot(typeof report.potentiallyTruncated === 'boolean',
      `${period}.potentiallyTruncated debe ser boolean`);
    assertSnapshot(API_RESPONSE_STATUSES.includes(report.apiResponseStatus), `${period}.apiResponseStatus desconocido`);
  }

  for (const row of snapshot.queryPagesFull) {
    assertSnapshot(typeof row.query === 'string', 'queryPagesFull.query debe ser texto');
    assertSnapshot(typeof row.page === 'string', 'queryPagesFull.page debe ser texto');
    assertSnapshot(typeof row.url === 'string', 'queryPagesFull.url debe ser texto');
    assertSnapshot(['matched', 'current_only', 'previous_only'].includes(row.presence), 'presence desconocido');
    assertSnapshot(['present', 'known_absent', ...UNKNOWN_STATUSES].includes(row.currentStatus),
      'currentStatus desconocido');
    assertSnapshot(['matched', 'present', 'known_absent', ...UNKNOWN_STATUSES].includes(row.previousStatus),
      'previousStatus desconocido');
    assertSnapshot(Object.hasOwn(row, 'previous'), 'queryPagesFull.previous es obligatorio');
    assertSnapshot(Object.hasOwn(row, 'difference'), 'queryPagesFull.difference es obligatorio');
    assertSnapshot(Object.hasOwn(row, 'percentDelta'), 'queryPagesFull.percentDelta es obligatorio');

    const current = Object.fromEntries(METRICS.map((metric) => [metric, row[metric]]));
    if (UNKNOWN_STATUSES.includes(row.currentStatus)) {
      assertUnknownMetrics(current, 'queryPagesFull.current');
      assertSnapshot(row.difference === null && row.percentDelta === null,
        'queryPagesFull: comparación debe ser null sin observación current');
      if (row.previous !== null) assertMetricSet(row.previous, 'queryPagesFull.previous');
    } else {
      assertComparison(current, row.previous, row.difference, row.percentDelta, 'queryPagesFull');
    }

    if (row.currentStatus === 'known_absent') assertKnownAbsent(current, 'queryPagesFull.current');
    if (UNKNOWN_STATUSES.includes(row.currentStatus)) assertUnknownMetrics(current, 'queryPagesFull.current');
    if (row.currentStatus === 'present') {
      assertSnapshot(METRICS.every((metric) => current[metric] !== null),
        'queryPagesFull.current no puede contener null con status present');
    }
    if (row.previousStatus === 'known_absent') assertKnownAbsent(row.previous, 'queryPagesFull.previous');
    if (UNKNOWN_STATUSES.includes(row.previousStatus)) {
      assertSnapshot(row.previous === null, 'queryPagesFull.previous debe ser null si el periodo es desconocido');
    }
    if (['matched', 'present'].includes(row.previousStatus)) {
      assertMetricSet(row.previous, 'queryPagesFull.previous');
      assertSnapshot(METRICS.every((metric) => row.previous[metric] !== null),
        'queryPagesFull.previous no puede contener null si está presente');
    }

    assertSnapshot(row.presence !== 'matched' || (row.currentStatus === 'present' && row.previousStatus === 'matched'),
      'presence matched no coincide con los estados');
    assertSnapshot(row.presence !== 'current_only' || (row.currentStatus === 'present'
      && ['known_absent', ...UNKNOWN_STATUSES].includes(row.previousStatus)),
    'presence current_only no coincide con los estados');
    assertSnapshot(row.presence !== 'previous_only' || (['known_absent', ...UNKNOWN_STATUSES].includes(row.currentStatus)
      && row.previousStatus === 'present'),
    'presence previous_only no coincide con los estados');
  }

  for (const coverage of snapshot.pageQueryCoverage) {
    assertSnapshot(typeof coverage.page === 'string', 'pageQueryCoverage.page debe ser texto');
    for (const metric of ['pageClicks', 'pageImpressions', 'queryClicks', 'queryImpressions']) {
      assertSnapshot(Object.hasOwn(coverage, metric), `pageQueryCoverage.${metric} es obligatorio`);
      assertSnapshot(isNonNegativeMetric(coverage[metric]),
        `pageQueryCoverage.${metric} debe ser un número no negativo o null`);
    }
    for (const metric of ['clicksCoveragePct', 'impressionsCoveragePct']) {
      assertSnapshot(Object.hasOwn(coverage, metric), `pageQueryCoverage.${metric} es obligatorio`);
      assertSnapshot(coverage[metric] === null
        || (typeof coverage[metric] === 'number' && Number.isFinite(coverage[metric]) && coverage[metric] >= 0),
      `pageQueryCoverage.${metric} debe ser un número no negativo o null`);
    }
    assertSnapshot(Number.isInteger(coverage.queryRowCount) && coverage.queryRowCount >= 0,
      'pageQueryCoverage.queryRowCount debe ser entero no negativo');
    assertSnapshot(['present', 'page_row_missing', 'known_absent', ...UNKNOWN_STATUSES].includes(coverage.pageDataStatus),
      'pageQueryCoverage.pageDataStatus desconocido');
    assertSnapshot(API_RESPONSE_STATUSES.includes(coverage.pageReportStatus),
      'pageQueryCoverage.pageReportStatus desconocido');
    assertSnapshot(API_RESPONSE_STATUSES.includes(coverage.queryDataStatus),
      'pageQueryCoverage.queryDataStatus desconocido');

    if (coverage.pageDataStatus === 'present') {
      assertSnapshot(coverage.pageClicks !== null && coverage.pageImpressions !== null,
        'pageQueryCoverage requiere métricas page con status present');
    } else if (coverage.pageDataStatus === 'known_absent') {
      assertSnapshot(coverage.pageClicks === 0 && coverage.pageImpressions === 0,
        'pageQueryCoverage requiere ceros con page known_absent');
    } else {
      assertSnapshot(coverage.pageClicks === null && coverage.pageImpressions === null,
        'pageQueryCoverage no puede inventar métricas page ausentes');
    }

    if (coverage.queryDataStatus === 'report_unavailable') {
      assertSnapshot(coverage.queryClicks === null && coverage.queryImpressions === null,
        'pageQueryCoverage query metrics deben ser null si el informe no está disponible');
      assertSnapshot(coverage.queryRowCount === 0,
        'pageQueryCoverage.queryRowCount debe ser 0 si el informe no está disponible');
    } else {
      assertSnapshot(coverage.queryClicks !== null && coverage.queryImpressions !== null,
        'pageQueryCoverage requiere query metrics si el informe está disponible');
    }

    for (const [queryMetric, pageMetric, coverageMetric] of [
      ['queryClicks', 'pageClicks', 'clicksCoveragePct'],
      ['queryImpressions', 'pageImpressions', 'impressionsCoveragePct'],
    ]) {
      const numerator = coverage[queryMetric];
      const denominator = coverage[pageMetric];
      const percentage = coverage[coverageMetric];
      if (numerator === null || denominator === null || denominator === 0) {
        assertSnapshot(percentage === null,
          `pageQueryCoverage.${coverageMetric} debe ser null sin denominador válido`);
      } else {
        const expected = (numerator / denominator) * 100;
        assertSnapshot(typeof percentage === 'number' && approximatelyEqual(percentage, expected),
          `pageQueryCoverage.${coverageMetric} no coincide con sus métricas`);
      }
    }
  }

  if (Object.hasOwn(snapshot, 'english')) validateEnglishReport(snapshot);
  return true;
}

function escapeCell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ');
}

function formatNumber(value, digits = 0) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'No disponible';
  const rounded = Number(value.toFixed(digits));
  const normalized = Object.is(rounded, -0) ? 0 : rounded;
  return normalized.toFixed(digits).replace('.', ',');
}

function formatPercent(value, digits = 1) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'No disponible';
  return `${formatNumber(value * 100, digits)}%`;
}

function formatPercentDelta(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'N/D';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${formatNumber(value, 1)}%`;
}

function formatPositionDifference(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'N/D';
  if (value === 0) return '0,0 (sin cambio)';
  const prefix = value > 0 ? '+' : '';
  const interpretation = value < 0 ? 'mejora' : 'empeora';
  return `${prefix}${formatNumber(value, 1)} (${interpretation})`;
}

function formatPositionChange(current, previous) {
  if (typeof current !== 'number' || !Number.isFinite(current)
    || typeof previous !== 'number' || !Number.isFinite(previous)
    || previous === 0) {
    return 'N/D';
  }
  if (current === previous) return 'Sin cambio';
  const direction = current < previous ? 'Mejora' : 'Empeora';
  return `${direction} ${formatNumber(Math.abs(calculatePercentDelta(current, previous)), 1)}%`;
}

function comparisonTable(rows, identityLabel, identityValue, linkPages = false) {
  if (rows.length === 0) return '*Sin filas para este periodo.*\n';

  let output = `| ${identityLabel} | Clics | Clics ant. | Δ clics | Crec. | Impresiones | CTR | Posición |\n`;
  output += '|---|---:|---:|---:|---:|---:|---:|---:|\n';

  for (const row of rows) {
    const rawIdentity = identityValue(row);
    const identity = linkPages
      ? `[${escapeCell(rawIdentity)}](https://bebergames.com${rawIdentity === '/' ? '/' : rawIdentity})`
      : escapeCell(rawIdentity);
    const previousClicks = row.previous === null ? 'N/D' : formatNumber(row.previous.clicks);
    const differenceClicks = row.difference === null ? 'N/D' : formatNumber(row.difference.clicks);
    const percentDeltaClicks = row.percentDelta === null
      ? 'N/D'
      : formatPercentDelta(row.percentDelta.clicks);
    output += `| ${identity} | ${formatNumber(row.clicks)} | ${previousClicks} | ${differenceClicks} | ${percentDeltaClicks} | ${formatNumber(row.impressions)} | ${formatPercent(row.ctr)} | ${formatNumber(row.position, 1)} |\n`;
  }

  return output;
}

function opportunityTable(rows) {
  if (rows.length === 0) return '*No se detectaron oportunidades con los umbrales actuales.*\n';

  let output = '| Query | Clics | Impresiones | CTR | Posición |\n';
  output += '|---|---:|---:|---:|---:|\n';
  for (const row of rows) {
    output += `| ${escapeCell(row.query)} | ${formatNumber(row.clicks)} | ${formatNumber(row.impressions)} | ${formatPercent(row.ctr)} | ${formatNumber(row.position, 1)} |\n`;
  }
  return output;
}

function englishMetric(metrics, metric) {
  if (!metrics || (['ctr', 'position'].includes(metric) && !metrics.impressions)) return 'N/D';
  return metric === 'ctr' ? formatPercent(metrics[metric]) : formatNumber(metrics[metric], metric === 'position' ? 1 : 0);
}

function englishMovement(current, previous) {
  return METRICS.map((metric) => `${englishMetric(previous, metric)} → ${englishMetric(current, metric)}`);
}

function englishPageLabel(page) {
  // Escape destination syntax independently of the table label.
  return `[${escapeCell(relativeUrl(page)).replace(/[\[\]<>]/g, (char) => `\\${char}`)}](<${page.replaceAll('>', '%3E').replaceAll('<', '%3C').replaceAll('|', '%7C')}>)`;
}

function renderEnglishMarkdown(snapshot) {
  const en = snapshot.english;
  let md = '## English performance\n\n';
  if (!en) return md + '*EN extension not collected in this snapshot.*\n\n';
  md += 'Scope: `https://bebergames.com/en` and `/en/*`, including query-string variants. Same verified periods as above; finalized web-search data.\n\n';
  md += '### EN totals\n\n';
  md += 'Page-filtered totals use page aggregation, not interchangeable with sitewide property totals. ';
  md += EN_PERIODS.map((period) => `${period}: \`${en.quality.totals[period].status}\`, aggregation \`${en.quality.totals[period].responseAggregationType ?? 'unavailable'}\``).join('; ') + '.\n\n';
  md += '| Metric | Previous | Current | Difference | Change |\n|---|---:|---:|---:|---:|\n';
  for (const [metric, label] of [['clicks', 'Clicks'], ['impressions', 'Impressions'], ['ctr', 'CTR'], ['position', 'Average position']]) {
    const delta = en.totals.difference?.[metric];
    const difference = metric === 'ctr' ? delta == null ? 'N/D' : `${formatNumber(delta * 100, 1)} pp`
      : metric === 'position' ? formatPositionDifference(delta) : formatNumber(delta);
    md += `| ${label} | ${englishMetric(en.totals.previous, metric)} | ${englishMetric(en.totals.current, metric)} | ${difference} | ${['clicks', 'impressions'].includes(metric) ? formatPercentDelta(en.totals.percentDelta?.[metric]) : '—'} |\n`;
  }
  md += '\n### EN landing pages\n\nPrevious → current. No minimum-impression threshold.\n\n';
  md += EN_PERIODS.map((period) => `${period} page source: \`${en.quality.pages[period].status}\` (${en.quality.pages[period].fetchedRows}/${en.quality.pages[period].fetchLimit} rows)`).join('; ') + '.\n\n';
  md += '| Page | Impressions | Δ imp. | Clicks | Δ clicks | CTR | Position | Status, previous → current |\n|---|---|---:|---|---:|---|---|---|\n';
  for (const row of en.pages) {
    const [clicks, impressions, ctr, position] = englishMovement(row.current, row.previous);
    md += `| ${englishPageLabel(row.page)} | ${impressions} | ${formatNumber(row.difference?.impressions)} | ${clicks} | ${formatNumber(row.difference?.clicks)} | ${ctr} | ${position} | ${row.previousStatus} → ${row.currentStatus} |\n`;
  }
  md += '\n`page_row_missing`: query/page evidence exists, but page metrics are unavailable. `no_observation`: no returned page observation; never confirmed zero.\n\n';
  md += '### Queries reaching EN pages\n\n';
  md += EN_PERIODS.map((period) => `${period} query/page source: \`${en.quality.queryPages[period].status}\``).join('; ') + '.\n\n';
  for (const page of en.pages) {
    const rows = snapshot.queryPagesFull.filter((row) => row.sourcePage === page.page)
      .sort((a, b) => Math.max(queryObserved(b, 'current', en)?.impressions ?? -1, queryObserved(b, 'previous', en)?.impressions ?? -1)
        - Math.max(queryObserved(a, 'current', en)?.impressions ?? -1, queryObserved(a, 'previous', en)?.impressions ?? -1)
        || compareText(a.query, b.query));
    if (rows.length === 0) continue;
    const shown = rows.slice(0, 5);
    md += `#### ${englishPageLabel(page.page)}\n\nShowing ${shown.length} of ${rows.length} retrieved combinations.\n\n`;
    const queryImpressions = rows.reduce((sum, row) => sum + (queryObserved(row, 'current', en)?.impressions ?? 0), 0);
    const coverage = sourceUsable(en.quality.queryPages.current)
      ? coveragePercent(queryImpressions, page.current?.impressions) : null;
    md += `Current query impression coverage: ${coverage != null
      ? `${formatNumber(coverage, 1)}%` : 'N/D'}. Coverage may be partial; undisclosed queries are not inferred.\n\n`;
    md += '| Query | Impressions, previous → current | Clicks, previous → current | CTR, previous → current | Position, previous → current |\n|---|---|---|---|---|\n';
    for (const row of shown) {
      const [clicks, impressions, ctr, position] = englishMovement(queryObserved(row, 'current', en), queryObserved(row, 'previous', en));
      const query = row.query.replaceAll('\\', '\\\\').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ')
        .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        .replace(/[\[\]`*_]/g, (char) => `\\${char}`);
      md += `| ${query} | ${impressions} | ${clicks} | ${ctr} | ${position} |\n`;
    }
    md += '\n';
  }
  if (!snapshot.queryPagesFull.some((row) => isEnglishPageUrl(row.sourcePage))) md += '*No retrieved EN query/page combinations.*\n\n';
  md += '### Published pages without current observations\n\n';
  md += '| Page | Current | Previous status |\n|---|---|---|\n';
  for (const page of en.publishedPages) {
    const row = en.pages.find((item) => item.page === page);
    if (row.currentStatus === 'observed') continue;
    md += `| ${englishPageLabel(page)} | ${row.currentStatus === 'no_observation'
      ? 'No observed Search Console data in this period.' : row.currentStatus} | ${row.previousStatus} |\n`;
  }
  md += '\nNo observation does not prove zero traffic or an indexing problem. Queries are limited to those disclosed and retrieved.\n\n';
  return md;
}

export function renderSeoMarkdown(snapshot) {
  validateSeoSnapshot(snapshot);
  const { current, previous } = snapshot.periods;
  const global = snapshot.globalMetrics;
  const quality = snapshot.dataQuality;
  const displayLimit = quality.displayLimit ?? quality.topLimit ?? DISPLAY_LIMIT;
  const fetchLimit = quality.fetchLimit ?? quality.topLimit ?? DISPLAY_LIMIT;
  const reportsAtFetchLimit = quality.reportsAtFetchLimit ?? quality.truncatedReports ?? [];
  const unknownCounts = quality.previousUnknownBecauseTruncated ?? { total: 0 };
  const queryPageDataset = quality.queryPageDataset;
  let md = '# Dashboard SEO de BeberGames\n\n';
  md += `> **Última actualización:** ${snapshot.updatedAt}\n`;
  md += `> **Periodo actual:** ${current.start} a ${current.end} (${quality.periodDays} días de calendario)\n`;
  md += `> **Periodo anterior:** ${previous.start} a ${previous.end} (${quality.periodDays} días de calendario)\n\n`;
  md += '*Generado automáticamente mediante GitHub Actions y la API de Google Search Console. No editar manualmente.*\n\n';
  if (snapshot.schemaVersion === 3) {
    md += '**Cobertura temporal histórica no verificada (schema v3).** Se conservan las métricas originales; no hay evidencia de finalización ni estados globales que permitan certificar sus ceros.\n\n';
  } else {
    md += `Corte temporal verificado por \`first_incomplete_date=${quality.dateCoverage.firstIncompleteDate}\`, consultado con \`all\` en \`${quality.dateCoverage.timeZone}\`. Ambos periodos terminan antes de ese límite; sus métricas se solicitan con \`final\`. Comprobado: ${quality.dateCoverage.checkedAt}. Las filas de actividad no determinan el corte.\n\n`;
  }

  md += '## Resumen global\n\n';
  md += 'Search Console mide **clics orgánicos**, no page views. Los totales de esta sección proceden de informes específicos **sin dimensiones**.\n\n';
  if (snapshot.schemaVersion !== 3) {
    md += `Estado de los totales: actual \`${quality.globalReports.current}\`; anterior \`${quality.globalReports.previous}\`. \`valid_zero\` es un cero devuelto por la API; un informe fallido, vacío o inválido es **No disponible**.\n\n`;
  }
  if (global.current === null || global.previous === null) md += '**Comparación global no disponible. No interpretar como una caída de tráfico.**\n\n';

  md += '## Comparativa actual vs anterior\n\n';
  md += '| Métrica | Actual | Anterior | Diferencia | Cambio relativo |\n';
  md += '|---|---:|---:|---:|---:|\n';
  md += `| Clics orgánicos | ${formatNumber(global.current?.clicks)} | ${formatNumber(global.previous?.clicks)} | ${formatNumber(global.difference?.clicks)} | ${formatPercentDelta(global.percentDelta?.clicks)} |\n`;
  md += `| Impresiones | ${formatNumber(global.current?.impressions)} | ${formatNumber(global.previous?.impressions)} | ${formatNumber(global.difference?.impressions)} | ${formatPercentDelta(global.percentDelta?.impressions)} |\n`;
  md += `| CTR global | ${formatPercent(global.current?.ctr)} | ${formatPercent(global.previous?.ctr)} | ${formatPercent(global.difference?.ctr)} | ${formatPercentDelta(global.percentDelta?.ctr)} |\n`;
  md += `| Posición media global | ${formatNumber(global.current?.position, 1)} | ${formatNumber(global.previous?.position, 1)} | ${formatPositionDifference(global.difference?.position)} | ${formatPositionChange(global.current?.position, global.previous?.position)} |\n`;
  md += '\n`N/D` indica que no existe una base porcentual o que falta un dato por fallo, respuesta vacía/inválida o truncamiento. No equivale a cero.\n\n';

  md += renderEnglishMarkdown(snapshot);
  md += `## Top ${displayLimit} queries\n\n`;
  md += comparisonTable(snapshot.topQueries, 'Query', (row) => row.query);
  md += `\n## Top ${displayLimit} pages\n\n`;
  md += comparisonTable(snapshot.topPages, 'Página', (row) => row.url, true);
  md += '\n## Países\n\n';
  md += 'Los códigos de país son los devueltos por Search Console; no se infieren idiomas a partir de ellos.\n\n';
  md += comparisonTable(snapshot.countries, 'País', (row) => row.country);
  md += '\n## Dispositivos\n\n';
  md += comparisonTable(snapshot.devices, 'Dispositivo', (row) => row.device);

  md += '\n## Oportunidades CTR\n\n';
  md += 'Queries en posiciones 1–10, con más de 50 impresiones y CTR inferior al 3%.\n\n';
  md += opportunityTable(snapshot.ctrOpportunities);
  md += '\n## Oportunidades de posición 4–15\n\n';
  md += 'Queries entre las posiciones 4 y 15 con al menos 50 impresiones.\n\n';
  md += opportunityTable(snapshot.positionOpportunities);

  md += '\n## Canibalización\n\n';
  if (snapshot.cannibalization.length === 0) {
    md += '*No se detectaron conflictos con los umbrales actuales en el informe query + page.*\n';
  } else {
    for (const item of snapshot.cannibalization) {
      md += `- **${escapeCell(item.query)}**\n`;
      for (const url of item.urls) {
        md += `  - ${escapeCell(url.url)}: ${formatNumber(url.impressions)} impresiones\n`;
      }
    }
  }

  if (queryPageDataset) {
    md += '\n## Dataset query + page para análisis\n\n';
    md += `- Filas current recuperadas: ${queryPageDataset.currentRows}.\n`;
    md += `- Filas previous recuperadas: ${queryPageDataset.previousRows}.\n`;
    md += `- Filas almacenadas en la unión current + previous: ${queryPageDataset.storedRows}.\n`;
    md += `- URLs con resumen de cobertura: ${snapshot.pageQueryCoverage?.length ?? 0}.\n`;
    md += `- Estado current: ${queryPageDataset.current.apiResponseStatus}.\n`;
    md += `- Estado previous: ${queryPageDataset.previous.apiResponseStatus}.\n\n`;
    md += 'La cobertura compara las filas de queries visibles con las métricas de cada página. Puede ser inferior al 100% porque Search Console omite consultas anonimizadas. No se reconstruyen consultas ocultas.\n';
  }

  md += '\n## Calidad de datos\n\n';
  md += `- Schema: versión ${snapshot.schemaVersion}. ${snapshot.schemaDescription}\n`;
  md += `- Días por periodo: ${quality.periodDays}.\n`;
  md += `- Informes solicitados: ${quality.reportsRequested}.\n`;
  md += `- Informes completados: ${quality.reportsSucceeded}.\n`;
  md += `- Límite visible por colección: ${displayLimit}.\n`;
  md += `- Límite real de descarga por informe dimensional: ${fetchLimit}.\n`;
  md += `- Informes vacíos: ${quality.emptyReports.length > 0 ? quality.emptyReports.join(', ') : 'ninguno'}.\n`;
  md += `- Informes que alcanzaron el límite de descarga: ${reportsAtFetchLimit.length > 0 ? reportsAtFetchLimit.join(', ') : 'ninguno'}.\n`;
  md += `- Comparaciones con previous desconocido por truncamiento: ${unknownCounts.total ?? 0}.\n`;
  if (quality.warnings.length === 0) {
    md += '- Avisos: ninguno.\n';
  } else {
    md += '- Avisos:\n';
    for (const warning of quality.warnings) md += `  - ${escapeCell(warning)}\n`;
  }
  md += '\nLos informes por dimensión pueden omitir consultas anonimizadas o quedar limitados por filas. No deben sumarse siempre como si fueran los totales globales. Para el total del sitio, usa `globalMetrics`, que procede de informes sin dimensiones.\n';

  return md;
}
