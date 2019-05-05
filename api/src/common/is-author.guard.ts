import { Injectable, CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ReactionService } from 'src/modules/reaction/reaction.service';

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
    const reaction = await this.reactionService.findOne(reactionId);

    if (!reaction)
      return true;

    if (reaction.author.id !== request.user.id)
      return false;

    return true;
  }

}
