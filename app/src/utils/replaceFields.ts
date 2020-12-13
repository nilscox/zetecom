const replaceFields = <K extends string, V, R>(obj: Record<K, V>, replacer: (value: V, key: K) => R): Record<K, R> => {
  return Object.entries<V>(obj).reduce(
    (obj, [key, value]) => ({ ...obj, [key]: replacer(value, key as K) }),
    {} as Record<K, R>,
  );
};

export default replaceFields;
