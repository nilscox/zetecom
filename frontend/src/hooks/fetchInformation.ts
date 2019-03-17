import { useEffect, useState } from 'react';

import axios from 'axios';

import { Information, parseInformation } from '../types/Information';

const fetchInformationFromYoutubeId = (youtubeId: string) => {
  const [information, setInformation] = useState<Information | null>(null);

  useEffect(() => {
    axios.get(`/api/information/by-youtubeId/${youtubeId}`, {
      validateStatus: (s: number) => [200, 404].indexOf(s) >= 0,
    })
      .then(({ status, data }) => {
        if (status === 200) {
          setInformation(parseInformation(data));
        } else {
          console.warn(`cannot find information from youtubeId: ${youtubeId}`);
        }
      });
  }, [youtubeId]);

  return information;
};

export { fetchInformationFromYoutubeId };
