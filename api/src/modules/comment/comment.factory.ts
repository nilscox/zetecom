import { Injectable } from '@nestjs/common';

import { Factory } from '../../testing/factory';
import { Information } from '../information/information.entity';
import { InformationFactory } from '../information/information.factory';
import { User } from '../user/user.entity';
import { UserFactory } from '../user/user.factory';

import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

type CommentFactoryData = {
  information?: Information;
  author?: User;
  text?: string;
};

@Injectable()
export class CommentFactory implements Factory<CommentFactoryData, Comment> {
  constructor(
    private readonly commentService: CommentService,
    private readonly userFactory: UserFactory,
    private readonly informationFactory: InformationFactory,
  ) {}

  async create(data: CommentFactoryData = {}) {
    const getInformation = async () => {
      return data.information || await this.informationFactory.create();
    };

    const getAuthor = async () => {
      return data.author || await this.userFactory.create();
    };

    return this.commentService.create(
      await getInformation(),
      await getAuthor(),
      data.text || 'comment text',
    );
  }
}
