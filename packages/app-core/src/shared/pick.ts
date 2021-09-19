// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pick = <T extends Record<string, any>, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> => {
  return keys.reduce((obj, key) => (key in object ? { ...obj, [key]: object[key] } : obj), {} as Pick<T, K>);
};
