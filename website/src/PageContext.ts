import { createContext, useContext } from 'react';

import routes, { Route } from './routes';

const PageContext = createContext<Route>(routes[0]);

export default PageContext;

export const PageProvider = PageContext.Provider;
export const PageConsumer = PageContext.Consumer;

export const usePage = () => useContext(PageContext);
