import React from 'react';

const context = React.createContext(null);

export const UserProvider = context.Provider;
export const UserConsumer = context.Consumer;
