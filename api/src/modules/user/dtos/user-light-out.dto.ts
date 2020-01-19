import { Expose, Type } from 'class-transformer';

export class UserLightOutDto {

  @Expose()
  id: number;

  @Expose()
  nick: string;

  @Expose()
  avatar: string | null;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
