import { CommentDto, ReactionType } from '../entities';
import { Paginated } from '../shared/paginated';

export interface CommentGateway {
  fetchComment(commentId: string): Promise<CommentDto>;
  fetchReplies(parentCommentId: string): Promise<Paginated<CommentDto>>;
  createComment(text: string, commentsAreaId: string, parentId?: string): Promise<CommentDto>;
  editComment(commentId: string, text: string): Promise<CommentDto>;
  setSubscription(commentId: string, subscribed: boolean): Promise<void>;
  updateReaction(commentId: string, reaction: ReactionType | null): Promise<void>;
  reportComment(commentId: string, message?: unknown): Promise<void>;
}
