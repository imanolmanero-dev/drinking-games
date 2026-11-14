import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
require("tsx/cjs");
for (const [folder, component, prefix, end, replay, setup] of [
  ["kings-cup", "KingsCupGame", "kc", "kc-end", "kc-play-again", "kc-change-players"],
  ["truth-or-dare", "TruthOrDareGame", "tod", "tod-finish", "tod-restart", "tod-change-players"],
  ["never-have-i-ever", "NeverHaveIEverGame", "nhie", "nhie-end", "nhie-replay", "nhie-setup"],
]) {
  test(`${component}: catalog link is secondary and finished-only; replay and setup survive`, () => {
    const state = [];
    let cursor = 0;
    const react = { ...require("react"), useEffect() {}, useRef: () => ({ current: null }),
      useState(initial) {
        const i = cursor++;
        if (!(i in state)) state[i] = initial;
        return [state[i], update => { state[i] = typeof update === "function" ? update(state[i]) : update; }];
      } };
    const file = `components/games/${folder}/${component}.tsx`;
    const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }, fileName: file,
    });
    const loaded = { exports: {} };
    const load = name => name === "react" ? react : name === "framer-motion" ? { useReducedMotion: () => true, motion: { div: "div" } } : require(name.startsWith("@/") ? `../${name.slice(2)}` : name.startsWith("./") ? `../components/games/${folder}/${name.slice(2)}` : name);
    new Function("require", "module", "exports", outputText)(load, loaded, loaded.exports);
    function nodes(node) {
      if (!node || typeof node !== "object") return [];
      if (typeof node.type === "function") return nodes(node.type(node.props));
      return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)];
    }
    const render = () => { cursor = 0; return nodes(loaded.exports.default()); };
    const find = id => render().find(n => n.props?.id === id);
    const click = id => { const n = find(id); assert.ok(n, id); n.props.onClick(); };
    const linkId = `${prefix}-choose-game`;
    assert.equal(find(linkId), undefined);
    click(`${prefix}-start`);
    assert.equal(find(linkId), undefined);
    click(end);
    const link = find(linkId);
    assert.equal(link.type, "a");
    assert.equal(link.props.href, "/en/games");
    assert.equal(link.props.children, "Choose another game");
    assert.equal(link.props.className, "en-button");
    assert.equal(link.props.onClick, undefined);
    assert.match(find(replay).props.className, /en-button-primary/);
    assert.ok(find(setup));
    click(replay);
    assert.equal(find(linkId), undefined);
    click(end);
    click(setup);
    assert.equal(find(linkId), undefined);
    assert.ok(find(`${prefix}-start`));
  });
}
