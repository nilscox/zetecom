import { Expose } from 'class-transformer';

import { Role } from 'src/modules/authorization/roles.enum';

export class UserDto {
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  nick: string;

  @Expose()
  avatar: string;

  @Expose({ name: 'signupDate' })
  created: Date;

  @Expose()
  roles: Role[];
}
