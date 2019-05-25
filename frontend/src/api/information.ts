import axios from 'axios';

import { Information, parseInformation } from '../types/Information';

export const fetchInformationFromYoutubeId = async (youtubeId: string): Promise<Information | undefined> => {
  const { status, data } = await axios.get(`/api/information/by-youtubeId/${youtubeId}`, {
    validateStatus: (s: number) => [200, 404].indexOf(s) >= 0,
    withCredentials: false,
  });

  if (status === 200)
    return parseInformation(data);
  else
    console.warn(`cannot find information from youtubeId: ${youtubeId}`);
};
