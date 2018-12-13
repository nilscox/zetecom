import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { labelId } from 'Utils/labels';

import { User } from 'User/entities/user.entity';
import { Information } from '../entities/information.entity';
import { Reaction } from '../entities/reaction.entity';
import { Message } from '../entities/message.entity';
import { SlugService } from '../services/slug.service';
import { PaginationService } from '../services/pagination.service';
import { CreateReactionDto } from '../dtos/CreateReactionDto';
import { UpdateReactionDto } from '../dtos/UpdateReactionDto';

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

    await this.addAnswersCounts([result]);

    return result;
  }

  async findAnswers(reaction: Reaction, page: number = 1): Promise<Reaction[]> {
    return this.addAnswersCounts(await this.reactionRepository.find({
      where: { parent: reaction },
      ...this.paginationService.paginationOptions(page),
    }));
  }

  async addAnswersCounts(reactions: Reaction[]): Promise<Reaction[]> {
    if (!reactions.length)
      return [];

    const answersCounts = await this.reactionRepository.createQueryBuilder('reaction')
      .select('reaction.id')
      .addSelect('count(answers.id)', 'reaction_answersCount')
      .leftJoin('reaction.answers', 'answers')
      .where('answers."parentId" IN (' + reactions.map(r => r.id) + ')')
      .groupBy('reaction.id')
      .getRawMany();

    reactions.forEach(reaction => {
      const answer = answersCounts.find(a => a.reaction_id === reaction.id);

      if (answer)
        reaction.answersCount = parseInt(answer.reaction_answersCount, 10);
      else
        reaction.answersCount = 0;
    });

    return reactions;
  }

  async create(
    information: Information,
    createReactionDto: CreateReactionDto,
    user: User,
    parent?: Reaction,
  ): Promise<Reaction> {
    const reaction = new Reaction();
    const message = new Message();

    reaction.information = information;
    reaction.author = user;

    reaction.slug = this.slugService.randString();
    reaction.quote = createReactionDto.quote;
    reaction.label = labelId(createReactionDto.label);

    message.text = createReactionDto.text;

    reaction.messages = [message];

    if (parent)
      reaction.parent = parent;

    await this.messageRepository.save(message);

    return await this.reactionRepository.save(reaction);
  }

  async update(
    reaction: Reaction,
    updateReacitonDto: UpdateReactionDto,
  ): Promise<Reaction> {
    if (updateReacitonDto.text) {
      const message = new Message();

      message.text = updateReacitonDto.text;
      reaction.messages.push(message);
      reaction.updated = new Date();

      await this.messageRepository.save(message);
    }

    if (updateReacitonDto.quote)
      reaction.quote = updateReacitonDto.quote;

    return await this.reactionRepository.save(reaction);
  }

}
