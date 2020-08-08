import { Injectable } from '@nestjs/common';
import { getCustomRepository, getRepository } from 'typeorm';

import { PopulateInterceptor } from '../../common/populate.interceptor';
import { User } from '../user/user.entity';

import { CommentRepository } from './comment.repository';
import { CommentDto } from './dtos/comment.dto';
import { ReactionType } from './reaction.entity';
import { Subscription } from './subscription/subscription.entity';

@Injectable()
export class PopulateComment extends PopulateInterceptor<CommentDto> {

  get commentRepository() {
    return getCustomRepository(CommentRepository);
  }

  get subscriptionRepository() {
    return getRepository(Subscription);
  }

  async populate(comments: CommentDto[], request: any) {
    const { user } = request;

    await this.addMessages(comments);
    await this.addRepliesCounts(comments);
    await this.addReactionsCounts(comments);

    if (user) {
      await this.addUserReaction(comments, user);
      await this.addUserSubscriptions(comments, user);
    }
  }

  private async addMessages(comments: CommentDto[]) {
    const result = await this.commentRepository.getMessages(comments.map(({ id }) => id));

    result.forEach(({ commentId, messages }) => {
      const comment = comments.find(({ id }) => commentId === id);

      comment.messages = messages;
    });
  }

  private async addRepliesCounts(comments: CommentDto[]): Promise<CommentDto[]> {
    const repliesCounts = await this.commentRepository.getRepliesCounts(comments.map(({ id }) => id));

    comments.forEach(comment => {
      const reply = repliesCounts.find(r => r.commentId === comment.id);

      if (reply)
        comment.repliesCount = reply.repliesCount;
      else
        comment.repliesCount = 0;
    });

    return comments;
  }

  private async addReactionsCounts(comments: CommentDto[]): Promise<void> {
    const reactionsCounts = await this.commentRepository.getReactionsCounts(comments.map(({ id }) => id));

    const getReactionsCount = (commentId: number, type: ReactionType): number => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return reactionsCounts.find(qrc => qrc.commentId === commentId)!.reactions[type];
    };

    comments.forEach(comment => {
      comment.reactionsCount = {
        APPROVE: getReactionsCount(comment.id, ReactionType.APPROVE),
        REFUTE: getReactionsCount(comment.id, ReactionType.REFUTE),
        SKEPTIC: getReactionsCount(comment.id, ReactionType.SKEPTIC),
      };
    });
  }

  private async addUserReaction(comments: CommentDto[], user: User): Promise<void> {
    const reactions = await this.commentRepository.getReactionForUser(comments.map(({ id }) => id), user.id);

    comments.forEach(comment => {
      const reaction = reactions.find(qr => qr.commentId === comment.id);

      if (reaction && reaction.type)
        comment.userReaction = reaction.type;
    });
  }

  private async addUserSubscriptions(comments: CommentDto[], user: User): Promise<void> {
    // TODO: handle this in subscription repository
    const results = await this.subscriptionRepository.createQueryBuilder('comment_subscription')
      .select('comment_id', 'commentId')
      .leftJoin('comment', 'comment', 'comment_subscription.comment_id = comment.id')
      .where('user_id = :userId', { userId: user.id })
      .andWhere('comment.id IN (' + comments.map(({ id }) => id) + ')')
      .getRawMany();

    const subscriptions = comments.reduce((acc, { id: commentId }) => ({
      ...acc,
      [commentId]: !!results.find(s => s.commentId === commentId),
    }), {} as { [commentId: number]: boolean });

    comments.forEach(comment => {
      comment.subscribed = subscriptions[comment.id];
    });
  }

}
