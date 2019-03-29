import { createContext } from 'react';

const ReactionSortTypeContext = createContext(null);

export default ReactionSortTypeContext;
export const ReactionSortTypeProvider = ReactionSortTypeContext.Provider;
export const ReactionSortTypeConsumer = ReactionSortTypeContext.Consumer;
