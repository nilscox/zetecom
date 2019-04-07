import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';

import { ReactionSortType } from 'Utils/reaction-sort-type';

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

  async find(where: FindConditions<Reaction>, sort: ReactionSortType, page: number = 1): Promise<Reaction[]> {
    if (sort === ReactionSortType.RELEVANCE)
      return this.findSortedByRelevance(where, page);

    return this.reactionRepository.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author', 'reaction.author_id = author.id')
      .leftJoinAndSelect('reaction.messages', 'message', 'message.reaction_id = reaction.id')
      .where(where)
      .orderBy('reaction.created', sort === ReactionSortType.DATE_ASC ? 'ASC' : 'DESC')
      .addOrderBy('message.created', 'ASC')
      .getMany();
      // ...this.paginationService.paginationOptions(page),
  }

  private async findSortedByRelevance(where: FindConditions<Reaction>, page: number = 1): Promise<Reaction[]> {
    const reactions = await this.reactionRepository.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author', 'reaction.author_id = author.id')
      .leftJoinAndSelect('reaction.messages', 'message', 'message.reaction_id = reaction.id')
      .where(where)
      .orderBy('reaction.created', 'ASC')
      .addOrderBy('message.created', 'ASC')
      .getMany();

    await this.addRepliesCounts(reactions);
    await this.addShortRepliesCounts(reactions);

    reactions.forEach((r: any) => {
      r.relevance =
        + r.shortRepliesCount.APPROVE
        + r.shortRepliesCount.REFUTE
        + r.shortRepliesCount.SKEPTIC
        + 2 * r.repliesCount;
    });

    reactions.sort((a: any, b: any) => b.relevance - a.relevance);

    return reactions;
  }

  async addRepliesCounts(reactions: Reaction[]): Promise<Reaction[]> {
    if (!reactions.length)
      return [];

    const repliesCounts = await this.reactionRepository.createQueryBuilder('reaction')
      .select('reaction.id')
      .addSelect('count(replies.id)', 'reaction_repliesCount')
      .leftJoin('reaction.replies', 'replies')
      .where('replies.parent_id IN (' + reactions.map(r => r.id) + ')')
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
      .select('reaction_id')
      .addSelect('type')
      .addSelect('count(id)')
      .where('short_reply.reaction_id IN (' + reactions.map(r => r.id) + ')')
      .groupBy('type')
      .addGroupBy('reaction_id')
      .getRawMany();

    const getShortRepliesCount = (reactionId: number, type: ShortReplyType): number => {
      const value = shortRepliesCounts.filter(src => src.reaction_id === reactionId && src.type === type);

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

  async addUserShortReply(reactions: Reaction[], user: User): Promise<Reaction[]> {
    const shortReplies = await this.shortReplyRepository.createQueryBuilder('short_reply')
      .select('reaction_id')
      .addSelect('type')
      .where('short_reply.reaction_id IN (' + reactions.map(r => r.id) + ')')
      .andWhere('short_reply.user_id = ' + user.id)
      .groupBy('type')
      .addGroupBy('reaction_id')
      .getRawMany();

    reactions.forEach((reaction, i) => {
      const shortReply = shortReplies.find(sr => sr.reaction_id === reaction.id);

      reaction.userShortReply = shortReply ? shortReply.type : null;
    });

    return reactions;
  }

  async setShortReply(reaction: Reaction, user: User, type: ShortReplyType | null) {
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
