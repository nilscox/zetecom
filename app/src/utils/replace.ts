const replace = <T>(items: T[], predicate: (item: T) => boolean, replacer: T | ((item: T) => T)) => {
  const idx = items.findIndex(predicate);

  if (idx < 0) {
    return items;
  }

  const replaced = typeof replacer === 'function' ? (replacer as (item: T) => T)(items[idx]) : replacer;

  return [...items.slice(0, idx), replaced, ...items.slice(idx + 1)];
};

export default replace;
