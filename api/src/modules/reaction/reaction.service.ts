import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Information } from '../information/information.entity';
import { SubscriptionService } from '../subscription/subscription.service';
import { User } from '../user/user.entity';

import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';
import { Message } from './message.entity';
import { QuickReaction, QuickReactionType } from './quick-reaction.entity';
import { Reaction } from './reaction.entity';
import { ReactionRepository } from './reaction.repository';

@Injectable()
export class ReactionService {

  constructor(

    private readonly reactionRepository: ReactionRepository,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(QuickReaction)
    private readonly quickReactionRepository: Repository<QuickReaction>,

    private readonly subscriptionService: SubscriptionService,

  ) {}

  async findById(id: number): Promise<Reaction> {
    return this.reactionRepository.findOne(id);
  }

  async create(dto: CreateReactionInDto, user: User, information: Information): Promise<Reaction> {
    let parent: Reaction | null = null;

    if (dto.parentId) {
      parent = await this.reactionRepository.findOne({ id: dto.parentId });

      if (!parent) {
        throw new BadRequestException(`standalone reaction with id ${dto.parentId} not found`);
      }
    }

    const reaction = new Reaction();
    const message = new Message();

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

    if (dto.parentId) {
      await this.reactionRepository.incrementScore(dto.parentId, 2);

      // perform notification logic asynchronously (no await)
      this.subscriptionService.notifyReply(reaction);
    }

    await this.subscriptionService.subscribe(user, reaction);

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

      if (existingQuickReaction.type === null && type !== null)
        await this.reactionRepository.incrementScore(reaction.id);

      if (existingQuickReaction.type !== null && type === null)
        await this.reactionRepository.decrementScore(reaction.id);
    } else {
      if (type === null)
        return;

      const quickReaction = new QuickReaction();

      quickReaction.reaction = reaction;
      quickReaction.user = user;
      quickReaction.type = type;

      await this.quickReactionRepository.save(quickReaction);

      await this.reactionRepository.incrementScore(reaction.id);
    }
  }

}
