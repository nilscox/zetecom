import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { Message } from './message.entity';
import { Reaction, ReactionType } from './reaction.entity';
import { SubscriptionService } from './subscription/subscription.service';

@Injectable()
export class CommentService {

  constructor(

    private readonly commentRepository: CommentRepository,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    private readonly subscriptionService: SubscriptionService,

  ) {}

  async findById(id: number, opts?: { author: boolean; information: boolean; parent: boolean }): Promise<Comment | undefined> {
    return this.commentRepository.findById(id, opts);
  }

  async create(user: User, information: Information, parent: Comment | null, text: string): Promise<Comment> {
    const comment = await this.commentRepository.save({
      author: user,
      information,
      parent,
    });

    await this.messageRepository.save({
      comment,
      text,
    });

    if (parent) {
      await this.commentRepository.incrementScore(parent.id, 2);

      // perform notification logic asynchronously (no await)
      this.subscriptionService.notifyReply(await this.findById(comment.id, { author: true, information: true, parent: true }));
    }

    await this.subscriptionService.subscribe(user, comment);

    return this.findById(comment.id);
  }

  async update(comment: Comment, text: string): Promise<Comment> {
    await this.messageRepository.save({
      comment,
      text,
    });

    return this.findById(comment.id);
  }

  async setReaction(comment: Comment, user: User, type: ReactionType | null) {
    const existingReaction = await this.reactionRepository.findOne({
      where: {
        comment,
        user,
      },
      relations: ['comment', 'user'],
    });

    if (existingReaction) {
      if (existingReaction.type === type)
        return;

      await this.reactionRepository.update(existingReaction.id, { type: type || undefined });

      if (existingReaction.type === null && type !== null)
        await this.commentRepository.incrementScore(comment.id);

      if (existingReaction.type !== null && type === null)
        await this.commentRepository.decrementScore(comment.id);
    } else {
      if (type === null)
        return;

      const reaction = new Reaction();

      reaction.comment = comment;
      reaction.user = user;
      reaction.type = type;

      await this.reactionRepository.save(reaction);

      await this.commentRepository.incrementScore(comment.id);
    }
  }

}
