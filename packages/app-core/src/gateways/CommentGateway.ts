import { CommentDto, ReactionType } from '../entities/Comment';
import { CommentsArea } from '../entities/CommentsArea';
import { SortType } from '../entities/SortType';
import { Paginated } from '../shared/paginated';

export type FetchCommentsOptions = {
  page: number;
  pageSize: number;
  sort: SortType;
};

export interface CommentGateway {
  fetchCommentsArea(commentsAreaId: string): Promise<CommentsArea>;
  fetchRootComments(commentsAreaId: string, options: FetchCommentsOptions): Promise<Paginated<CommentDto>>;
  searchComments(commentsAreaId: string, query: string, options: FetchCommentsOptions): Promise<Paginated<CommentDto>>;
  fetchReplies(parentCommentId: string): Promise<Paginated<CommentDto>>;
  createComment(text: string, parentId?: string): Promise<CommentDto>;
  editComment(commentId: string, text: string): Promise<CommentDto>;
  setSubscription(commentId: string, subscribed: boolean): Promise<void>;
  updateReaction(commentId: string, reaction: ReactionType | null): Promise<void>;
  reportComment(commentId: string, reason: unknown, message?: unknown): void;
}
