import { Expose, Type } from 'class-transformer';

import { SubscriptionOutDto } from '../../subscription/dtos/subscription-out.dto';
import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';

export class NotificationOutDto {

  @Expose()
  id: number;

  @Expose()
  created: Date;

  @Expose()
  @Type(() => UserLightOutDto)
  actor: UserLightOutDto;

  @Expose()
  @Type(() => SubscriptionOutDto)
  subscription: SubscriptionOutDto;

  constructor(values: any) {
    Object.assign(this, values);

    if (values.subscription)
      this.subscription = new SubscriptionOutDto(values.subscription);

    if (values.actor)
      this.actor = new UserLightOutDto(values.actor);
  }

}
