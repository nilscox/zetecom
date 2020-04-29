import { createContext } from 'react';

const SearchQueryContext = createContext<string | undefined>(undefined);

export default SearchQueryContext;
export const SearchQueryProvider = SearchQueryContext.Provider;
export const SearchQueryConsumer = SearchQueryContext.Consumer;
