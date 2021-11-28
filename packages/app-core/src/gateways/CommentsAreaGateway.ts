import { CommentDto, CommentsAreaDto, SortType } from '../entities';
import { Paginated } from '../shared/paginated';

export type FetchCommentsOptions = {
  page: number;
  pageSize: number;
  sort: SortType;
};

export interface CommentsAreaGateway {
  fetchCommentsAreas(): Promise<Paginated<CommentsAreaDto>>;
  searchCommentsAreas(query: string): Promise<Paginated<CommentsAreaDto>>;
  fetchCommentsArea(commentsAreaId: string): Promise<CommentsAreaDto | undefined>;
  fetchCommentsAreaByIdentifier(commentsAreaIdentifier: string): Promise<CommentsAreaDto | undefined>;
  fetchRootComments(commentsAreaId: string, options: FetchCommentsOptions): Promise<Paginated<CommentDto>>;
  searchComments(commentsAreaId: string, query: string, options: FetchCommentsOptions): Promise<Paginated<CommentDto>>;
  requestCommentsArea(commentsAreaIdentifier: string, pageUrl: string): Promise<void>;
}
