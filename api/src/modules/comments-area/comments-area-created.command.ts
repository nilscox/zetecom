import { User } from 'src/modules/user/user.entity';

import { CommentsArea } from './comments-area.entity';

export class CommentsAreaCreatedCommand {
  constructor(public readonly commentsArea: CommentsArea, public readonly moderator: User) {}
}
