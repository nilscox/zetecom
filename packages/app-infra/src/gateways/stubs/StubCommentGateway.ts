import {
  Comment,
  CommentDto,
  commentEntityToDto,
  CommentGateway,
  createComment,
  GetState,
  Paginated,
  paginated,
  ReactionType,
  selectAuthenticatedUser,
  selectComment,
} from '@zetecom/app-core';

import { EntityContainer } from './EntitiesContainers';
import { execute } from './execute';

export class StubCommentGateway implements CommentGateway {
  constructor(private commentsContainer: EntityContainer<Comment>) {}

  private getComment = this.commentsContainer.getItem;

  getState!: GetState;

  private get state() {
    return this.getState();
  }

  async fetchComment(commentId: string): Promise<CommentDto> {
    const comment = this.getComment(commentId);

    return execute({
      log: ['fetch replies', { commentId }],
      return: commentEntityToDto(comment),
    });
  }

  async fetchReplies(parentCommentId: string): Promise<Paginated<CommentDto>> {
    const comment = this.getComment(parentCommentId);

    return execute({
      log: ['fetch replies', { parentCommentId }],
      return: paginated(comment.replies.map(commentEntityToDto), comment.repliesCount),
    });
  }

  async createComment(text: string, parentId?: string): Promise<CommentDto> {
    const author = selectAuthenticatedUser(this.state);

    return execute({
      log: ['create comment', { text, parentId }],
      return: commentEntityToDto(createComment({ author, text, date: new Date() })),
    });
  }

  async editComment(commentId: string, text: string): Promise<CommentDto> {
    const comment = {
      ...selectComment(this.getState(), commentId),
      text,
    };

    return execute({
      log: ['edit comment', { commentId, text }],
      return: commentEntityToDto(comment),
    });
  }

  async setSubscription(commentId: string, subscribed: boolean): Promise<void> {
    return execute({
      log: ['set subscription', { commentId, subscribed }],
    });
  }

  async updateReaction(commentId: string, reaction: ReactionType | null): Promise<void> {
    return execute({
      log: ['update reaction', { commentId, reaction }],
    });
  }

  async reportComment(commentId: string, message?: string): Promise<void> {
    return execute({
      log: ['report comment', { commentId, message }],
    });
  }
}
