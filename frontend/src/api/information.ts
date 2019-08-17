import { Information, parseInformation } from 'src/types/Information';

import useAxios, { AxiosHook } from './use-axios';

export const useInformationFromYoutubeId: AxiosHook<Information> = (youtubeId: string) => {
  const url = `/api/information/by-youtubeId/${youtubeId}`;

  return useAxios({
    url,
    withCredentials: false,
  }, parseInformation);
};
