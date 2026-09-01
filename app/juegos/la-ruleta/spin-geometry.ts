export const ROULETTE_SEGMENT_COUNT = 16;
export const ROULETTE_SEGMENT_ANGLE = 360 / ROULETTE_SEGMENT_COUNT;

// The SVG draws segment 0 from the 12 o'clock axis, which is -90 degrees.
export const FIRST_SEGMENT_START_ANGLE = -90;

// The fixed pointer is centered on the same 12 o'clock axis.
export const POINTER_ANGLE = -90;

export function normalizeRotation(rotation: number): number {
  const normalized = ((rotation % 360) + 360) % 360;
  return Object.is(normalized, -0) ? 0 : normalized;
}

export function getSegmentCenter(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= ROULETTE_SEGMENT_COUNT) {
    throw new RangeError(`Roulette segment index must be between 0 and ${ROULETTE_SEGMENT_COUNT - 1}`);
  }

  return FIRST_SEGMENT_START_ANGLE + (index + 0.5) * ROULETTE_SEGMENT_ANGLE;
}

export function getTargetRotation(
  previousRotation: number,
  selectedIndex: number,
  extraRotations: number,
): number {
  if (!Number.isInteger(extraRotations) || extraRotations < 0) {
    throw new RangeError("Extra rotations must be a non-negative integer");
  }

  const desiredRotation = normalizeRotation(
    POINTER_ANGLE - getSegmentCenter(selectedIndex),
  );
  const clockwiseDelta = normalizeRotation(
    desiredRotation - normalizeRotation(previousRotation),
  );

  return previousRotation + extraRotations * 360 + clockwiseDelta;
}

export function createSpinLifecycle() {
  let nextId = 0;
  let activeId: number | null = null;

  return {
    begin(): number | null {
      if (activeId !== null) return null;

      activeId = ++nextId;
      return activeId;
    },
    complete(id: number): boolean {
      if (activeId !== id) return false;

      activeId = null;
      return true;
    },
    cancel(): void {
      activeId = null;
    },
  };
}
