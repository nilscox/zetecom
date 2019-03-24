import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { labelId } from 'Utils/labels';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { SlugService } from '../information/services/slug.service';
import { PaginationService } from '../information/services/pagination.service';

import { Reaction } from './reaction.entity';
import { Message } from './message.entity';
import { ShortReply, ShortReplyType } from './short-reply.entity';
import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';

@Injectable()
export class ReactionService {

  constructor(

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(ShortReply)
    private readonly shortReplyRepository: Repository<ShortReply>,

    private readonly slugService: SlugService,
    private readonly paginationService: PaginationService,

  ) {}

  async findOne(where): Promise<Reaction> {
    const result = await this.reactionRepository.findOne(where);

    if (!result)
      return null;

    return result;
  }

  async findReplies(reaction: Reaction, page: number = 1): Promise<Reaction[]> {
    return this.reactionRepository.find({
      where: { parent: reaction },
      ...this.paginationService.paginationOptions(page),
    });
  }

  async addRepliesCounts(reactions: Reaction[]): Promise<Reaction[]> {
    if (!reactions.length)
      return [];

    const repliesCounts = await this.reactionRepository.createQueryBuilder('reaction')
      .select('reaction.id')
      .addSelect('count(replies.id)', 'reaction_repliesCount')
      .leftJoin('reaction.replies', 'replies')
      .where('replies."parentId" IN (' + reactions.map(r => r.id) + ')')
      .groupBy('reaction.id')
      .getRawMany();

    reactions.forEach(reaction => {
      const answer = repliesCounts.find(a => a.reaction_id === reaction.id);

      if (answer)
        reaction.repliesCount = parseInt(answer.reaction_repliesCount, 10);
      else
        reaction.repliesCount = 0;
    });

    return reactions;
  }

  async addShortRepliesCounts(reactions: Reaction[]): Promise<Reaction[]> {
    if (!reactions.length)
      return [];

    const shortRepliesCounts = await this.shortReplyRepository.createQueryBuilder('short_reply')
      .select('"reactionId"')
      .addSelect('type')
      .addSelect('count(id)')
      .where('short_reply."reactionId" IN (' + reactions.map(r => r.id) + ')')
      .groupBy('type')
      .addGroupBy('"reactionId"')
      .getRawMany();

    const getShortRepliesCount = (reactionId: number, type: ShortReplyType): number => {
      const value = shortRepliesCounts.filter(src => src.reactionId === reactionId && src.type === type);

      if (!value.length)
        return 0;

      return parseInt(value[0].count, 10);
    };

    reactions.forEach(reaction => {
      reaction.shortRepliesCount = {
        APPROVE: getShortRepliesCount(reaction.id, ShortReplyType.APPROVE),
        REFUTE: getShortRepliesCount(reaction.id, ShortReplyType.REFUTE),
        SKEPTIC: getShortRepliesCount(reaction.id, ShortReplyType.SKEPTIC),
      };
    });

    return reactions;
  }

  async addUserShortReply(reaction: Reaction, user: User): Promise<Reaction> {
    const shortReply = await this.getShortReplyForUser(reaction, user);

    if (shortReply)
      reaction.userShortReply = shortReply.type;

    return reaction;
  }

  async setShortReply(reaction: Reaction, user: User, type: ShortReplyType) {
    const existingShortReply = await this.shortReplyRepository.findOne({
      where: {
        reaction,
        user,
      },
      relations: ['reaction', 'user'],
    });

    if (existingShortReply) {
      if (existingShortReply.type === type)
        return;

      await this.shortReplyRepository.update(existingShortReply.id, { type });
    } else {
      const shortRelpy = new ShortReply();

      shortRelpy.reaction = reaction;
      shortRelpy.user = user;
      shortRelpy.type = type;

      await this.shortReplyRepository.save(shortRelpy);
    }
  }

  async getShortReplyForUser(reaction: Reaction, user: User): Promise<ShortReply | undefined> {
    const shortReply = await this.shortReplyRepository.findOne({
      where: {
        reaction,
        user,
      },
      relations: ['reaction', 'user'],
    });

    if (!shortReply)
      return;

    return shortReply;
  }

  async create(
    information: Information,
    dto: CreateReactionInDto,
    user: User,
    parent?: Reaction,
  ): Promise<Reaction> {
    const reaction = new Reaction();
    const message = new Message();

    reaction.information = information;
    reaction.author = user;

    reaction.slug = this.slugService.randString();
    reaction.quote = dto.quote;
    reaction.label = dto.label;

    message.text = dto.text;

    reaction.messages = [message];

    if (parent)
      reaction.parent = parent;

    await this.messageRepository.save(message);

    return await this.reactionRepository.save(reaction);
  }

  async update(
    reaction: Reaction,
    dto: UpdateReactionInDto,
  ): Promise<Reaction> {
    if (dto.text) {
      const message = new Message();

      message.text = dto.text;
      reaction.messages.push(message);
      reaction.updated = new Date();

      await this.messageRepository.save(message);
    }

    if (dto.quote)
      reaction.quote = dto.quote;

    return await this.reactionRepository.save(reaction);
  }

}
