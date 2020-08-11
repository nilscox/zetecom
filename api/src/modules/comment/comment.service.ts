import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { Comment } from './comment.entity';
import { CommentJoinRelations, CommentRepository } from './comment.repository';
import { Message } from './message.entity';
import { Reaction, ReactionType } from './reaction.entity';
import { SubscriptionService } from './subscription/subscription.service';

@Injectable()
export class CommentService {

  constructor(

    private readonly userService: UserService,

    private readonly commentRepository: CommentRepository,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    private readonly subscriptionService: SubscriptionService,

  ) {}

  async exists(commentId: number) {
    return this.commentRepository.exists(commentId);
  }

  async findById(id: number, relations?: CommentJoinRelations): Promise<Comment | undefined> {
    return this.commentRepository.findById(id, relations);
  }

  async create(user: User, information: Information, parent: Comment | null, text: string): Promise<Comment> {
    const message = await this.messageRepository.save({
      text,
    });

    const comment = await this.commentRepository.save({
      author: user,
      information,
      parent,
      message,
    });

    message.comment = comment;
    await this.messageRepository.save(message);

    if (parent) {
      await this.commentRepository.incrementScore(parent.id, 2);

      // perform notification logic asynchronously (no await)
      this.subscriptionService.notifyReply(await this.findById(comment.id, { author: true, information: true, parent: true, message: true }));
    }

    await this.subscriptionService.subscribe(user, comment);

    return this.findById(comment.id);
  }

  async update(comment: Comment, text: string): Promise<Comment> {
    const message = await this.messageRepository.save({
      comment,
      text,
    });

    comment.message = message;
    await this.commentRepository.save(comment);

    return this.findById(comment.id, { message: true, messages: true });
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

  async findForUser(userId: number, search: string, page: number, pageSize: number) {
    const { items, total } = await this.commentRepository.findAll({
      authorId: userId,
      search,
      pagination: { pageSize, page },
      relations: { message: true, messages: true, author: true, information: true },
      sort: SortType.DATE_DESC,
    });

    if (total === 0)
      return { items: [], total: 0 };

    const uniqueInformationsIds = [...new Set(items.map(comment => comment.information.id))];

    const result = uniqueInformationsIds.map(informationId => ({
      information: items.find(comment => comment.information.id === informationId).information,
      comments: items.filter(comment => comment.information.id === informationId),
    }));

    return { items: result, total };
  }

  async findReplies(commentId: number, page: number, pageSize: number) {
    return this.commentRepository.findAll({
      parentId: commentId,
      pagination: { pageSize, page },
      sort: SortType.DATE_ASC,
    });
  }

  async findRoot(informationId: number, sort: SortType, page: number, pageSize: number) {
    return this.commentRepository.findAll({
      informationId,
      root: true,
      pagination: { pageSize, page },
      sort,
    });
  }

  async search(informationId: number, search: string, sort: SortType, page: number, pageSize: number) {
    let author: User | undefined;
    const match = /^@([-_a-zA-Z0-9]+)$/.exec(search);

    if (match) {
      author = await this.userService.findByNick(match[1]);

      if (author)
        search = undefined;
    }

    return this.commentRepository.findAll({
      informationId,
      pagination: { pageSize, page },
      sort,
      authorId: author?.id,
      search,
    });
  }

}
