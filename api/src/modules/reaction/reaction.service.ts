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
import { CreateReactionInDto } from './dtos/create-reaction-in.dto';
import { UpdateReactionInDto } from './dtos/update-reaction-in.dto';

@Injectable()
export class ReactionService {

  constructor(

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    private readonly slugService: SlugService,
    private readonly paginationService: PaginationService,

  ) {}

  async findOne(where): Promise<Reaction> {
    const result = await this.reactionRepository.findOne(where);

    if (!result)
      return null;

    await this.addRepliesCounts([result]);

    return result;
  }

  async findReplies(reaction: Reaction, page: number = 1): Promise<Reaction[]> {
    const reactions = await this.reactionRepository.find({
      where: { parent: reaction },
      ...this.paginationService.paginationOptions(page),
    });

    return this.addRepliesCounts(reactions);
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
    reaction.label = labelId(dto.label);

    reaction.repliesCount = 0;

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
