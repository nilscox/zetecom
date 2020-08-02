import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { CommentService } from '../modules/comment/comment.service';

@Injectable()
export class IsAuthor implements CanActivate {

  constructor(
    private readonly commentService: CommentService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const commentId = request.param('id');
    const comment = await this.commentService.findById(commentId);

    if (!comment)
      return true;

    if (comment.author.id !== request.user.id)
      return false;

    return true;
  }

}

@Injectable()
export class IsNotAuthor implements CanActivate {

  constructor(
    private readonly commentService: CommentService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user)
      return true;

    const commentId = request.param('id');
    const comment = await this.commentService.findById(commentId);

    if (!comment)
      return true;

    if (comment.author.id === request.user.id)
      return false;

    return true;
  }

}
