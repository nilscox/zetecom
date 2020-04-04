import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { Information } from './Information';
import { User } from './User';

export class Dataset {

  @ValidateNested()
  @Type(() => Information)
  informations: Information[];

  @ValidateNested()
  @Type(() => User)
  users: User[];

}
