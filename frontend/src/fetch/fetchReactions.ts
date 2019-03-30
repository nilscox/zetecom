import { useEffect, useState } from 'react';

import axios from 'axios';

import { ReactionSortType } from '../types/ReactionSortType';
import { Reaction, ShortReplyType, ReactionLabel, parseReaction } from '../types/Reaction';

export const fetchRootReactions = async (informationId: number, sort: ReactionSortType): Promise<Reaction[]> => {
  const { data } = await axios.get(`/api/information/${informationId}/reactions?sort=${sort}`, {
    withCredentials: true,
  });

  return data.map((r: any) => parseReaction(r));
};

export const fetchReaction = async (reactionId: number): Promise<Reaction> => {
  const { data } = await axios.get(`/api/reaction/${reactionId}`, {
    withCredentials: true,
  });

  return parseReaction(data);
};

export const fetchReplies = async (parentId: number, sort: ReactionSortType): Promise<Reaction[]> => {
  const { data } = await axios.get(`/api/reaction/${parentId}/replies?sort=${sort}`, {
    withCredentials: true,
  });

  return data.map((r: any) => parseReaction(r));
};

export const postReaction = async (informationId: number, label: ReactionLabel, quote: string | null, text: string, parentId?: number): Promise<Reaction> => {
  const payload = { informationId, label, quote, text, parentId };

  const { data } = await axios.post(`/api/reaction`, payload, {
    withCredentials: true,
  });

  return parseReaction(data);
};

export const postShortReply = async (reactionId: number, type: ShortReplyType): Promise<Reaction> => {
  const payload = { type: type ? type.toUpperCase() : null };

  const { data } = await axios.post(`/api/reaction/${reactionId}/short-reply`, payload, {
    withCredentials: true,
  });

  return parseReaction(data);
}
