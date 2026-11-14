import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { withoutMostLikely } from "./helpers/mlt-baseline.mjs";
const require = createRequire(import.meta.url); require("tsx/cjs");
const { MOST_LIKELY_PROMPTS: pool } = require("../lib/data/most-likely-to-prompts.ts");
const { startMostLikely: start, mostLikelyReducer: reduce } = require("../lib/games/most-likely-to.ts");
test("60 reviewed prompts have stable IDs, unique text and bounded natural questions", () => {
 assert.equal(pool.length,60); assert.equal(new Set(pool.map(p=>p.id)).size,60);
 assert.equal(new Set(pool.map(p=>p.text.toLowerCase().replace(/[^a-z0-9]/g,''))).size,60);
 for(const p of pool){assert.match(p.id,/^mlt-\d{3}$/);assert.match(p.text,/^Who .+\?$/);assert.ok(p.text.length>=35&&p.text.length<=110,p.id);assert.doesNotMatch(p.text,/Dani|lorem|placeholder|TODO|chug|drunk|addict|suicide|nude|bankrupt|cheat on|illegal/i);}
});
test("bounded session, deterministic shuffle, pure next/skip and exact completion",()=>{
 let g=start(1,()=>.4); assert.equal(g.deck.length,20);assert.equal(new Set(g.deck.map(p=>p.id)).size,20);assert.deepEqual(g,start(1,()=>.4));
 for(let i=0;i<20;i++){
  assert.equal(g.index,i);assert.ok(g.deck[g.index]);const a={type:i%2?'skip':'next',expectedSession:1,expectedIndex:i};
  const next=reduce(g,a);assert.equal(reduce(next,a),next);assert.equal(g.index,i);g=next;
 }
 assert.equal(g.phase,'completed');assert.equal(g.completed,true);assert.equal(g.index,19);
 assert.equal(reduce(g,{type:'end',expectedSession:1,expectedIndex:19}),g);
});
test("early end, replay and stale events across sessions",()=>{
 const g=start(1,()=>.4),end=reduce(g,{type:'end',expectedSession:1,expectedIndex:0});assert.equal(end.phase,'completed');assert.equal(end.completed,false);
 assert.equal(reduce(end,{type:'next',expectedSession:1,expectedIndex:0}),end);
 const replay=start(2,()=>.2);assert.equal(replay.index,0);assert.equal(replay.completed,false);assert.notDeepEqual(replay.deck,g.deck);
 for(const type of ['next','skip','end'])assert.equal(reduce(replay,{type,expectedSession:1,expectedIndex:0}),replay);
 assert.throws(()=>start(1,()=>0,pool.slice(0,19)),RangeError);assert.throws(()=>start(1,()=>0,[...pool,pool[0]]),RangeError);
});
test("only exact new-route and catalog presentation patches are authorized",()=>{
 const patches=JSON.parse(readFileSync('tests/fixtures/mlt-source.json','utf8'));
 for(const [p,patch] of Object.entries(patches)){
  assert.equal(patch.before,execFileSync('git',['show','bb65d73:'+p],{encoding:'utf8'}).replace(/\r\n/g,'\n'));
  assert.equal(withoutMostLikely(p,readFileSync(p,'utf8')),patch.before);
  assert.throws(()=>withoutMostLikely(p,patch.after+'extra'));
  assert.throws(()=>withoutMostLikely(p,'!'+patch.after.slice(1)));
 }
});
