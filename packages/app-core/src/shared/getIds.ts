export const getIds = <T extends { id: string }>(entities: T[]) => {
  return entities.map(({ id }) => id);
};
