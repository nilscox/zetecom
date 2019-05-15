import { createContext } from 'react';
import { User } from '../types/User';

const UserContext = createContext<User | null>(null);

export default UserContext;
export const Provider = UserContext.Provider;
export const Consumer = UserContext.Consumer;
