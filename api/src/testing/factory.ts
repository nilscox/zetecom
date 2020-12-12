export interface Factory<T> {
  create(override?: Partial<Omit<T, 'id'>>): Promise<T>;
}
