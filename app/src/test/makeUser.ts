import { Role, User } from '../types/User';

const makeUser = (partial?: Partial<User>): User => ({
  ...partial,
  id: 1,
  nick: 'nick',
  avatar: null,
  email: 'user@domain.tld',
  sinupDate: new Date(2020, 1, 10),
  roles: [Role.USER],
});

export default makeUser;
