import { useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export type Paginated<T> = {
  items: T[];
  total: number;
};

export function usePaginatedResults<T>(parse: (item: Any) => T) {
  return useCallback((data: Any) => ({
    items: data.items.map(parse),
    total: data.total,
  }), [parse]);
}
