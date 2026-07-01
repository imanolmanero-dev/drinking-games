import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SITE_URL = 'https://bebergames.com/';
const OUTPUT_MD = path.join(process.cwd(), 'SEO_DATA.md');
const OUTPUT_JSON = path.join(process.cwd(), 'seo-data.json');

const formatDt = (d: Date) => d.toISOString().split('T')[0];

function calculateDelta(current: number, previous: number) {
  if (!previous || previous === 0) return '+100%';
  const delta = ((current - previous) / previous) * 100;
  return delta > 0 ? `+${delta.toFixed(1)}% 🟢` : `${delta.toFixed(1)}% 🔴`;
}

async function fetchSeoData() {
  console.log('Iniciando extracción PRO de datos SEO...');

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GCP_CREDENTIALS || '{}'),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Current period (last 7 days, 3 days offset)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3);
    const msPerDay = 24 * 60 * 60 * 1000;
    const startMs = endDate.getTime() - (7 * msPerDay);
    const startDateObj = new Date(startMs);

    // Previous period
    const prevEndDateObj = new Date(startMs - (1 * msPerDay));
    const prevStartDateObj = new Date(prevEndDateObj.getTime() - (7 * msPerDay));

    console.log(`Actual: ${formatDt(startDateObj)} a ${formatDt(endDate)}`);
    console.log(`Previo: ${formatDt(prevStartDateObj)} a ${formatDt(prevEndDateObj)}`);

    const queryReq = (s: Date, e: Date, dims: string[]) => searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDt(s),
        endDate: formatDt(e),
        dimensions: dims,
        rowLimit: 50,
      }
    } as any);

    const [curQ, prevQ, curP, prevP, curQP] = await Promise.all([
      queryReq(startDateObj, endDate, ['query']),
      queryReq(prevStartDateObj, prevEndDateObj, ['query']),
      queryReq(startDateObj, endDate, ['page']),
      queryReq(prevStartDateObj, prevEndDateObj, ['page']),
      queryReq(startDateObj, endDate, ['query', 'page'])
    ]);

    const cQueries = (curQ as any).data?.rows || [];
    const pQueries = (prevQ as any).data?.rows || [];
    const cPages = (curP as any).data?.rows || [];
    const pPages = (prevP as any).data?.rows || [];
    const qpRows = (curQP as any).data?.rows || [];

    // Map previous data for quick lookup
    const pQMap = new Map(pQueries.map((r: any) => [r.keys[0], r]));
    const pPMap = new Map(pPages.map((r: any) => [r.keys[0], r]));

    // JSON Structure
    const jsonData = {
      updatedAt: new Date().toISOString(),
      periods: {
        current: { start: formatDt(startDateObj), end: formatDt(endDate) },
        previous: { start: formatDt(prevStartDateObj), end: formatDt(prevEndDateObj) }
      },
      topQueries: [],
      topPages: [],
      cannibalization: [],
      ctrOpportunities: []
    };

    let md = `# 📈 Dashboard SEO Avanzado (Pro Mode)\n\n`;
    md += `> **Última actualización:** ${new Date().toLocaleString('es-ES')}\n`;
    md += `> **Comparativa:** Últimos 7 días vs Semana anterior.\n\n`;
    md += `*Este archivo se genera automáticamente mediante GitHub Actions y la API de Google Search Console. **NO EDITAR MANUALMENTE**.*\n\n`;

    // 1. TOP QUERIES
    md += `## 🏆 Top Palabras Clave (Tendencias)\n`;
    md += `| Query | Clics | Impresiones | CTR | Pos | Crecimiento (Clics) |\n`;
    md += `|---|---|---|---|---|---|\n`;

    cQueries.slice(0, 15).forEach((row: any) => {
      const q = row.keys[0];
      const prevRow = pQMap.get(q) as any;
      const delta = calculateDelta(row.clicks, prevRow ? prevRow.clicks : 0);
      const ctr = (row.ctr * 100).toFixed(1) + '%';
      const pos = row.position.toFixed(1);
      
      md += `| ${q} | ${row.clicks} | ${row.impressions} | ${ctr} | ${pos} | ${delta} |\n`;
      
      (jsonData.topQueries as any).push({ query: q, clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position, prevClicks: prevRow?.clicks || 0 });

      // CTR Oportunity detection
      if (row.position <= 10 && row.ctr < 0.03 && row.impressions > 50) {
        (jsonData.ctrOpportunities as any).push({ query: q, ctr: ctr, pos: pos, imp: row.impressions });
      }
    });

    // 2. TOP PAGES
    md += `\n## 📄 Top Páginas (Tráfico)\n`;
    md += `| URL | Clics | Impresiones | CTR | Pos | Crecimiento (Clics) |\n`;
    md += `|---|---|---|---|---|---|\n`;

    cPages.slice(0, 15).forEach((row: any) => {
      const p = row.keys[0];
      const rel = p.replace(SITE_URL, '/');
      const prevRow = pPMap.get(p) as any;
      const delta = calculateDelta(row.clicks, prevRow ? prevRow.clicks : 0);
      const ctr = (row.ctr * 100).toFixed(1) + '%';
      const pos = row.position.toFixed(1);
      
      md += `| [${rel}](${p}) | ${row.clicks} | ${row.impressions} | ${ctr} | ${pos} | ${delta} |\n`;
      (jsonData.topPages as any).push({ url: rel, clicks: row.clicks, impressions: row.impressions, delta });
    });

    // 3. CANNIBALIZATION DETECTION
    md += `\n## 🚨 Alertas de Canibalización\n`;
    const queryUrls = new Map<string, Array<{url: string, imp: number}>>();
    qpRows.forEach((r: any) => {
      const q = r.keys[0];
      const u = r.keys[1].replace(SITE_URL, '/');
      if (r.impressions > 10) { // filter noise
        if (!queryUrls.has(q)) queryUrls.set(q, []);
        queryUrls.get(q)!.push({ url: u, imp: r.impressions });
      }
    });

    let cannibalizationFound = false;
    queryUrls.forEach((urls, q) => {
      if (urls.length > 1) {
        // Only flag if top 2 urls have similar impressions (competing)
        urls.sort((a, b) => b.imp - a.imp);
        const ratio = urls[1].imp / urls[0].imp;
        if (ratio > 0.3) {
          cannibalizationFound = true;
          md += `- **Query:** \`${q}\`\n  - 🥇 ${urls[0].url} (${urls[0].imp} imp)\n  - 🥈 ${urls[1].url} (${urls[1].imp} imp)\n`;
          (jsonData.cannibalization as any).push({ query: q, urls });
        }
      }
    });
    if (!cannibalizationFound) md += `*✅ No se detectan conflictos graves de canibalización en el top 50.*\n`;

    // 4. CTR OPPORTUNITIES
    md += `\n## 💡 Oportunidades de CTR Rápido (Low-Hanging Fruit)\n`;
    if (jsonData.ctrOpportunities.length > 0) {
      md += `*Estás en primera página, pero la gente no hace clic. Mejora el Meta Title/Description de estas keywords:*\n`;
      jsonData.ctrOpportunities.forEach((op: any) => {
        md += `- **${op.query}** (Posición ${op.pos}): Sólo un ${op.ctr} de CTR (${op.imp} imp)\n`;
      });
    } else {
      md += `*✅ No hay oportunidades críticas urgentes de CTR.*\n`;
    }
    
    md += `\n---\n`;
    md += `## 🤖 Guía para Agentes IA\n`;
    md += `1. **Análisis Semanal:** Si ves caídas del -30% o más en Clics (🔴) en el Top Páginas, audita la página afectada inmediatamente por si Google la ha penalizado por *Thin Content*.\n`;
    md += `2. **Canibalización:** Si hay alertas, añade etiquetas \`canonical\` o un banner interno en la página perdedora (🥈) apuntando a la ganadora (🥇).\n`;
    md += `3. **Contexto Oculto:** Recuerda que tienes el archivo \`seo-data.json\` con todos los datos en crudo para poder programar scripts de análisis profundo si lo necesitas.\n`;

    fs.writeFileSync(OUTPUT_MD, md, 'utf8');
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonData, null, 2), 'utf8');
    
    console.log(`✅ ¡Pro SEO Extractor finalizado con éxito!`);
  } catch (error: any) {
    console.error('❌ Error al extraer datos:', error.message);
    if (error.response?.data) {
      console.error(error.response.data);
    }
    process.exit(1);
  }
}

fetchSeoData();
