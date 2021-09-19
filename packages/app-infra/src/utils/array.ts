export const array = <T>(n: number, init: (n: number) => T): T[] => {
  return Array(n)
    .fill(0)
    .map((_, n) => init(n));
};
