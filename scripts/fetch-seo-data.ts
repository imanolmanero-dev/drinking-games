import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SITE_URL = 'https://bebergames.com/';
const OUTPUT_FILE = path.join(process.cwd(), 'SEO_DATA.md');

async function fetchSeoData() {
  console.log('Iniciando extracción de datos de Google Search Console...');

  try {
    // 1. Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GCP_CREDENTIALS || '{}'),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Calculate date range (last 7 days)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3); // GSC data is usually delayed by 2-3 days
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const formatDt = (d: Date) => d.toISOString().split('T')[0];
    
    console.log(`Pidiendo datos desde ${formatDt(startDate)} hasta ${formatDt(endDate)}`);

    // 2. Fetch Top Queries
    const queriesResponse = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDt(startDate),
        endDate: formatDt(endDate),
        dimensions: ['query'],
        rowLimit: 15,
        orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }]
      },
    });

    // 3. Fetch Top Pages
    const pagesResponse = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDt(startDate),
        endDate: formatDt(endDate),
        dimensions: ['page'],
        rowLimit: 15,
        orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }]
      },
    });

    // 4. Generate the Markdown Content
    const dateUpdated = new Date().toLocaleString('es-ES');
    let markdown = `# Dashboard de SEO y Search Console\n\n`;
    markdown += `> **Última actualización:** ${dateUpdated}\n`;
    markdown += `> **Periodo de datos:** Últimos 7 días analizados.\n\n`;
    markdown += `*Este archivo se genera automáticamente mediante GitHub Actions y la API de Google Search Console. **NO EDITAR MANUALMENTE**.*\n\n`;

    markdown += `## 🏆 Top Palabras Clave (Queries)\n\n`;
    markdown += `| Query | Clics | Impresiones | CTR | Posición Media |\n`;
    markdown += `|---|---|---|---|---|\n`;
    
    const queries = queriesResponse.data?.rows || [];
    queries.forEach(row => {
      const q = row.keys?.[0] || 'Unknown';
      const ctr = row.ctr ? (row.ctr * 100).toFixed(2) + '%' : '0%';
      const pos = row.position ? row.position.toFixed(1) : '0';
      markdown += `| ${q} | ${row.clicks} | ${row.impressions} | ${ctr} | ${pos} |\n`;
    });

    markdown += `\n## 📄 Top Páginas\n\n`;
    markdown += `| URL | Clics | Impresiones | CTR | Posición Media |\n`;
    markdown += `|---|---|---|---|---|\n`;

    const pages = pagesResponse.data?.rows || [];
    pages.forEach(row => {
      let p = row.keys?.[0] || 'Unknown';
      p = p.replace(SITE_URL, '/'); // Make it relative
      const ctr = row.ctr ? (row.ctr * 100).toFixed(2) + '%' : '0%';
      const pos = row.position ? row.position.toFixed(1) : '0';
      markdown += `| [${p}](${row.keys?.[0]}) | ${row.clicks} | ${row.impressions} | ${ctr} | ${pos} |\n`;
    });

    markdown += `\n---\n`;
    markdown += `## 🤖 Guía para Agentes IA\n`;
    markdown += `1. **Oportunidades de CTR:** Busca queries con altas impresiones pero bajo CTR (<3%). Considera optimizar el *title* o *description* en \`layout.tsx\` o \`page.tsx\`.\n`;
    markdown += `2. **Nuevos Contenidos:** Si ves queries para juegos que no tenemos, crea la página correspondiente.\n`;
    markdown += `3. **Thin Content:** Si el tráfico de una página clave está cayendo, revisa que no haya sido penalizada por Google y expande su contenido siguiendo las normas de \`AGENTS.md\`.\n`;

    // 5. Save to File
    fs.writeFileSync(OUTPUT_FILE, markdown, 'utf8');
    console.log(`✅ ¡Datos extraídos con éxito! Archivo guardado en: ${OUTPUT_FILE}`);

  } catch (error: any) {
    console.error('❌ Error al extraer datos de Google Search Console:', error.message);
    if (error.response?.data) {
      console.error(error.response.data);
    }
    process.exit(1);
  }
}

fetchSeoData();
