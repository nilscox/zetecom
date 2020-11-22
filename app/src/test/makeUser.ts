import { Role, User } from '../types/User';

const makeUser = (partial?: Partial<User>): User => ({
  id: 1,
  nick: 'nick',
  avatar: null,
  email: 'user@domain.tld',
  signupDate: new Date(2020, 1, 10),
  roles: [Role.USER],
  ...partial,
});

export default makeUser;
