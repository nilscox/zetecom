import { User } from '../user/user.entity';

import { CommentsArea } from './comments-area.entity';

export class CommentsAreaCreatedCommand {
  constructor(public readonly commentsArea: CommentsArea, public readonly moderator: User) {}
}
