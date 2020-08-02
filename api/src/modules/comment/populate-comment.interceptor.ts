import { Injectable } from '@nestjs/common';
import { getCustomRepository, getRepository } from 'typeorm';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { CommentSubscription } from '../subscription/subscription.entity';
import { User } from '../user/user.entity';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { ReactionType } from './reaction.entity';

@Injectable()
export class PopulateComment extends TransformInterceptor<Comment> {

  get commentRepository() {
    return getCustomRepository(CommentRepository);
  }

  get subscriptionRepository() {
    return getRepository(CommentSubscription);
  }

  async transform(comments: Comment[], request: any) {
    const { user } = request;

    await this.addHistories(comments);
    await this.addRepliesCounts(comments);
    await this.addReactionsCounts(comments);

    if (user) {
      await this.addUserReaction(comments, user);
      await this.addUserSubscriptions(comments, user);
    }
  }

  private async addHistories(comments: Comment[]): Promise<Comment[]> {
    const commentsWithHistories = await this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.history', 'history')
      .where('comment.id IN (' + comments.map(r => r.id) + ')')
      .orderBy('history.created', 'DESC')
      .getMany();

    comments.forEach(comment => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      comment.history = commentsWithHistories.find(r => r.id === comment.id)!.history;
    });

    return comments;
  }

  private async addRepliesCounts(comments: Comment[]): Promise<Comment[]> {
    const repliesCounts = await this.commentRepository.getRepliesCounts(comments.map(r => r.id));

    comments.forEach(comment => {
      const reply = repliesCounts.find(r => r.commentId === comment.id);

      if (reply)
        comment.repliesCount = reply.repliesCount;
      else
        comment.repliesCount = 0;
    });

    return comments;
  }

  private async addReactionsCounts(comments: Comment[]): Promise<void> {
    const reactionsCounts = await this.commentRepository.getReactionsCounts(comments.map(r => r.id));

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

  private async addUserReaction(comments: Comment[], user: User): Promise<void> {
    const reactions = await this.commentRepository.getReactionForUser(comments.map(r => r.id), user.id);

    comments.forEach(comment => {
      const reaction = reactions.find(qr => qr.commentId === comment.id);

      if (reaction && reaction.type)
        comment.userReaction = reaction.type;
    });
  }

  private async addUserSubscriptions(comments: Comment[], user: User): Promise<void> {
    // TODO: handle this in subscription repository
    const results = await this.subscriptionRepository.createQueryBuilder('comment_subscription')
      .select('comment_id', 'commentId')
      .leftJoin('comment', 'comment', 'comment_subscription.comment_id = comment.id')
      .where('user_id = :userId', { userId: user.id })
      .andWhere('comment.id IN (' + comments.map(r => r.id) + ')')
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
