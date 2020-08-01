import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from '../comment.entity';

import { Message } from './message.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(comment: Comment, text: string) {
    const message = this.messageRepository.create({ comment, text });

    return this.messageRepository.save(message);
  }

}
