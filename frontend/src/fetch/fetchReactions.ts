import { useEffect, useState } from 'react';

import axios from 'axios';

import { ReactionSortType } from '../types/ReactionSortType';
import { Reaction, ShortReplyType, ReactionLabel, parseReaction } from '../types/Reaction';

const fetchRootReactions = async (informationId: number, sort: ReactionSortType) => {
  const { data } = await axios.get(`/api/information/${informationId}/reactions?sort=${sort}`, {
    withCredentials: true,
  });

  return data.map((r: any) => parseReaction(r));
};

const fetchReplies = async (parentId: number) => {
  const { data } = await axios.get(`/api/reaction/${parentId}/replies`, {
    withCredentials: true,
  });

  return data.map((r: any) => parseReaction(r));
};

const postReaction = async (informationId: number, label: ReactionLabel, quote: string | null, text: string, parentId?: number) => {
  const payload = { informationId, label, quote, text, parentId };

  const { data } = await axios.post(`/api/reaction`, payload, {
    withCredentials: true,
  });

  return parseReaction(data);
};

const postShortReply = async (reactionId: number, type: ShortReplyType) => {
  const payload = { type: type ? type.toUpperCase() : null };

  const { data } = await axios.post(`/api/reaction/${reactionId}/short-reply`, payload, {
    withCredentials: true,
  });

  return parseReaction(data);
}

export { fetchRootReactions, fetchReplies, postReaction, postShortReply };
