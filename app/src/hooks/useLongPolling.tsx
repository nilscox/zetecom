import { useEffect } from 'react';

const useLongPolling = (cb: () => void, ms: number) => {
  useEffect(() => {
    const interval = setInterval(() => {
      cb();
    }, ms);

    return () => clearInterval(interval);
  }, [cb, ms]);
};

export default useLongPolling;
