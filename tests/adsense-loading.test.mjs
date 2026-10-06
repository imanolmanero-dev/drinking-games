import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import test from "node:test";
import ts from "typescript";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { rootFile, loadingReplacements } from "./helpers/adsense-loading.mjs";
import { es02Replacements } from "./helpers/es02-baseline.mjs";
import { es03Replacements, mergeEditorialReplacements } from "./helpers/es03-baseline.mjs";

// Exact authorized mature-weekly-window patch against 0fc57e3 (also identical against this
// test's historical base). Keep reporting files IN the source comparison.
// Pin the complete residual diff, including paths, blob IDs and every hunk;
// any extra source edit requires a separate review of this authorization.
const reviewedReportingDiffSha256 = "a75b16bcf27b8dd84c8f10583ade22cdc6c2bdf73d429632a8480a57ebe4daed";
function assertReviewedReportingDiff(diff) {
  assert.equal(createHash("sha256").update(diff).digest("hex"), reviewedReportingDiffSha256,
    "only the exact authorized SEO mature-window patch may differ outside approved editorial fragments");
}
function reviewedSourceDiff(base, paths, exclusions = []) {
  return execFileSync("git", ["-c", "core.abbrev=40", "diff", "--no-ext-diff", "--no-textconv",
    "--no-color", "--no-renames", "--diff-algorithm=myers", "--indent-heuristic",
    "--src-prefix=a/", "--dst-prefix=b/", "--unified=3",
    base, "--", ...paths, ...exclusions], { encoding: "utf8" });
}

// Preserve the existing exact-fragment baseline transformation, then allow
// only the pinned reporting diff in the remaining repository comparison.
function assertReviewedSource(base, paths, additionalExclusions = [], readCurrent = file => readFileSync(file, "utf8")) {
  const replacements = mergeEditorialReplacements(es02Replacements, es03Replacements);
  const files = Object.keys(replacements).filter(file => paths.some(path => file === path || file.startsWith(path + "/")));
  assertReviewedReportingDiff(reviewedSourceDiff(base, paths,
    [...additionalExclusions, ...files.map(file => ":(exclude,literal)" + file)]));
  for (const file of files) {
    let expected = execFileSync("git", ["show", base + ":" + file], { encoding: "utf8" }).replace(/\r\n/g, "\n");
    for (const [before, after] of replacements[file]) {
      assert.equal(expected.split(before).length - 1, 1, file + ": unique reviewed original fragment");
      expected = expected.replace(before, after);
    }
    assert.equal(readCurrent(file).replace(/\r\n/g, "\n"), expected, file + ": only exact reviewed fragments");
  }
}

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

function assertRootLoadingSource(source, base) {
  let expected = execFileSync("git", ["show", `${base}:${rootFile}`], {encoding:"utf8"}).replace(/\r\n/g,"\n");
  for(const [before,after] of loadingReplacements) {
    assert.equal(expected.split(before).length - 1, 1);
    expected = expected.replace(before,after);
  }
  assert.equal(source.replace(/\r\n/g,"\n"), expected);
}

test("Spanish root changes only the reviewed loading contract; other source matches the exact editorial baseline", () => {
  const base = "b6c0f36bc3ee9f1604c9093fb5fbf70a8b303f9d";
  assertRootLoadingSource(readFileSync(rootFile, "utf8"), base);
  assertReviewedSource(base, ["app", "components", "lib", "content", "public", "scripts"], [`:(exclude,literal)${rootFile}`]);
});

test("historical root guard rejects reverting to the native async AdSense loader", () => {
  const source = readFileSync(rootFile, "utf8").replace(/\r\n/g, "\n");
  const [unsafe, safe] = loadingReplacements[1];
  const mutated = source.replace(safe, unsafe);
  assert.notEqual(mutated, source);
  assertRootLoadingSource(source, "b6c0f36bc3ee9f1604c9093fb5fbf70a8b303f9d");
  assert.throws(() => assertRootLoadingSource(mutated, "b6c0f36bc3ee9f1604c9093fb5fbf70a8b303f9d"), { code: "ERR_ASSERTION" });
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

test("historical guard rejects an extra reporting edit beyond the reviewed coverage patch", () => {
  const diff = reviewedSourceDiff("0fc57e3a02ea5343313596fdc2412f5c283d484e",
    ["scripts/seo-reporting.mjs", "scripts/fetch-seo-data.ts"]);
  assertReviewedReportingDiff(diff);
  const source = readFileSync("scripts/fetch-seo-data.ts", "utf8").replace(/\r\n/g, "\n");
  const mutatedSource = source.replace("  safeApiFailure,", "  safeApiFailure, // unreviewed extra edit");
  assert.notEqual(mutatedSource, source);
  // Reconstruct this extra source edit's diff and blob ID entirely in memory.
  const blob = value => execFileSync("git", ["hash-object", "--stdin"], { input: value, encoding: "utf8" }).trim();
  const mutated = diff.replace("+  safeApiFailure,", "+  safeApiFailure, // unreviewed extra edit")
    .replace(blob(source), blob(mutatedSource));
  assert.notEqual(mutated, diff);
  assert.throws(() => assertReviewedReportingDiff(mutated), { code: "ERR_ASSERTION" });
});
