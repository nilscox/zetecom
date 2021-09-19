type InitValue<T> = T;
type InitFactory<T> = (index: number) => T;
type Init<T> = InitValue<T> | InitFactory<T>;

export const array = <T>(n: number, init: Init<T>): T[] => {
  const initialize = (_: unknown, n: number): T => {
    if (typeof init === 'function') {
      return (init as InitFactory<T>)(n);
    }

    return init;
  };

  return Array(n).fill(null).map(initialize);
};
