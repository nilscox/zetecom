import { CommentDto, CommentGateway, Paginated, ReactionType } from '@zetecom/app-core';

import { HttpAdapter, RequestError } from './adapters/HttpAdapter';
import { APICommentDto, APIMessageDto, transformComment, transformMessage } from './api/APICommentDto';
import { APIPaginated } from './api/APIPaginated';

export class HTTPCommentGateway implements CommentGateway {
  constructor(private readonly http: HttpAdapter) {}

  async fetchComment(commentId: string): Promise<CommentDto> {
    const [commentBody] = await this.http.get<APICommentDto>(`/api/comment/${commentId}`);
    const [historyBody] = await this.http.get<Array<APIMessageDto>>(`/api/comment/${commentId}/history`);

    return {
      ...transformComment(commentBody),
      history: historyBody.map(transformMessage).reverse(),
    };
  }

  async fetchReplies(parentCommentId: string): Promise<Paginated<CommentDto>> {
    const [{ items, total }] = await this.http.get<APIPaginated<APICommentDto>>(
      `/api/comment/${parentCommentId}/replies`,
    );

    return {
      results: items.map(transformComment),
      total,
    };
  }

  async createComment(text: string, commentsAreaId: string, parentId?: string): Promise<CommentDto> {
    const [body] = await this.http.post<APICommentDto>('/api/comment', {
      expectedStatus: 201,
      body: {
        text,
        commentsAreaId: Number(commentsAreaId),
        parentId: parentId !== undefined ? Number(parentId) : undefined,
      },
    });

    return transformComment(body);
  }

  async editComment(commentId: string, text: string): Promise<CommentDto> {
    const [body] = await this.http.put<APICommentDto>(`/api/comment/${commentId}`, {
      body: { text },
    });

    return transformComment(body);
  }

  async setSubscription(commentId: string, subscribed: boolean): Promise<void> {
    if (subscribed) {
      await this.http.post(`/api/comment/${commentId}/subscribe`, {
        expectedStatus: 201,
      });
    } else {
      await this.http.post(`/api/comment/${commentId}/unsubscribe`, {
        expectedStatus: 204,
      });
    }
  }

  async updateReaction(commentId: string, reaction: ReactionType | null): Promise<void> {
    await this.http.post(`/api/comment/${commentId}/reaction`, {
      body: { type: reaction },
      expectedStatus: 204,
    });
  }

  async reportComment(commentId: string, message?: unknown): Promise<void> {
    const [body, response] = await this.http.post<{ message?: string }>(`/api/comment/${commentId}/report`, {
      body: { message },
      expectedStatus: [201, 400],
    });

    if (response.status === 400 && body.message !== 'COMMENT_ALREADY_REPORTED') {
      throw new RequestError(response);
    }
  }
}
