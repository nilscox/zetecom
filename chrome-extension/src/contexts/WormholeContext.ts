import { createContext } from 'react';

import Wormhole from '../types/Wormhole';

const WormholeContext = createContext<Wormhole | null>(null);

export default WormholeContext;
export const Provider = WormholeContext.Provider;
export const Consumer = WormholeContext.Consumer;
