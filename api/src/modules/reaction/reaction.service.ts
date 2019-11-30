import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { Subject } from '../subject/subject.entity';
import { Message } from './message.entity';
import { Reaction } from './reaction.entity';
import { Report, ReportType } from './report.entity';
import { QuickReaction, QuickReactionType } from './quick-reaction.entity';
import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';

@Injectable()
export class ReactionService {

  constructor(

    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(QuickReaction)
    private readonly quickReactionRepository: Repository<QuickReaction>,

    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,

  ) {}

  async findOne(where): Promise<Reaction> {
    const result = await this.reactionRepository.findOne(where);

    if (!result)
      return null;

    return result;
  }

  private static sortByRelevance(reactions: Reaction[]) {
    const sumQuickReacitonsCount = ({ quickReactionsCount: r }: Reaction) => {
      return r.APPROVE + r.REFUTE + r.SKEPTIC;
    };

    const scores = reactions
      .map(r => r.repliesCount + sumQuickReacitonsCount(r))
      .reduce((acc, score, idx) => ({ ...acc, [reactions[idx].id]: score }), {});

    reactions.sort((a, b) => scores[b.id] - scores[a.id]);
  }

  async findStandaloneRootReactions(information: Information, search: string, sort: SortType, page: number = 1): Promise<Reaction[]> {
    let query = this.reactionRepository.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author', 'reaction.author_id = author.id')
      .leftJoinAndSelect('reaction.messages', 'message', 'message.reaction_id = reaction.id')
      .where('reaction.information_id = :informationId', { informationId: information.id })
      .andWhere('reaction.subject_id IS NULL');

    if (!search)
      query = query.andWhere('reaction.parent_id IS NULL');
    else
      query = query.andWhere('message.text ILIKE :search', { search: `%${search}%` });

    query = query
      .orderBy('reaction.created', sort === SortType.DATE_DESC ? 'DESC' : 'ASC')
      .addOrderBy('message.created', 'ASC');

    const reactions = await query.getMany();

    await this.addQuickReactionsCounts(reactions);
    await this.addRepliesCounts(reactions);

    if (sort === SortType.RELEVANCE)
      ReactionService.sortByRelevance(reactions);

    return reactions;
  }

  async findRootReactions(subject: Subject, sort: SortType, page: number = 1): Promise<Reaction[]> {
    const reactions = await this.reactionRepository.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author', 'reaction.author_id = author.id')
      .leftJoinAndSelect('reaction.messages', 'message', 'message.reaction_id = reaction.id')
      .where('reaction.subject_id = ' + subject.id)
      .andWhere('reaction.parent_id IS NULL')
      .orderBy('reaction.created', sort === SortType.DATE_DESC ? 'DESC' : 'ASC')
      .addOrderBy('message.created', 'ASC')
      .getMany();

    await this.addQuickReactionsCounts(reactions);
    await this.addRepliesCounts(reactions);

    if (sort === SortType.RELEVANCE)
      ReactionService.sortByRelevance(reactions);

    return reactions;
  }

  async findReplies(parentId: number): Promise<Reaction[]> {
    return this.reactionRepository.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author', 'reaction.author_id = author.id')
      .leftJoinAndSelect('reaction.messages', 'message', 'message.reaction_id = reaction.id')
      .where('reaction.parent_id = ' + parentId)
      .orderBy('reaction.created')
      .addOrderBy('message.created', 'ASC')
      .getMany();
  }

  async create(dto: CreateReactionInDto, user: User, subject: Subject = null): Promise<Reaction> {
    const information = await this.informationRepository.findOne(dto.informationId);

    if (!information)
      throw new BadRequestException(`information with id ${information.id} does not exist`);

    if (subject && subject.information.id !== information.id)
      throw new BadRequestException(`subject with id ${subject.id} does not belong to the information with id ${information.id}`);

    let parent: Reaction | null = null;

    if (dto.parentId) {
      parent = await this.findOne({
        id: dto.parentId,
        subject,
      });

      if (!parent) {
        if (subject)
          throw new BadRequestException(`reaction with id ${dto.parentId} and subject ${subject} not found`);
        else
          throw new BadRequestException(`standalone reaction with id ${dto.parentId} not found`);
      }
    }

    const reaction = new Reaction();
    const message = new Message();

    reaction.subject = subject;
    reaction.author = user;
    reaction.information = information;

    message.text = dto.text;
    reaction.messages = [message];

    if (parent)
      reaction.parent = parent;

    await this.messageRepository.save(message);
    await this.reactionRepository.save(reaction);

    // code smell
    reaction.repliesCount = 0;
    reaction.quickReactionsCount = {
      APPROVE: 0,
      REFUTE: 0,
      SKEPTIC: 0,
    };
    reaction.userQuickReaction = null;

    return reaction;
  }

  async update(reaction: Reaction, dto: UpdateReactionInDto): Promise<Reaction> {
    if (dto.text) {
      const message = new Message();

      message.text = dto.text;
      reaction.messages.push(message);
      reaction.updated = new Date();

      await this.messageRepository.save(message);
    }

    return await this.reactionRepository.save(reaction);
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
      const reply = repliesCounts.find(r => r.reaction_id === reaction.id);

      if (reply)
        reaction.repliesCount = parseInt(reply.reaction_repliesCount, 10);
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

}
