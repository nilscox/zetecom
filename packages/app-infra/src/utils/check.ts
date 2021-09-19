export const check = <T extends unknown>(predicate: boolean, value: T) => {
  if (predicate) {
    return value;
  }
};
