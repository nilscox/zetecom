export type Paginated<T> = {
  results: T[];
  total: number;
};

export const paginated = <T>(items: T[], total = items.length): Paginated<T> => {
  return { results: items, total };
};
