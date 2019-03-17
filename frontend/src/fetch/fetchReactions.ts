import { useEffect, useState } from 'react';

import axios from 'axios';

import { Reaction, ReactionLabel, parseReaction } from '../types/Reaction';

const fetchRootReactions = async (informationId: number) => {
  const { data } = await axios.get(`/api/information/${informationId}/reactions`);

  return data.map((r: any) => parseReaction(r));
};

const fetchReplies = async (parentId: number) => {
  const { data } = await axios.get(`/api/reaction/${parentId}/answers`);

  return data.map((r: any) => parseReaction(r));
};

const postReaction = async (informationId: number, label: ReactionLabel, quote: string | null, text: string, parentId?: number) => {
  const payload = { informationId, label, quote, text, parentId };

  const { data } = await axios.post(`/api/reaction`, payload, {
    withCredentials: true,
  });

  return parseReaction(data);
};

export { fetchRootReactions, fetchReplies, postReaction };
