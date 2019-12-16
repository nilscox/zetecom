import { useCallback } from 'react';

export type Paginated<T> = {
  items: T[];
  total: number;
};

export function paginatedResults<T>(parse: (item: any) => T) {
  return useCallback((data: any) => ({
    items: data.items.map(parse),
    total: data.total,
  }), [parse]);
}
