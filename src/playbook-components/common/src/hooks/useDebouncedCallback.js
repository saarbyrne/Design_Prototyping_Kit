/**
 * Stub for @kitman/common/src/hooks/useDebouncedCallback
 */
import { useCallback, useRef } from 'react';

export default function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef();
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [delay]
  );
}
