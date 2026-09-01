import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  FIRST_SEGMENT_START_ANGLE,
  POINTER_ANGLE,
  ROULETTE_SEGMENT_ANGLE,
  ROULETTE_SEGMENT_COUNT,
  createSpinLifecycle,
  getSegmentCenter,
  getTargetRotation,
  normalizeRotation,
} from "../app/juegos/la-ruleta/spin-geometry.ts";

const EPSILON = 1e-9;
const EXPECTED_FINAL_ROTATIONS = [
  348.75, 326.25, 303.75, 281.25,
  258.75, 236.25, 213.75, 191.25,
  168.75, 146.25, 123.75, 101.25,
  78.75, 56.25, 33.75, 11.25,
];

function assertClose(actual, expected, message) {
  assert.ok(
    Math.abs(actual - expected) < EPSILON,
    `${message}: expected ${expected}, received ${actual}`,
  );
}

test("all 16 segment centers finish under the real top pointer", () => {
  assert.equal(ROULETTE_SEGMENT_COUNT, 16);
  assert.equal(ROULETTE_SEGMENT_ANGLE, 22.5);
  assert.equal(FIRST_SEGMENT_START_ANGLE, -90);
  assert.equal(POINTER_ANGLE, -90);

  for (let index = 0; index < ROULETTE_SEGMENT_COUNT; index += 1) {
    const target = getTargetRotation(0, index, 4);
    const finalRotation = normalizeRotation(target);
    const alignedCenter = normalizeRotation(getSegmentCenter(index) + target);
    const pointerInsideSegment = normalizeRotation(
      POINTER_ANGLE - target - FIRST_SEGMENT_START_ANGLE,
    ) % ROULETTE_SEGMENT_ANGLE;

    assertClose(
      finalRotation,
      EXPECTED_FINAL_ROTATIONS[index],
      `normalized rotation for index ${index}`,
    );
    assertClose(
      alignedCenter,
      normalizeRotation(POINTER_ANGLE),
      `pointer alignment for index ${index}`,
    );
    assertClose(
      pointerInsideSegment,
      ROULETTE_SEGMENT_ANGLE / 2,
      `pointer must land at the center, not a boundary, for index ${index}`,
    );
  }
});

test("target geometry is independent of previous rotation and extra turns", () => {
  const previousRotations = [-1080, -11.25, 0, 11.25, 123.5, 348.75, 720.25];

  for (const previousRotation of previousRotations) {
    for (const extraRotations of [0, 3, 4, 5]) {
      for (let index = 0; index < ROULETTE_SEGMENT_COUNT; index += 1) {
        const target = getTargetRotation(previousRotation, index, extraRotations);
        const clockwiseTravel = target - previousRotation;

        assert.ok(clockwiseTravel >= extraRotations * 360 - EPSILON);
        assert.ok(clockwiseTravel < (extraRotations + 1) * 360 + EPSILON);
        assertClose(
          normalizeRotation(target),
          EXPECTED_FINAL_ROTATIONS[index],
          `previous ${previousRotation}, turns ${extraRotations}, index ${index}`,
        );
      }
    }
  }
});

test("100 consecutive spins remain aligned after normalizing completed state", () => {
  let restingRotation = 0;

  for (let spin = 0; spin < 100; spin += 1) {
    const index = (spin * 7) % ROULETTE_SEGMENT_COUNT;
    const extraRotations = 3 + (spin % 3);
    const target = getTargetRotation(restingRotation, index, extraRotations);

    assertClose(
      normalizeRotation(target),
      EXPECTED_FINAL_ROTATIONS[index],
      `consecutive spin ${spin + 1}`,
    );
    assert.ok(target >= extraRotations * 360);
    assert.ok(target < (extraRotations + 2) * 360);

    restingRotation = normalizeRotation(target);
    assert.ok(restingRotation >= 0 && restingRotation < 360);
  }
});

test("rotation normalization handles zero, full turns, and negatives", () => {
  assert.equal(normalizeRotation(0), 0);
  assert.equal(normalizeRotation(360), 0);
  assert.equal(normalizeRotation(720), 0);
  assert.equal(normalizeRotation(-360), 0);
  assert.equal(normalizeRotation(-11.25), 348.75);
  assert.equal(normalizeRotation(371.25), 11.25);
});

test("a spin lifecycle completes exactly once and rejects a second spin", () => {
  const lifecycle = createSpinLifecycle();
  const spinId = lifecycle.begin();

  assert.equal(typeof spinId, "number");
  assert.equal(lifecycle.begin(), null);
  assert.equal(lifecycle.complete(spinId + 1), false);
  assert.equal(lifecycle.complete(spinId), true);
  assert.equal(lifecycle.complete(spinId), false);
});

test("reset or unmount cancellation invalidates pending completion", () => {
  const lifecycle = createSpinLifecycle();
  const cancelledId = lifecycle.begin();

  lifecycle.cancel();
  assert.equal(lifecycle.complete(cancelledId), false);

  const nextId = lifecycle.begin();
  assert.notEqual(nextId, cancelledId);
  assert.equal(lifecycle.complete(nextId), true);
});

test("the component uses one duration and the selected index for the result", async () => {
  const source = await readFile(
    new URL("../app/juegos/la-ruleta/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /Math\.floor\(Math\.random\(\) \* CASTIGOS\.length\)/);
  assert.match(source, /spinDuration=\{activeSpin\?\.durationSeconds \?\? null\}/);
  assert.match(source, /onAnimationComplete=\{spinning \? onSpinComplete : undefined\}/);
  assert.match(source, /setSelectedCastigo\(CASTIGOS\[spin\.selectedIndex\]\)/);
  assert.doesNotMatch(source, /setTimeout\s*\(/);
});
