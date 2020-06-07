import { Expose, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';

export class InformationOutDto {

  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  identifier: string;

  @Expose()
  url: string;

  @Expose()
  imageUrl: string;

  @Expose()
  @Type(() => Date)
  published: Date;

  @Expose()
  @Type(() => UserLightOutDto)
  creator: UserLightOutDto;

  @Expose()
  reactionsCount: number;

}
