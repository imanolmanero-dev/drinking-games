import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
require("tsx/cjs");

// Exercise the real component's event bindings and rendered states without a DOM.
// Browser QA separately verifies native controls, focus effects and layout.
function gameUI() {
  const state = [];
  let cursor = 0;
  const react = {
    ...require("react"),
    useEffect: () => {},
    useRef: () => ({ current: null }),
    useState(initial) {
      const index = cursor++;
      if (!(index in state)) state[index] = initial;
      return [state[index], (update) => { state[index] = typeof update === "function" ? update(state[index]) : update; }];
    },
  };
  const file = "components/games/truth-or-dare/TruthOrDareGame.tsx";
  const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }, fileName: file,
  });
  const loaded = { exports: {} };
  const load = (name) => name === "react" ? react : require(name.startsWith("@/") ? `../${name.slice(2)}` : name);
  new Function("require", "module", "exports", outputText)(load, loaded, loaded.exports);
  function nodes(node) {
    if (!node || typeof node !== "object") return [];
    return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)];
  }
  function render() { cursor = 0; return loaded.exports.default(); }
  function find(id) {
    const node = nodes(render()).find((item) => item.props?.id === id);
    assert.ok(node, id);
    return node;
  }
  function text(node) {
    if (node == null || typeof node === "boolean") return "";
    if (typeof node !== "object") return String(node);
    return [node.props?.children].flat(Infinity).map(text).join("");
  }
  return {
    find,
    text: () => text(render()),
    click(id) { const node = find(id); assert.notEqual(node.props.disabled, true, id); node.props.onClick(); },
    select(value) { find("tod-player-count").props.onChange({ target: { value: String(value) } }); },
    category(value) { find("tod-category").props.onChange({ target: { value } }); },
  };
}

test("player stepper and native select share state, one-step changes and real bounds", () => {
  const ui = gameUI();
  assert.equal(ui.find("tod-player-count").type, "select");
  assert.equal(ui.find("tod-player-count").props.value, 4);
  assert.equal(ui.find("tod-player-count").props["aria-describedby"], "tod-player-range");
  assert.equal(ui.find("tod-player-decrease").props["aria-label"], "Decrease player count");
  assert.equal(ui.find("tod-player-increase").props["aria-label"], "Increase player count");
  ui.click("tod-player-decrease");
  assert.equal(ui.find("tod-player-count").props.value, 3);
  ui.click("tod-player-increase");
  assert.equal(ui.find("tod-player-count").props.value, 4);
  ui.select(2);
  assert.equal(ui.find("tod-player-decrease").props.disabled, true);
  ui.find("tod-player-decrease").props.onClick();
  assert.equal(ui.find("tod-player-count").props.value, 2);
  ui.select(12);
  assert.equal(ui.find("tod-player-increase").props.disabled, true);
  ui.find("tod-player-increase").props.onClick();
  assert.equal(ui.find("tod-player-count").props.value, 12);
  ui.click("tod-player-decrease");
  assert.equal(ui.find("tod-player-count").props.value, 11);
  assert.equal(ui.find("tod-player-increase").props.disabled, false);
});

test("category setup is labelled, defaults to Classic and updates the active session", () => {
  const ui = gameUI();
  assert.equal(ui.find("tod-category").type, "select");
  assert.equal(ui.find("tod-category").props.value, "classic");
  assert.equal(ui.find("tod-category").props["aria-describedby"], "tod-category-help");
  for (const [category, size] of [["classic", 30], ["party", 50], ["both", 80]]) {
    ui.category(category);
    assert.ok(ui.text().includes(`${size * 2} prompts. Changing setup starts fresh pools.`));
    ui.select(12);
    ui.click("tod-start");
    assert.ok(ui.text().includes(`Prompts used: 0 / ${size * 2}`));
    assert.match(ui.text(), new RegExp(`Truth${size} left!Dare${size} left`));
    ui.click("tod-truth");
    ui.click("tod-skip");
    assert.match(ui.text(), /Player 2's turn/);
    ui.click("tod-dare");
    ui.click("tod-next");
    assert.match(ui.text(), /Player 3's turn/);
    ui.click("tod-finish");
    ui.click("tod-restart");
    assert.ok(ui.text().includes(`Prompts used: 0 / ${size * 2}`));
    assert.match(ui.text(), /Player 1's turn/);
    ui.click("tod-back-setup");
    assert.equal(ui.find("tod-category").props.value, category);
    assert.equal(ui.find("tod-player-count").props.value, 12);
    // The finished-state setup binding preserves the selection too.
    ui.click("tod-start");
    ui.click("tod-finish");
    ui.click("tod-change-players");
    assert.equal(ui.find("tod-category").props.value, category);
  }
});

for (const [category, count] of [["party", 50], ["both", 80]]) {
  test(`${category} controls use selected pool limits and show correct final/restart counts`, () => {
    const ui = gameUI();
    ui.category(category);
    ui.click("tod-start");
    for (let i = 0; i < count; i++) { ui.click("tod-truth"); ui.click("tod-next"); }
    assert.equal(ui.find("tod-truth").props.disabled, true);
    assert.equal(ui.find("tod-dare").props.disabled, false);
    for (let i = 0; i < count - 1; i++) { ui.click("tod-dare"); ui.click("tod-skip"); }
    ui.click("tod-dare");
    assert.ok(ui.text().includes("Finish gameSkip and finish"));
    ui.click("tod-next");
    assert.ok(ui.text().includes(`All ${count * 2} prompts were used.`));
    ui.click("tod-restart");
    assert.ok(ui.text().includes(`Prompts used: 0 / ${count * 2}`));
  });
}

test("choices keep labels, symbols and a disabled exhausted type in its place", () => {
  const ui = gameUI();
  ui.click("tod-start");
  assert.match(ui.text(), /\?Truth30 left!Dare30 left/);
  for (let i = 0; i < 30; i++) { ui.click("tod-truth"); ui.click("tod-next"); }
  assert.equal(ui.find("tod-truth").props.disabled, true);
  assert.equal(ui.find("tod-dare").props.disabled, false);
  assert.match(ui.text(), /\?Truth0 left!Dare30 left/);
  ui.click("tod-dare");
  assert.match(ui.text(), /! Dare for Player/);
});

test("finish uses prompt only for one, preserves plural and restart/setup behavior", () => {
  for (const count of [0, 1, 2]) {
    const ui = gameUI();
    ui.select(7);
    ui.click("tod-start");
    for (let i = 0; i < count; i++) { ui.click("tod-truth"); ui.click("tod-next"); }
    ui.click("tod-finish");
    assert.ok(ui.text().includes(`after ${count} ${count === 1 ? "prompt." : "prompts."}`));
    ui.click("tod-restart");
    assert.match(ui.text(), /Player 1's turn/);
    assert.match(ui.text(), /Prompts used: 0 \/ 60/);
    ui.click("tod-back-setup");
    assert.equal(ui.find("tod-player-count").props.value, 7);
  }
});
