import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, FindConditions } from 'typeorm';

import { ReactionSortType } from 'Utils/reaction-sort-type';

import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { Information } from '../information/information.entity';
import { Message } from './message.entity';
import { PaginationService } from '../information/services/pagination.service';
import { Reaction } from './reaction.entity';
import { Report, ReportType } from './report.entity';
import { QuickReaction, QuickReactionType } from './quick-reaction.entity';
import { SlugService } from '../information/services/slug.service';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ReactionService {

  constructor(

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(QuickReaction)
    private readonly quickReactionRepository: Repository<QuickReaction>,

    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,

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
    await this.addQuickReactionsCounts(reactions);

    reactions.forEach((r: any) => {
      r.relevance =
        + r.quickReactionsCount.APPROVE
        + r.quickReactionsCount.REFUTE
        + r.quickReactionsCount.SKEPTIC
        + 2 * r.repliesCount;
    });

    reactions.sort((a: any, b: any) => b.relevance - a.relevance);

    return reactions;
  }

  async findReport(reaction: Reaction, user: User): Promise<Report> {
    return this.reportRepository.findOne({ reaction, user });
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

  async addQuickReactionsCounts(reactions: Reaction[]): Promise<Reaction[]> {
    if (!reactions.length)
      return [];

    const quickReactionsCounts = await this.quickReactionRepository.createQueryBuilder('quick_reaction')
      .select('reaction_id')
      .addSelect('type')
      .addSelect('count(id)')
      .where('quick_reaction.reaction_id IN (' + reactions.map(r => r.id) + ')')
      .groupBy('type')
      .addGroupBy('reaction_id')
      .getRawMany();

    const getQuickReactionsCount = (reactionId: number, type: QuickReactionType): number => {
      const value = quickReactionsCounts.filter(qrc => qrc.reaction_id === reactionId && qrc.type === type);

      if (!value.length)
        return 0;

      return parseInt(value[0].count, 10);
    };

    reactions.forEach(reaction => {
      reaction.quickReactionsCount = {
        APPROVE: getQuickReactionsCount(reaction.id, QuickReactionType.APPROVE),
        REFUTE: getQuickReactionsCount(reaction.id, QuickReactionType.REFUTE),
        SKEPTIC: getQuickReactionsCount(reaction.id, QuickReactionType.SKEPTIC),
      };
    });

    return reactions;
  }

  async addUserQuickReaction(reactions: Reaction[], user: User): Promise<Reaction[]> {
    const quickReactions = await this.quickReactionRepository.createQueryBuilder('quick_reaction')
      .select('reaction_id')
      .addSelect('type')
      .where('quick_reaction.reaction_id IN (' + reactions.map(r => r.id) + ')')
      .andWhere('quick_reaction.user_id = ' + user.id)
      .groupBy('type')
      .addGroupBy('reaction_id')
      .getRawMany();

    reactions.forEach((reaction, i) => {
      const quickReaction = quickReactions.find(sr => sr.reaction_id === reaction.id);

      reaction.userQuickReaction = quickReaction ? quickReaction.type : null;
    });

    return reactions;
  }

  async setQuickReaction(reaction: Reaction, user: User, type: QuickReactionType | null) {
    const existingQuickReaction = await this.quickReactionRepository.findOne({
      where: {
        reaction,
        user,
      },
      relations: ['reaction', 'user'],
    });

    if (existingQuickReaction) {
      if (existingQuickReaction.type === type)
        return;

      await this.quickReactionRepository.update(existingQuickReaction.id, { type });
    } else {
      const quickReaction = new QuickReaction();

      quickReaction.reaction = reaction;
      quickReaction.user = user;
      quickReaction.type = type;

      await this.quickReactionRepository.save(quickReaction);
    }
  }

  async report(reaction: Reaction, user: User, type: ReportType, message: string) {
    const report = new Report();

    report.reaction = reaction;
    report.user = user;
    report.type = type;
    report.message = message;

    await this.reportRepository.save(report);
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
