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
    const comment = await this.commentService.findOne(request.param('id'));

    return !!comment && this.commentService.isAuthor(comment, request.user);
  }

}

@Injectable()
export class IsNotAuthor implements CanActivate {

  constructor(
    private readonly isAuthor: IsAuthor,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    return !await this.isAuthor.canActivate(context);
  }

}
