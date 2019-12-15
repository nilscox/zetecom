export type Paginated<T> = {
  items: T[];
  total: number;
};

export function paginatedResults<T>(parse: (item: any) => T) {
  return (data: any) => ({
    items: data.items.map(parse),
    total: data.total,
  });
}
