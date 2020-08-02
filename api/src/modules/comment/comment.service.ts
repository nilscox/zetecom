import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Information } from '../information/information.entity';
import { CommentSubscriptionService } from '../subscription/subscription.service';
import { User } from '../user/user.entity';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { Message } from './message.entity';
import { Reaction, ReactionType } from './reaction.entity';

@Injectable()
export class CommentService {

  constructor(

    private readonly commentRepository: CommentRepository,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    private readonly subscriptionService: CommentSubscriptionService,

  ) {}

  async findById(id: number): Promise<Comment | undefined> {
    return this.commentRepository.findOne(id);
  }

  async create(dto: CreateCommentDto, user: User, information: Information): Promise<Comment> {
    let parent: Comment | undefined;

    if (dto.parentId) {
      parent = await this.commentRepository.findOne({ id: dto.parentId });

      // TODO: error format
      if (!parent) {
        throw new BadRequestException(`standalone comment with id ${dto.parentId} not found`);
      }
    }

    const comment = new Comment();
    const message = new Message();

    comment.author = user;
    comment.information = information;

    message.text = dto.text;
    comment.message = message;

    if (parent)
      comment.parent = parent;

    await this.messageRepository.save(message);
    await this.commentRepository.save(comment);

    message.comment = comment;
    await this.messageRepository.save(message);

    // code smell
    comment.repliesCount = 0;
    comment.reactionsCount = {
      APPROVE: 0,
      REFUTE: 0,
      SKEPTIC: 0,
    };

    if (dto.parentId) {
      await this.commentRepository.incrementScore(dto.parentId, 2);

      // perform notification logic asynchronously (no await)
      this.subscriptionService.notifyReply(comment);
    }

    await this.subscriptionService.subscribe(user, comment);

    return comment;
  }

  async update(comment: Comment, dto: UpdateCommentDto): Promise<Comment> {
    if (dto.text) {
      const message = new Message();

      message.text = dto.text;
      message.comment = comment;
      comment.message = message;
      comment.updated = new Date();

      await this.messageRepository.save(message);
    }

    return await this.commentRepository.save(comment);
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
