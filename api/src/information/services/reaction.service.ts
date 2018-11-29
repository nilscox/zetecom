import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { labelId } from 'Utils/labels';

import { User } from 'User/entities/user.entity';
import { Information } from '../entities/information.entity';
import { Reaction } from '../entities/reaction.entity';
import { Message } from '../entities/message.entity';
import { SlugService } from '../services/slug.service';
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
  ) {}

  async findOne(where): Promise<Reaction> {
    return await this.reactionRepository.findOne({ where, relations: ['answers'] });
  }

  async create(
    information: Information,
    createReactionDto: CreateReactionDto,
    user: User,
    parent?: Reaction,
  ): Promise<Reaction> {
    const reaction = new Reaction();

    Object.assign(reaction, {
      createReactionDto,
      slug: this.slugService.randString(),
      label: labelId(createReactionDto.label),
    });

    reaction.information = information;
    reaction.author = user;

    const message = new Message();

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
      reaction.quote = updateReacitonDto.text;

    return await this.reactionRepository.save(reaction);
  }

}
