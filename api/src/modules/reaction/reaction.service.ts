import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Subject } from '../subject/subject.entity';
import { ReactionRepository } from './reaction.repository';
import { Message } from './message.entity';
import { Reaction } from './reaction.entity';
import { QuickReaction, QuickReactionType } from './quick-reaction.entity';
import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { InformationRepository } from '../information/information.repository';

@Injectable()
export class ReactionService {

  constructor(

    private readonly informationRepository: InformationRepository,

    private readonly reactionRepository: ReactionRepository,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(QuickReaction)
    private readonly quickReactionRepository: Repository<QuickReaction>,

  ) {}

  async findById(id: number): Promise<Reaction> {
    return this.reactionRepository.findOne(id);
  }

  async create(dto: CreateReactionInDto, user: User, subject: Subject = null): Promise<Reaction> {
    const information = await this.informationRepository.findOne(dto.informationId);

    if (!information)
      throw new BadRequestException(`information with id ${information.id} does not exist`);

    if (subject && subject.information.id !== information.id)
      throw new BadRequestException(`subject with id ${subject.id} does not belong to the information with id ${information.id}`);

    let parent: Reaction | null = null;

    if (dto.parentId) {
      parent = await this.reactionRepository.findOne({
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

  async addRepliesCounts(reactions: Reaction[]): Promise<Reaction[]> {
    if (!reactions.length)
      return [];

    const repliesCounts = await this.reactionRepository.getRepliesCounts(reactions.map(r => r.id));

    reactions.forEach(reaction => {
      const reply = repliesCounts.find(r => r.reactionId === reaction.id);

      if (reply)
        reaction.repliesCount = reply.repliesCount;
      else
        reaction.repliesCount = 0;
    });

    return reactions;
  }

  async addQuickReactionsCounts(reactions: Reaction[]): Promise<Reaction[]> {
    if (!reactions.length)
      return [];

    const quickReactionsCounts = await this.reactionRepository.getQuickReactionsCounts(reactions.map(r => r.id));

    const getQuickReactionsCount = (reactionId: number, type: QuickReactionType): number => {
      return quickReactionsCounts.find(qrc => qrc.reactionId === reactionId).quickReactions[type];
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
    const quickReactions = await this.reactionRepository.getQuickReactionForUser(reactions.map(r => r.id), user.id);

    reactions.forEach((reaction) => {
      const quickReaction = quickReactions.find(qr => qr.reactionId === reaction.id);

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

}
