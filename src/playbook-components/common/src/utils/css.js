/**
 * Stub for @kitman/common/src/utils/css - convert pixels to REM (1rem = 16px baseline)
 */
export function convertPixelsToREM(px, base = 16) {
  return `${Number(px) / base}rem`;
}
