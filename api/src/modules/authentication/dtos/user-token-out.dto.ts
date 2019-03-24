import { Expose, Type } from 'class-transformer';

import { UserOutDto } from '../../user/dtos/user-out.dto';

export class UserTokenOutDto {
  @Expose()
  token: string;

  @Expose()
  @Type(() => UserOutDto)
  user: UserOutDto;
}
