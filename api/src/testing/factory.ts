export interface Factory<D, T> {
  create(data?: D): Promise<T>;
}
