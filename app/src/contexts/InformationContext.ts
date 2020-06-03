import { useState } from 'react';

import { Information } from '../types/Information';

import { useAppContext } from './AppContext';

export type InformationContextType = {
  information: Information;
  setInformation: (information: Information) => void;
};

export const useInformationContext = () => {
  const [information, setInformation] = useState<Information>();

  return { information, setInformation };
};

export const useInformation = () => {
  const { information: { information, setInformation } } = useAppContext();
  return [information, setInformation] as const;
};
