import {
  Comment,
  CommentDto,
  commentDtoToEntity,
  commentEntityToDto,
  CommentsArea,
  CommentsAreaDto,
  commentsAreaEntityToDto,
  CommentsAreaGateway,
  FetchCommentsOptions,
  Paginated,
  paginated,
  SortType,
} from '@zetecom/app-core';

import { sum } from '~/utils/sum';

import { isDefined } from '../../utils/isDefined';

import { EntityContainer } from './EntitiesContainers';
import { execute } from './execute';

export class StubCommentsAreaGateway implements CommentsAreaGateway {
  constructor(
    private commentsAreasContainer: EntityContainer<CommentsArea>,
    private commentsContainer: EntityContainer<Comment>,
  ) {}

  private getCommentsAreas = this.commentsAreasContainer.allItems;

  private getCommentsArea = this.commentsAreasContainer.getItem;

  private getComment = this.commentsContainer.getItem;

  public commentsAreasIdentifierMap = new Map<string, string>();

  async fetchCommentsAreas(): Promise<Paginated<CommentsAreaDto>> {
    const commentsAreas = this.getCommentsAreas();

    return execute({
      log: ['fetch comments areas'],
      return: paginated(commentsAreas.map(commentsAreaEntityToDto)),
      wait: 100,
    });
  }

  async searchCommentsAreas(query: string): Promise<Paginated<CommentsAreaDto>> {
    const map = (commentsArea: CommentsArea): CommentsArea | undefined => {
      const { title, url } = commentsArea.information;

      return [title, url].some((t) => t.includes(query)) ? commentsArea : undefined;
    };

    const commentsAreas = this.getCommentsAreas().map(map).filter(isDefined);

    return execute({
      log: ['search comments areas', { query }],
      return: paginated(commentsAreas.map(commentsAreaEntityToDto)),
    });
  }

  async fetchCommentsArea(commentsAreaId: string): Promise<CommentsAreaDto | undefined> {
    const commentsArea = this.getCommentsArea(commentsAreaId);

    return execute({
      log: ['fetch comments area', { commentsAreaId }],
      return: commentsAreaEntityToDto(commentsArea),
      wait: 100,
    });
  }

  async fetchCommentsAreaByIdentifier(commentsAreaIdentifier: string): Promise<CommentsAreaDto | undefined> {
    const commentsAreaId = this.commentsAreasIdentifierMap.get(commentsAreaIdentifier);
    const commentsArea = commentsAreaId ? this.getCommentsArea(commentsAreaId) : undefined;

    return execute({
      log: ['fetch comments area by identifier', { commentsAreaIdentifier }],
      return: commentsArea,
    });
  }

  async fetchRootComments(commentsAreaId: string, options: FetchCommentsOptions): Promise<Paginated<CommentDto>> {
    const rootComments = this.getCommentsArea(commentsAreaId).comments;

    const score = ({ repliesCount, reactionsCount }: Comment) => {
      return 2 * repliesCount + sum(Object.values(reactionsCount));
    };

    const sort: Record<SortType, (c1: Comment, c2: Comment) => number> = {
      [SortType.dateAsc]: ({ date: a }, { date: b }) => a.getTime() - b.getTime(),
      [SortType.dateDesc]: ({ date: a }, { date: b }) => b.getTime() - a.getTime(),
      [SortType.relevance]: (c1, c2) => score(c2) - score(c1),
    };

    return execute({
      log: ['fetch root comments', { commentsAreaId, options }],
      return: paginated(rootComments.sort(sort[options.sort]).map(commentDtoToEntity)),
    });
  }

  async searchComments(
    commentsAreaId: string,
    query: string,
    options: FetchCommentsOptions,
  ): Promise<Paginated<CommentDto>> {
    const map = (comment: Comment): Array<Comment | undefined> => [
      comment.text.includes(query) ? comment : undefined,
      ...(this.getComment(comment.id).replies ?? []).flatMap(map),
    ];

    const rootComments = this.getCommentsArea(commentsAreaId).comments;
    const comments = rootComments.flatMap(map).filter(isDefined);

    return execute({
      log: ['search comments', { commentsAreaId, query, options }],
      return: paginated(comments.map(commentEntityToDto)),
    });
  }

  async requestCommentsArea(commentsAreaIdentifier: string, pageUrl: string): Promise<void> {
    return execute({
      log: ['request comments area', { commentsAreaIdentifier, pageUrl }],
    });
  }
}
