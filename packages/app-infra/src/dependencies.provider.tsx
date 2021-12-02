import { createContext, useContext } from 'react';

import { Dependencies } from '@zetecom/app-core';

const dependenciesContext = createContext<Dependencies>(null as never);
export const DependenciesProvider = dependenciesContext.Provider;

export const useDependencies = () => useContext(dependenciesContext);
export const useTrackingGateway = () => useDependencies().trackingGateway;
