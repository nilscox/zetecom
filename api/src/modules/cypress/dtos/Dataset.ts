import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { CommentsAreaDto } from './CommentsArea';
import { UserDto } from './User';

export class Dataset {

  @IsOptional()
  @ValidateNested()
  @Type(() => CommentsAreaDto)
  commentsAreas?: CommentsAreaDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  users?: UserDto[];

}
