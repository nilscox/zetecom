import { useEffect, useState } from 'react';

import axios from 'axios';

import { Reaction, parseReaction } from '../types/Reaction';

const fetchReactionsList = (informationId?: number) => {
  const [reactions, setReactions] = useState<Reaction[] | null>(null);

  useEffect(() => {
    if (!informationId)
      return;

    axios.get(`/api/information/${informationId}/reactions`, {
      validateStatus: (s: number) => [200, 404].indexOf(s) >= 0,
    })
      .then(({ status, data }) => {
        if (status === 200) {
          setReactions(data.map((r: any) => parseReaction(r)));
        } else {
          console.warn(`cannot find reactions from informationId: ${informationId}`);
        }
      });
  }, [informationId]);

  return reactions;
};

export { fetchReactionsList };
