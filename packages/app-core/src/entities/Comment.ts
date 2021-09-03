import { createId } from '../shared/createId';
import { Factory } from '../shared/factory';

import { createUser, User } from './User';

export enum ReactionType {
  like = 'like',
  approve = 'approve',
  think = 'think',
  disagree = 'disagree',
  dontUnderstand = 'dontUnderstand',
}

export type ReactionsCount = Record<ReactionType, number>;

export type CommentDto = {
  id: string;
  text: string;
  date: Date;
  edited: false | Date;
  repliesCount: number;
  author: User;
  reactionsCount: ReactionsCount;
  userReaction?: ReactionType | null;
  subscribed?: boolean;
  score: number;
};

export type Comment = CommentDto & {
  // frontend-only properties
  replies: Comment[];
  areRepliesOpen: boolean;
  isEditing: boolean;
  isSubmittingEdition: boolean;
  isFetchingReplies: boolean;
  isReplyFormOpen: boolean;
  isSubmittingReply: boolean;
};

export const createReactionsCount: Factory<Comment['reactionsCount']> = (overrides = {}) => ({
  [ReactionType.like]: 0,
  [ReactionType.approve]: 0,
  [ReactionType.think]: 0,
  [ReactionType.disagree]: 0,
  [ReactionType.dontUnderstand]: 0,
  ...overrides,
});

export const createCommentDto: Factory<CommentDto> = (overrides = {}) => ({
  id: createId(),
  text: 'comment',
  date: new Date(),
  edited: false,
  repliesCount: 0,
  author: createUser({ nick: 'author' }),
  reactionsCount: createReactionsCount(),
  score: 0,
  ...overrides,
});

export const createComment: Factory<Comment> = (overrides = {}) => ({
  ...createCommentDto(overrides),
  repliesCount: overrides?.replies?.length ?? 0,
  replies: [],
  areRepliesOpen: false,
  isEditing: false,
  isSubmittingEdition: false,
  isFetchingReplies: false,
  isReplyFormOpen: false,
  isSubmittingReply: false,
  ...overrides,
});
