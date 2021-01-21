import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommentCreatedCommand } from 'src/modules/comment/comment-created.command';

import { SubscriptionService } from './subscription.service';

@CommandHandler(CommentCreatedCommand)
export class NotifySubscriptionReplyHandler implements ICommandHandler<CommentCreatedCommand> {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  async execute({ comment }: CommentCreatedCommand): Promise<void> {
    if (comment.parent) {
      await this.subscriptionService.notifyReply(comment);
    }
  }
}
