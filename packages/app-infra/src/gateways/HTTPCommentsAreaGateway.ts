import { CommentDto, CommentsAreaDto, CommentsAreaGateway, FetchCommentsOptions, Paginated } from '@zetecom/app-core';

import { HttpAdapter } from './adapters/HttpAdapter';
import { APICommentDto, transformComment } from './api/APICommentDto';
import { APICommentsAreaDto, transformCommentsArea } from './api/APICommentsAreaDto';
import { APIPaginated } from './api/APIPaginated';
import { transformSortQuery } from './api/APISortQuery';

export class HTTPCommentsAreaGateway implements CommentsAreaGateway {
  constructor(private readonly http: HttpAdapter) {}

  async fetchCommentsAreas(): Promise<Paginated<CommentsAreaDto>> {
    const [{ items, total }] = await this.http.get<APIPaginated<APICommentsAreaDto>>('/api/comments-area');

    return {
      results: items.map(transformCommentsArea),
      total,
    };
  }

  async searchCommentsAreas(query: string): Promise<Paginated<CommentsAreaDto>> {
    const [{ items, total }] = await this.http.get<APIPaginated<APICommentsAreaDto>>('/api/comments-area', {
      query: {
        search: query,
      },
    });

    return {
      results: items.map(transformCommentsArea),
      total,
    };
  }

  async fetchCommentsArea(commentsAreaId: string): Promise<CommentsAreaDto | undefined> {
    const [body, { status }] = await this.http.get<APICommentsAreaDto>(`/api/comments-area/${commentsAreaId}`, {
      expectedStatus: [200, 404],
    });

    if (status === 404) {
      return;
    }

    return transformCommentsArea(body);
  }

  async fetchCommentsAreaByIdentifier(commentsAreaIdentifier: string): Promise<CommentsAreaDto | undefined> {
    const url = `/api/comments-area/by-identifier/${commentsAreaIdentifier}`;
    const [body, { status }] = await this.http.get<APICommentsAreaDto>(url, {
      expectedStatus: [200, 404],
    });

    if (status === 404) {
      return;
    }

    return transformCommentsArea(body);
  }

  async fetchRootComments(commentsAreaId: string, options: FetchCommentsOptions): Promise<Paginated<CommentDto>> {
    const [{ items, total }] = await this.http.get<APIPaginated<APICommentDto>>('/api/comment', {
      query: {
        commentsAreaId,
        page: options.page,
        pageSize: options.pageSize,
        sort: transformSortQuery(options.sort),
      },
    });

    return {
      results: items.map(transformComment),
      total,
    };
  }

  async searchComments(
    commentsAreaId: string,
    query: string,
    options: FetchCommentsOptions,
  ): Promise<Paginated<CommentDto>> {
    const [{ items, total }] = await this.http.get<APIPaginated<APICommentDto>>('/api/comment', {
      query: {
        commentsAreaId,
        search: query,
        page: options.page,
        pageSize: options.pageSize,
        sort: transformSortQuery(options.sort),
      },
    });

    return {
      results: items.map(transformComment),
      total,
    };
  }

  async requestCommentsArea(commentsAreaIdentifier: string, pageUrl: string): Promise<void> {
    await this.http.post('/api/comments-area/request', {
      body: {
        identifier: commentsAreaIdentifier,
        informationUrl: pageUrl,
      },
      expectedStatus: 201,
    });
  }
}
