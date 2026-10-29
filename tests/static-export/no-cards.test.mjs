import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);require('tsx/cjs');
const {parse}=require('next/dist/compiled/node-html-parser');
const {withoutCardsEditorial:e,withoutCardsGames:games,withoutCardsFaqs:faqs}=require('../../lib/data/drinking-games-without-cards.ts');
const route='/en/blog/drinking-games-without-cards';
const doc=parse(readFileSync('out'+route+'.html','utf8'));
test('no-cards export has exact metadata, complete rules, native fragments and shared visible schemas',()=>{
 assert.equal(doc.querySelector('html').getAttribute('lang'),'en-US');
 assert.equal(doc.querySelectorAll('h1').length,1);assert.equal(doc.querySelector('h1').textContent,e.headline);
 assert.equal(doc.querySelector('title').textContent,e.title+' | BeberGames');
 assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute('href'),'https://bebergames.com'+route);
 assert.equal(doc.querySelector('meta[name="description"]').getAttribute('content'),e.description);
 assert.deepEqual(doc.querySelectorAll('[data-guide-game]').map(n=>n.getAttribute('data-guide-game')),games.map(g=>g.id));
 for(const [i,n] of doc.querySelectorAll('[data-guide-game]').entries())for(const key of ['setup','play','ending','sip'])assert.ok(n.textContent.includes(games[i][key]));
 const ids=doc.querySelectorAll('[id]').map(n=>n.id);assert.equal(new Set(ids).size,ids.length);
 for(const a of doc.querySelectorAll('a[href^="#"]'))assert.ok(doc.getElementById(a.getAttribute('href').slice(1)));
 const schemas=doc.querySelectorAll('script[type="application/ld+json"]').map(n=>JSON.parse(n.textContent));
 assert.deepEqual(schemas.map(s=>s['@type']).sort(),['BlogPosting','BreadcrumbList','FAQPage']);
 const article=schemas.find(s=>s['@type']==='BlogPosting');assert.equal(article.datePublished,doc.querySelector('time').textContent);assert.equal(article.dateModified,undefined);assert.equal(article.headline,e.headline);
 assert.deepEqual(schemas.find(s=>s['@type']==='FAQPage').mainEntity.map(n=>[n.name,n.acceptedAnswer.text]),doc.querySelectorAll('[data-guide-faq]').map(n=>[n.querySelector('h3').textContent,n.querySelector('p').textContent]));
 assert.equal(doc.querySelectorAll('[data-guide-faq]').length,faqs.length);
 for(const path of ['/en/games/truth-or-dare','/en/blog/drinking-games-for-2','/en/games','/en/about#responsible-play'])assert.ok(doc.querySelector(`a[href="${path}"]`));
 for(const a of doc.querySelectorAll('a[href^="/en"]'))assert.ok(existsSync('out'+a.getAttribute('href').split('#')[0]+'.html'));
 for(const path of ['/en/guides','/en/blog','/en/games/never-have-i-ever','/en/games/higher-or-lower'])assert.equal(existsSync('out'+path+'.html'),false);
 const scripts=d=>d.querySelectorAll('script[src]').map(n=>n.getAttribute('src')).sort();assert.deepEqual(scripts(doc),scripts(parse(readFileSync('out/en/about.html','utf8'))));
 assert.equal(doc.querySelectorAll('button,input,iframe,canvas,link[rel="manifest"],ins.adsbygoogle').length,0);
});
test('one contextual discovery link per authorized page, outside navigation and catalog',()=>{
 for(const path of ['/en','/en/games','/en/blog/drinking-games-for-2']){
  const d=parse(readFileSync('out'+path+'.html','utf8'));
  assert.equal(d.querySelectorAll(`a[href="${route}"]`).length,1);
  assert.ok(d.querySelector(`[data-no-cards-discovery] a[href="${route}"]`));
  assert.equal(d.querySelectorAll(`nav a[href="${route}"], .en-catalog a[href="${route}"]`).length,0);
 }
});
