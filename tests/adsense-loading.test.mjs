import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import test from "node:test";
import ts from "typescript";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { rootFile, loadingReplacements } from "./helpers/adsense-loading.mjs";
import { assertEs02Compatible } from "./helpers/es02-baseline.mjs";
const require = createRequire(import.meta.url);

test("installed Next loader cannot execute before mount, load and idle, and deduplicates remounts", () => {
  const effects = [], idle = [], load = [], appended = [];
  const document = {readyState:"loading", createElement:() => ({setAttribute(){},addEventListener(){}}),body:{appendChild:el=>appended.push(el)}};
  const loaded = {exports:{}};
  const filename = require.resolve("next/dist/client/script.js");
  const localRequire = createRequire(filename);
  const mockRequire = name => {
    if(name === "react") return {...require("react"),useContext:()=>({appDir:true}),useEffect:fn=>effects.push(fn),useRef:()=>({current:false})};
    if(name === "./request-idle-callback") return {requestIdleCallback:fn=>idle.push(fn)};
    return localRequire(name);
  };
  runInNewContext(readFileSync(filename,"utf8"),{require:mockRequire,module:loaded,exports:loaded.exports,document,window:{addEventListener:(event,fn)=>{assert.equal(event,"load");load.push(fn);}}});
  const props = {id:"spanish-adsense",strategy:"lazyOnload",src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2015657577739632",crossOrigin:"anonymous"};
  assert.equal(loaded.exports.default(props),null);
  assert.equal(appended.length,0);
  effects.forEach(fn=>fn()); effects.forEach(fn=>fn());
  assert.equal(load.length,1);
  assert.equal(appended.length,0);
  document.readyState = "complete";
  load[0]();
  assert.equal(appended.length,0);
  idle.shift()();
  assert.equal(appended.length,1);
  assert.equal(appended[0].src,props.src);
  effects.length = 0;
  loaded.exports.default(props); effects.forEach(fn=>fn());
  idle.shift()();
  assert.equal(appended.length,1,"same source is not appended twice while loading");
});

test("Spanish root changes only the reviewed loading contract; other source matches the exact editorial baseline", () => {
  const base = "b6c0f36bc3ee9f1604c9093fb5fbf70a8b303f9d";
  let expected = execFileSync("git", ["show", `${base}:${rootFile}`], {encoding:"utf8"}).replace(/\r\n/g,"\n");
  for(const [before,after] of loadingReplacements) {
    assert.equal(expected.split(before).length - 1, 1);
    expected = expected.replace(before,after);
  }
  assert.equal(readFileSync(rootFile,"utf8").replace(/\r\n/g,"\n"), expected);
  assertEs02Compatible(base, ["app", "components", "lib", "content", "public", "scripts"], [`:(exclude,literal)${rootFile}`]);
});

test("manual slot queues once before a delayed external loader, including Strict Mode effect replay", () => {
  const source = readFileSync("app/(spanish)/juegos/verdad-o-reto/VerdadRetoExperimentAd.tsx","utf8");
  const effects = [];
  const loaded = {exports:{}};
  const code = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  const mockRequire = name => name === "react" ? {useRef:()=>({current:false}),useEffect:fn=>effects.push(fn)} : require(name);
  const window = {};
  new Function("require","module","exports","window",code)(mockRequire, loaded, loaded.exports, window);
  loaded.exports.default();
  effects[0](); effects[0]();
  assert.deepEqual(window.adsbygoogle,[{}]);
  // The delayed external script drains the queue and accepts subsequent mounts.
  const consumed = [...window.adsbygoogle];
  window.adsbygoogle = {push: entry => consumed.push(entry)};
  loaded.exports.default(); effects[1](); effects[1]();
  assert.deepEqual(consumed,[{},{}]);
});
