import { Expose, Type } from 'class-transformer';

export class UserOutDto {

  @Expose()
  id: number;

  @Expose()
  nick: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string | null;

  @Expose()
  @Type(() => Date)
  created: Date;

}
