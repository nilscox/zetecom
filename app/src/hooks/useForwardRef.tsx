import { ForwardedRef, useEffect, useRef } from 'react';

const useForwardRef = <T extends HTMLElement>(forwardedRef: ForwardedRef<T>) => {
  const localRef = useRef<T>(null);
  const ref = forwardedRef && 'current' in forwardedRef ? forwardedRef : localRef;

  useEffect(() => {
    if (localRef.current && typeof forwardedRef === 'function') {
      forwardedRef(localRef.current);
    }
  }, [localRef, forwardedRef]);

  return ref;
};

export default useForwardRef;
