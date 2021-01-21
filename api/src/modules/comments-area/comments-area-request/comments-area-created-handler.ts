import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommentsAreaCreatedCommand } from 'src/modules/comments-area/comments-area-created.command';

import { CommentsAreaRequestService } from './comments-area-request.service';

@CommandHandler(CommentsAreaCreatedCommand)
export class CommentsAreaCreatedHandler implements ICommandHandler<CommentsAreaCreatedCommand> {
  constructor(private readonly commentsAreaRequestService: CommentsAreaRequestService) {}

  async execute({ commentsArea, moderator }: CommentsAreaCreatedCommand): Promise<void> {
    await this.commentsAreaRequestService.approveAll(commentsArea, moderator);
  }
}
