/**
 * Polyfill for react-filepond and its filepond dependency.
 * Vite's pre-bundled deps reference babelHelpers.extends which is undefined at runtime.
 * This module must be imported first in main.jsx so it runs before any other code.
 */
if (typeof globalThis !== 'undefined') {
  globalThis.babelHelpers = globalThis.babelHelpers || {
    extends: (...args) => Object.assign({}, ...args)
  };
}
