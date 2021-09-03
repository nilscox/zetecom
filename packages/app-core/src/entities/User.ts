import { createId } from '../shared/createId';
import { Factory } from '../shared/factory';

export interface User {
  id: string;
  nick: string;
  avatar: string | null;
}

export const createUser: Factory<User> = (overrides = {}) => ({
  id: createId(),
  nick: 'nick',
  avatar: null,
  ...overrides,
});
