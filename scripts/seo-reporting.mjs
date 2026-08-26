export const SCHEMA_VERSION = 2;
export const TOP_LIMIT = 50;
export const PERIOD_DAYS = 7;

export const REPORT_DEFINITIONS = Object.freeze([
  { key: 'global', dimensions: [], rowLimit: 1 },
  { key: 'query', dimensions: ['query'], rowLimit: TOP_LIMIT },
  { key: 'page', dimensions: ['page'], rowLimit: TOP_LIMIT },
  { key: 'country', dimensions: ['country'], rowLimit: TOP_LIMIT },
  { key: 'device', dimensions: ['device'], rowLimit: TOP_LIMIT },
  { key: 'queryPage', dimensions: ['query', 'page'], rowLimit: TOP_LIMIT },
]);

const METRICS = ['clicks', 'impressions', 'ctr', 'position'];
const DAY_MS = 24 * 60 * 60 * 1000;

function atUtcMidnight(value) {
  return new Date(Date.UTC(
    value.getUTCFullYear(),
    value.getUTCMonth(),
    value.getUTCDate(),
  ));
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

export function calculatePeriods(now = new Date()) {
  const today = atUtcMidnight(now);
  const currentEnd = addUtcDays(today, -1);
  const currentStart = addUtcDays(currentEnd, -(PERIOD_DAYS - 1));
  const previousEnd = addUtcDays(currentStart, -1);
  const previousStart = addUtcDays(previousEnd, -(PERIOD_DAYS - 1));

  return {
    current: { start: formatDate(currentStart), end: formatDate(currentEnd) },
    previous: { start: formatDate(previousStart), end: formatDate(previousEnd) },
  };
}

export function calculatePercentDelta(current, previous) {
  if (previous === 0) return null;
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
  const difference = {};
  const percentDelta = {};

  for (const metric of METRICS) {
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

function compareRows(currentRows, previousRows, dimensions) {
  const previousByKey = new Map(previousRows.map((row) => [rowKey(row), row]));
  const sortedCurrent = [...currentRows].sort((a, b) => {
    const clickDifference = metricValue(b.clicks) - metricValue(a.clicks);
    if (clickDifference !== 0) return clickDifference;

    const impressionDifference = metricValue(b.impressions) - metricValue(a.impressions);
    if (impressionDifference !== 0) return impressionDifference;

    return compareText(rowKey(a), rowKey(b));
  });

  return sortedCurrent.slice(0, TOP_LIMIT).map((row) => {
    const keys = row.keys ?? [];
    const current = normalizeMetrics(row);
    const previous = normalizeMetrics(previousByKey.get(rowKey(row)));
    const comparison = compareMetrics(current, previous);
    const identity = Object.fromEntries(dimensions.map((dimension, index) => [dimension, keys[index] ?? '']));

    return {
      ...identity,
      ...current,
      prevClicks: previous.clicks,
      delta: legacyDelta(comparison.percentDelta.clicks),
      ...comparison,
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

function buildDataQuality(reportRuns) {
  const succeeded = reportRuns.filter((report) => report.succeeded);
  const emptyReports = succeeded
    .filter((report) => report.rows.length === 0)
    .map((report) => report.name);
  const truncatedReports = succeeded
    .filter((report) => report.dimensions.length > 0 && report.rows.length >= report.rowLimit)
    .map((report) => report.name);
  const warnings = reportRuns
    .filter((report) => report.warning)
    .map((report) => report.warning);

  if (truncatedReports.length > 0) {
    warnings.push(`Posible truncamiento al alcanzar el límite de ${TOP_LIMIT} filas: ${truncatedReports.join(', ')}.`);
  }

  return {
    periodDays: PERIOD_DAYS,
    reportsRequested: reportRuns.length,
    reportsSucceeded: succeeded.length,
    warnings,
    emptyReports,
    truncatedReports,
    topLimit: TOP_LIMIT,
  };
}

export function buildSeoSnapshot({ generatedAt, periods, reports, reportRuns }) {
  const currentGlobal = normalizeMetrics(reports.current.global?.[0]);
  const previousGlobal = normalizeMetrics(reports.previous.global?.[0]);
  const topQueries = compareRows(reports.current.query, reports.previous.query, ['query']);
  const topPages = normalizePageRows(compareRows(reports.current.page, reports.previous.page, ['page']));
  const countries = compareRows(reports.current.country, reports.previous.country, ['country']);
  const devices = compareRows(reports.current.device, reports.previous.device, ['device']);
  const queryPages = normalizePageRows(compareRows(
    reports.current.queryPage,
    reports.previous.queryPage,
    ['query', 'page'],
  ));

  return {
    schemaVersion: SCHEMA_VERSION,
    schemaDescription: 'v2: periodos 7/7, totales sin dimensiones, top 50 y comparativas por query, page, country, device y query+page.',
    updatedAt: generatedAt,
    periods,
    globalMetrics: compareMetrics(currentGlobal, previousGlobal),
    topQueries,
    topPages,
    countries,
    devices,
    queryPages,
    cannibalization: findCannibalization(queryPages),
    ctrOpportunities: findCtrOpportunities(topQueries),
    positionOpportunities: findPositionOpportunities(topQueries),
    dataQuality: buildDataQuality(reportRuns),
  };
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

function comparisonTable(rows, identityLabel, identityValue, linkPages = false) {
  if (rows.length === 0) return '*Sin filas para este periodo.*\n';

  let output = `| ${identityLabel} | Clics | Clics ant. | Δ clics | Crec. | Impresiones | CTR | Posición |\n`;
  output += '|---|---:|---:|---:|---:|---:|---:|---:|\n';

  for (const row of rows) {
    const rawIdentity = identityValue(row);
    const identity = linkPages
      ? `[${escapeCell(rawIdentity)}](https://bebergames.com${rawIdentity === '/' ? '/' : rawIdentity})`
      : escapeCell(rawIdentity);
    output += `| ${identity} | ${formatNumber(row.clicks)} | ${formatNumber(row.previous.clicks)} | ${formatNumber(row.difference.clicks)} | ${formatPercentDelta(row.percentDelta.clicks)} | ${formatNumber(row.impressions)} | ${formatPercent(row.ctr)} | ${formatNumber(row.position, 1)} |\n`;
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

export function renderSeoMarkdown(snapshot) {
  const { current, previous } = snapshot.periods;
  const global = snapshot.globalMetrics;
  const quality = snapshot.dataQuality;
  let md = '# Dashboard SEO de BeberGames\n\n';
  md += `> **Última actualización:** ${snapshot.updatedAt}\n`;
  md += `> **Periodo actual:** ${current.start} a ${current.end} (${quality.periodDays} días completos)\n`;
  md += `> **Periodo anterior:** ${previous.start} a ${previous.end} (${quality.periodDays} días completos)\n\n`;
  md += '*Generado automáticamente mediante GitHub Actions y la API de Google Search Console. No editar manualmente.*\n\n';

  md += '## Resumen global\n\n';
  md += 'Search Console mide **clics orgánicos**, no page views. Los totales de esta sección proceden de informes específicos **sin dimensiones**.\n\n';

  md += '## Comparativa actual vs anterior\n\n';
  md += '| Métrica | Actual | Anterior | Diferencia | Crecimiento |\n';
  md += '|---|---:|---:|---:|---:|\n';
  md += `| Clics orgánicos | ${formatNumber(global.current.clicks)} | ${formatNumber(global.previous.clicks)} | ${formatNumber(global.difference.clicks)} | ${formatPercentDelta(global.percentDelta.clicks)} |\n`;
  md += `| Impresiones | ${formatNumber(global.current.impressions)} | ${formatNumber(global.previous.impressions)} | ${formatNumber(global.difference.impressions)} | ${formatPercentDelta(global.percentDelta.impressions)} |\n`;
  md += `| CTR global | ${formatPercent(global.current.ctr)} | ${formatPercent(global.previous.ctr)} | ${formatPercent(global.difference.ctr)} | ${formatPercentDelta(global.percentDelta.ctr)} |\n`;
  md += `| Posición media global | ${formatNumber(global.current.position, 1)} | ${formatNumber(global.previous.position, 1)} | ${formatNumber(global.difference.position, 1)} | ${formatPercentDelta(global.percentDelta.position)} |\n`;
  md += '\nCuando el valor anterior es 0, el crecimiento se muestra como `N/D` y no se fuerza un porcentaje artificial.\n\n';

  md += `## Top ${quality.topLimit} queries\n\n`;
  md += comparisonTable(snapshot.topQueries, 'Query', (row) => row.query);
  md += `\n## Top ${quality.topLimit} pages\n\n`;
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

  md += '\n## Calidad de datos\n\n';
  md += `- Schema: versión ${snapshot.schemaVersion}. ${snapshot.schemaDescription}\n`;
  md += `- Días por periodo: ${quality.periodDays}.\n`;
  md += `- Informes solicitados: ${quality.reportsRequested}.\n`;
  md += `- Informes completados: ${quality.reportsSucceeded}.\n`;
  md += `- Límite por informe dimensional: ${quality.topLimit}.\n`;
  md += `- Informes vacíos: ${quality.emptyReports.length > 0 ? quality.emptyReports.join(', ') : 'ninguno'}.\n`;
  md += `- Informes posiblemente truncados: ${quality.truncatedReports.length > 0 ? quality.truncatedReports.join(', ') : 'ninguno'}.\n`;
  if (quality.warnings.length === 0) {
    md += '- Avisos: ninguno.\n';
  } else {
    md += '- Avisos:\n';
    for (const warning of quality.warnings) md += `  - ${escapeCell(warning)}\n`;
  }
  md += '\nLos informes por dimensión pueden omitir consultas anonimizadas o quedar limitados por filas. No deben sumarse siempre como si fueran los totales globales. Para el total del sitio, usa `globalMetrics`, que procede de informes sin dimensiones.\n';

  return md;
}
