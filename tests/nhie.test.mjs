import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { withoutNhie } from "./helpers/nhie-baseline.mjs";
const require = createRequire(import.meta.url); require("tsx/cjs");
const { NHIE_PROMPTS: pool } = require("../lib/data/never-have-i-ever-prompts.ts");
const { startNhie, nhieReducer: reduce } = require("../lib/games/never-have-i-ever.ts");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const Game = require("../components/games/never-have-i-ever/NeverHaveIEverGame.tsx").default;
test("NHIE inventory is original-shaped, bounded and unique across categories", () => {
 assert.equal(pool.length,120);
 for(const category of ["classic","party"]) assert.equal(pool.filter(p=>p.category===category).length,60);
 assert.equal(new Set(pool.map(p=>p.id)).size,120);
 assert.equal(new Set(pool.map(p=>p.text.toLowerCase().replace(/[^a-z0-9]/g,""))).size,120);
 for(const p of pool) { assert.match(p.id,/^(classic|party)-\d{3}$/); assert.ok(p.id.startsWith(p.category)); assert.match(p.text,/^Never have I ever .+\.$/); assert.ok(p.text.split(/\s+/).length<=24,p.id); }
});
for(const category of ["classic","party"]) test(category+" filtering, shuffle, progress, skip and completion",()=>{
 let calls=0;let game=startNhie(category,()=>{calls++;return .4;});
 assert.equal(calls,59);assert.equal(game.deck.length,20);assert.ok(game.deck.every(p=>p.category===category));
 assert.deepEqual(game,startNhie(category,()=>.4));
 assert.equal(new Set(game.deck.map(p=>p.id)).size,20);
 for(let i=0;i<20;i++){
  assert.equal(game.index,i);
  const action={type:i%2?"skip":"next",expectedId:game.deck[i].id};
  const next=reduce(game,action);assert.equal(reduce(next,action),next);game=next;
 }
 assert.equal(game.phase,"finished");assert.equal(game.completed,true);assert.equal(game.index,19);
 assert.equal(reduce(game,{type:"end"}),game);
 const replay=startNhie(category,()=>.2);assert.equal(replay.index,0);assert.equal(replay.category,category);
});
test("early end, final skip, defensive pools and invalid category",()=>{
 for(const n of [1,7,20]){
 let game=startNhie("classic",()=>0,pool.filter(p=>p.category==="classic").slice(0,n));
 assert.equal(game.deck.length,n);
 const ended=reduce(game,{type:"end"});assert.equal(ended.index,0);assert.equal(ended.completed,false);
 assert.equal(reduce(ended,{type:"next",expectedId:game.deck[0].id}),ended);
 assert.equal(reduce(game,{type:"skip",expectedId:"stale"}),game);
 while(game.phase==="playing") game=reduce(game,{type:"skip",expectedId:game.deck[game.index].id});
 assert.equal(game.index,n-1);assert.equal(game.completed,true);
 }
 assert.throws(()=>startNhie("classic",()=>0,[]),RangeError);
 assert.throws(()=>startNhie("spicy"),RangeError);
});
test("setup has exactly two categories and static group guidance, without identities",()=>{
 const html=renderToStaticMarkup(createElement(Game));
 assert.match(html,/2–12 players/);assert.match(html,/value="classic" selected/);
 assert.match(html,/value="party"/);assert.doesNotMatch(html,/value="both"|value="spicy"|player-count|I HAVE/);
 assert.match(html,/Pass without explaining why/);
 const source=readFileSync("components/games/never-have-i-ever/NeverHaveIEverGame.tsx","utf8");
 assert.doesNotMatch(source,/localStorage|sessionStorage|fetch\(|AppContext|Analytics|PlayerCountField/);
});
test("NHIE exact patches preserve complete baseline sources and reject extra edits",()=>{
 const patches=JSON.parse(readFileSync("tests/fixtures/nhie-source.json","utf8"));
 for(const [file,patch] of Object.entries(patches)){
  const original=execFileSync("git",["show","8a48f70:"+file],{encoding:"utf8"}).replace(/\r\n/g,"\n");
  assert.equal(patch.before,original,file);
  assert.equal(withoutNhie(file,readFileSync(file,"utf8")),original,file);
  assert.throws(()=>withoutNhie(file,patch.after+"unreviewed"),{code:"ERR_ASSERTION"});
  assert.throws(()=>withoutNhie(file,patch.after.replace(/Never|export|import/,"Unreviewed")),{code:"ERR_ASSERTION"});
 }
});
