import { createContext, useContext } from 'react';

const searchQueryContext = createContext<string | undefined>(undefined);

export const SearchQueryProvider = searchQueryContext.Provider;
export const useSearchQuery = () => useContext(searchQueryContext);
