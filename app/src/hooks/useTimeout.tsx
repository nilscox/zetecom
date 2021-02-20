import { useEffect } from 'react';

const useTimeout = (cb: () => void, ms: number) => {
  useEffect(() => {
    const timeout = setTimeout(cb, ms);

    return () => clearTimeout(timeout);
  }, [cb, ms]);
};

export default useTimeout;
