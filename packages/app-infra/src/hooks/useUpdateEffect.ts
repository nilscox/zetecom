import { useEffect, useRef } from 'react';

const useUpdateEffect = (effect: React.EffectCallback, deps: React.DependencyList = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, deps);
};

export default useUpdateEffect;
