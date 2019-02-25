import usersJson from './users';
import reactionsJson from './reactions';

import { User, Reaction } from 'Types';

export const getUser = (idx) => new User(usersJson[idx]);
export const getReaction = (idx, author) => new Reaction({ ...reactionsJson[idx], author });
