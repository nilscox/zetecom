import { Expose } from 'class-transformer';

export class UserLightOutDto {

  @Expose()
  id: number;

  @Expose()
  nick: string;

  @Expose()
  avatar: string | null;

}
