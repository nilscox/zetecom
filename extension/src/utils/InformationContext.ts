import { createContext, useContext } from 'react';

import { Information } from 'src/types/Information';

const InformationContext = createContext<Information>(undefined);

export default InformationContext;
export const InformationProvider = InformationContext.Provider;
export const InformationConsumer = InformationContext.Consumer;

export const useInformation = () => useContext(InformationContext);
