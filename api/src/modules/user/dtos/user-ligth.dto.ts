import { Exclude } from 'class-transformer';

import { UserDto } from './user.dto';

export class UserLightDto extends UserDto {
  constructor(partial: Partial<UserLightDto>) {
    super(partial);
  }

  @Exclude()
  email;

  @Exclude()
  created;
}
