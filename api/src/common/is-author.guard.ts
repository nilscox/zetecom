import { Injectable, CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ReactionService } from '../modules/reaction/reaction.service';

@Injectable()
export class IsAuthor implements CanActivate {

  constructor(
    private readonly reactionService: ReactionService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const reactionId = request.param('id');
    const reaction = await this.reactionService.findById(reactionId);

    if (!reaction)
      return true;

    if (reaction.author.id !== request.user.id)
      return false;

    return true;
  }

}

@Injectable()
export class IsNotAuthor implements CanActivate {

  constructor(
    private readonly reactionService: ReactionService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user)
      return true;

    const reactionId = request.param('id');
    const reaction = await this.reactionService.findById(reactionId);

    if (!reaction)
      return true;

    if (reaction.author.id === request.user.id)
      return false;

    return true;
  }

}
