import { createContext } from 'react';

const InformationContext = createContext(null);

export default InformationContext;
export const InformationProvider = InformationContext.Provider;
export const InformationConsumer = InformationContext.Consumer;
