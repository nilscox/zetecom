import { Expose, Type } from 'class-transformer';

import { UserLightDto } from '../../../user/dtos/user-ligth.dto';
import { User } from '../../../user/user.entity';

export class ReportDto {

  constructor(partial: Partial<ReportDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  @Type(() => UserLightDto)
  reportedBy: User;

  @Expose()
  message: string;

  @Expose()
  created: Date;

}
