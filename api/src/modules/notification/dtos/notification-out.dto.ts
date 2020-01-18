import { Expose, Type } from 'class-transformer';

import { SubscriptionOutDto } from '../../subscription/dtos/subscription-out.dto';

export class NotificationOutDto {

  @Expose()
  id: number;

  @Expose()
  created: Date;

  @Expose()
  @Type(() => SubscriptionOutDto)
  subscription: SubscriptionOutDto;

  constructor(values: any) {
    Object.assign(this, values);

    if (values.subscription)
      this.subscription = new SubscriptionOutDto(values.subscription);
  }

}
