import { Injectable } from '@nestjs/common';

import { Factory } from '../../testing/factory';
import { CommentsArea } from '../comments-area/comments-area.entity';
import { CommentsAreaFactory } from '../comments-area/comments-area.factory';
import { User } from '../user/user.entity';
import { UserFactory } from '../user/user.factory';

import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

type CommentFactoryData = {
  commentsArea?: CommentsArea;
  author?: User;
  parent?: Comment;
  text?: string;
};

@Injectable()
export class CommentFactory implements Factory<CommentFactoryData, Comment> {
  constructor(
    private readonly commentService: CommentService,
    private readonly userFactory: UserFactory,
    private readonly commentsAreaFactory: CommentsAreaFactory
  ) {}

  async create(a: number | CommentFactoryData = {}, b: CommentFactoryData = {}) {
    let n: number;
    let data: CommentFactoryData;

    if (typeof a === 'number') {
      n = a;
      data = b;
    } else {
      data = a;
    }

    const getCommentsArea = async () => {
      return data.commentsArea || await this.commentsAreaFactory.create();
    };

    const getAuthor = async () => {
      return data.author || await this.userFactory.create();
    };

    return this.commentService.create(
      await getAuthor(),
      await getCommentsArea(),
      data.parent || null,
      data.text || 'comment' + (n || ''),
    );
  }

  async edit(comment: Comment, text: string) {
    return this.commentService.update(comment, text);
  }
}
