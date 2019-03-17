import { useEffect, useState } from 'react';

import axios from 'axios';

import { Reaction, parseReaction } from '../types/Reaction';

const fetchRootReactions = (informationId?: number) => {
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

const fetchReplies = async (parentId: number) => {
  const { data } = await axios.get(`/api/reaction/${parentId}/answers`);

  return data.map((r: any) => parseReaction(r));
};

export { fetchRootReactions, fetchReplies };
