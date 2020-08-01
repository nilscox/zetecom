import { Injectable } from '@nestjs/common';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { MessageService } from './message/message.service';

@Injectable()
export class CommentService {

  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly messageService: MessageService,
  ) {}

  findAll(informationId: number, authorId: number, search: string, offset: number, limit: number) {
    return this.commentRepository.findAll(informationId, authorId, search, offset, limit);
  }

  findOne(id: number) {
    return this.commentRepository.findOne(id);
  }

  async create(information: Information, author: User, message: string) {
    const comment = await this.commentRepository.save({ information, author });

    comment.message = await this.messageService.create(comment, message);

    return comment;
  }

  isAuthor(comment: Comment, user: User) {
    return comment.author.id === user.id;
  }

}
