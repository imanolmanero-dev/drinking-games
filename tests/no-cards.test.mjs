import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { withoutNoCards } from './helpers/no-cards-baseline.mjs';
const require = createRequire(import.meta.url); require('tsx/cjs');
const { withoutCardsGames: games, withoutCardsEditorial: editorial } = require('../lib/data/drinking-games-without-cards.ts');
const { publishedRoutes, languageAlternates } = require('../lib/i18n/routes.ts');
const read = f => readFileSync(f,'utf8').replace(/\r\n/g,'\n');
test('no-cards adds one unpaired editorial route and eight complete manual games', () => {
 assert.equal(publishedRoutes('en-US').length,15);
 assert.equal(publishedRoutes('en-US','game').length,3);
 assert.equal(languageAlternates('drinking-games-without-cards'),undefined);
 assert.deepEqual(games.map(g=>g.name),['Never Have I Ever','Truth or Dare','Most Likely To','Two Truths and a Lie','Categories','Rhyme Round','Memory Chain','Medusa']);
 for(const game of games) for(const key of ['players','materials','setup','play','ending','sip']) assert.ok(game[key].length,game.id+key);
 assert.match(games[1].sip,/Declining a question or dare never triggers drinking/);
 assert.match(games[2].sip,/Vote counts never become quantities/);
 assert.match(games[6].play,/one group reminder/);
 assert.match(games[7].play,/looking at each other/);
 assert.equal(editorial.datePublished,'2026-10-29');
 for(const file of ['app/(english)/en/blog/drinking-games-without-cards/page.tsx','lib/data/drinking-games-without-cards.ts']) assert.doesNotMatch(read(file),/use client|useEffect|localStorage|fetch\(|AppContext|lib\/blog|new Date\(/);
});
test('exact phase source patches preserve baseline and reject extra edits',()=>{
 const patches=JSON.parse(read('tests/fixtures/no-cards-source.json'));
 for(const file of Object.keys(patches)) {
  const baseline=execFileSync('git',['show','8199eec:'+file],{encoding:'utf8'}).replace(/\r\n/g,'\n');
  assert.equal(withoutNoCards(file,read(file)),baseline,file);
  assert.throws(()=>withoutNoCards(file,read(file)+'unapproved'),{code:'ERR_ASSERTION'});
 }
});
