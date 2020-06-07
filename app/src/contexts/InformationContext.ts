import { createContext, useContext } from 'react';

import { Information } from '../types/Information';

const InformationContext = createContext<Information | null>(null);

export const InformationProvider = InformationContext.Provider;
export const useInformation = () => useContext(InformationContext);
