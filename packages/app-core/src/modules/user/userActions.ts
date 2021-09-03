import { User } from '../../entities/User';
import { createAction } from '../../store/createAction';

export const setCurrentUser = (user: User | undefined) => createAction('setCurrentUser', user);

export type UserActions = ReturnType<typeof setCurrentUser>;
