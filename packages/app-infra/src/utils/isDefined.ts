export const isDefined = <T>(t: T | undefined): t is T => {
  return t !== undefined;
};
