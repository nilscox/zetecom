import { createId } from '../shared/createId';
import { Factory } from '../shared/factory';

export type UserDto = {
  id: string;
  nick: string;
  avatar: string | null;
};

export type User = UserDto;

export const createUser: Factory<User> = (overrides = {}) => ({
  id: createId(),
  nick: 'nick',
  avatar: null,
  ...overrides,
});

export enum UserRole {
  user = 'user',
  moderator = 'moderator',
  admin = 'admin',
}

export type AuthenticatedUserDto = UserDto & {
  email: string;
  signupDate: Date;
  role: UserRole;
};

export type AuthenticatedUser = AuthenticatedUserDto;

export const createAuthenticatedUser: Factory<AuthenticatedUser> = (overrides = {}) => ({
  ...createUser(overrides),
  email: '',
  signupDate: new Date(),
  role: UserRole.user,
  ...overrides,
});
