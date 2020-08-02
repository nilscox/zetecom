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
  parent?: Comment;
  text?: string;
  history?: string[];
};

@Injectable()
export class CommentFactory implements Factory<CommentFactoryData, Comment> {
  constructor(
    private readonly commentService: CommentService,
    private readonly userFactory: UserFactory,
    private readonly informationFactory: InformationFactory
  ) {}

  async create(data: CommentFactoryData = {}) {
    const getInformation = async () => {
      return data.information || await this.informationFactory.create();
    };

    const getAuthor = async () => {
      return data.author || await this.userFactory.create();
    };

    const comment = await this.commentService.create(
      {
        informationId: (await getInformation()).id,
        parentId: data.parent?.id,
        text: data.text || 'comment text',
      },
      await getAuthor(),
      await getInformation()
    );

    if (data.history) {
      for (const text of data.history)
        await this.commentService.update(comment, { text });
    }

    return comment;
  }
}
