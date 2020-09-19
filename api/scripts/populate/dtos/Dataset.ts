import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CommentsAreaDto } from './CommentsArea';
import { UserDto } from './User';

export class Dataset {

  @ValidateNested()
  @Type(() => CommentsAreaDto)
  commentsAreas: CommentsAreaDto[];

  @ValidateNested()
  @Type(() => UserDto)
  users: UserDto[];

}
