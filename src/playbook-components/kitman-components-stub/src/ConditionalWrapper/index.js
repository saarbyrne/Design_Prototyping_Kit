/**
 * Conditional wrapper: when condition is true, wraps children with wrapper(children); otherwise renders children.
 * Stub for @kitman/components/src/ConditionalWrapper
 */
import React from 'react';

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper;
