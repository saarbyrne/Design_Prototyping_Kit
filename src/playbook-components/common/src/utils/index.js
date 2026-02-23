/**
 * Stub for @kitman/common/src/utils
 */
export function arraysAreNotEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return true;
  return a.some((val, i) => val !== b[i]);
}

export function SentryCaptureMessage() {}
