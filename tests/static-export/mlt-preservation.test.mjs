import { projectCriticalGames, restoreBombaCard } from "../helpers/critical-games-export.mjs";
import { projectRouletteExport } from "../helpers/roulette-export.mjs";
import { applyGuideChanges } from "../helpers/affected-guides.mjs";
import assert from 'node:assert/strict';
import { compareTruthOrDareExport } from '../helpers/truth-or-dare-export.mjs';
import test from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{parse}=require('next/dist/compiled/node-html-parser');
test('all 86 preflight pages preserve metadata, text, headings, links and JSON-LD', {skip:!existsSync('build/mlt/mlt-baseline/out/en.html')},()=>{
 const paths=['es-routes','es-additional-routes','en-routes'].flatMap(n=>JSON.parse(readFileSync(`tests/fixtures/${n}.json`))).map(r=>r.pathname).filter(p=>p!='/en/games/most-likely-to');
 assert.equal(paths.length,86);
 const snapshot=(root,p)=>{
  const d=parse(readFileSync(`${root}/${p==='/'?'index':p.slice(1)}.html`,'utf8'));
  if (root !== "out") applyGuideChanges(d, p);
    if (root === "out") restoreBombaCard(d, p);
  if(root==='out'&&p==='/en/games'){
   const added=d.querySelectorAll('.en-catalog-card').filter(c=>c.querySelector('#en-catalog-most-likely-to'));assert.equal(added.length,1);added[0].parentNode.remove();
  }
  const metadata=d.querySelectorAll('title,meta,link[rel="canonical"],link[hreflang]').map(n=>n.outerHTML);
  const headings=d.querySelectorAll('h1,h2,h3,h4').map(n=>n.textContent);
  const links=d.querySelectorAll('a').map(n=>[n.getAttribute('href'),n.textContent]);
  const schema=d.querySelectorAll('script[type="application/ld+json"]').map(n=>JSON.parse(n.textContent));
  d.querySelectorAll('script,style,link').forEach(n=>n.remove());
  return {metadata,headings,links,schema,text:d.textContent.replace(/\s+/g,' ').trim()};
 };
  for (const pathname of paths) {
    const current = snapshot("out", pathname);
    const previous = snapshot("build/mlt/mlt-baseline/out", pathname);
    projectCriticalGames(pathname, previous, current);
    projectRouletteExport(pathname, previous, current);
    compareTruthOrDareExport(pathname, current, previous);
  }
});
