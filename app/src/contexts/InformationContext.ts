import { useAppContext } from './AppContext';

export const useInformation = () => {
  const { information, setInformation } = useAppContext();
  return [information, setInformation] as const;
};
