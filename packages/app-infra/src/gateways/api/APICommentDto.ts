import { CommentDto, CommentEdition, ReactionType } from '@zetecom/app-core';

import { APIUserLightDto, transformUserLight } from './APIUserDto';

export enum APIReactionType {
  like = 'like',
  approve = 'approve',
  think = 'think',
  disagree = 'disagree',
  dontUnderstand = 'dontUnderstand',
}

const reactionsMap = {
  [APIReactionType.like]: ReactionType.like,
  [APIReactionType.approve]: ReactionType.approve,
  [APIReactionType.dontUnderstand]: ReactionType.dontUnderstand,
  [APIReactionType.disagree]: ReactionType.disagree,
  [APIReactionType.think]: ReactionType.think,
};

export const transformReaction = (reaction: APIReactionType): ReactionType => {
  return reactionsMap[reaction];
};

export type APIMessageDto = {
  text: string;
  date: string;
};

export const transformMessage = (dto: APIMessageDto): CommentEdition => ({
  text: dto.text,
  date: new Date(dto.date),
});

export type APIReactionsCountDto = {
  like: number;
  approve: number;
  think: number;
  disagree: number;
  dontUnderstand: number;
};

export type APICommentDto = {
  message: APIMessageDto;
  messages: APIMessageDto[];
  id: number;
  date: Date;
  author: APIUserLightDto;
  edited: Date | false;
  text: string;
  repliesCount: number;
  reactionsCount: APIReactionsCountDto;
  userReaction?: APIReactionType;
  subscribed?: boolean;
  score: number;
};

export const transformComment = (dto: APICommentDto): CommentDto => ({
  ...dto,
  id: String(dto.id),
  author: transformUserLight(dto.author),
  userReaction: dto.userReaction ? transformReaction(dto.userReaction) : undefined,
});
