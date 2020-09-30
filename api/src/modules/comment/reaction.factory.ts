import { Injectable } from '@nestjs/common';

import { Factory } from '../../testing/factory';
import { User } from '../user/user.entity';
import { UserFactory } from '../user/user.factory';

import { Comment } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { CommentService } from './comment.service';
import { Reaction, ReactionType } from './reaction.entity';

type ReactionFactoryData = {
  comment?: Comment;
  user?: User;
  type: ReactionType;
};

@Injectable()
export class ReactionFactory implements Factory<ReactionFactoryData, Reaction | null> {
  constructor(
    private readonly commentService: CommentService,
    private readonly userFactory: UserFactory,
    private readonly commentFactory: CommentFactory
  ) {}

  async create(data: ReactionFactoryData) {
    return this.commentService.setReaction(
      data.comment || await this.commentFactory.create(),
      data.user || await this.userFactory.create(),
      data.type,
    );
  }
}
