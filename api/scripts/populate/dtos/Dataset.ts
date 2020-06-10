import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { InformationDto } from './Information';
import { UserDto } from './User';

export class Dataset {

  @ValidateNested()
  @Type(() => InformationDto)
  informations: InformationDto[];

  @ValidateNested()
  @Type(() => UserDto)
  users: UserDto[];

}
