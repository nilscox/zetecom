import { useEffect, useState } from 'react';

import axios from 'axios';

import { Reaction, parseReaction } from '../types/Reaction';

const fetchRootReactions = async (informationId: number) => {
  const { data } = await axios.get(`/api/information/${informationId}/reactions`);

  return data.map((r: any) => parseReaction(r));
};

const fetchReplies = async (parentId: number) => {
  const { data } = await axios.get(`/api/reaction/${parentId}/answers`);

  return data.map((r: any) => parseReaction(r));
};

export { fetchRootReactions, fetchReplies };
