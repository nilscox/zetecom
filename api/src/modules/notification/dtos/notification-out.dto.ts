import { Expose, Transform, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';
import { NotificationType } from '../notification.entity';

class NotificationPayload {}

class RulesUpdatePayload extends NotificationPayload {
  @Expose()
  version: string;
}

class SubscriptionReplyPayload extends NotificationPayload {

  @Expose()
  informationId: number;

  @Expose()
  reactionId: number;

  @Expose()
  replyId: number;

  @Expose()
  @Type(() => UserLightOutDto)
  author: UserLightOutDto;

  @Expose()
  text: string;
}

const mapNotificationTypePayload = {
  [NotificationType.RULES_UPDATE]: RulesUpdatePayload,
  [NotificationType.SUBSCRIPTION_REPLY]: SubscriptionReplyPayload,
};

export class NotificationOutDto {

  @Expose()
  id: number;

  @Expose()
  type: NotificationType;

  @Expose()
  @Type(({ object }: any) => mapNotificationTypePayload[object.type])
  payload: NotificationPayload;

  @Expose()
  @Transform(value => value || false)
  seen: Date | false;

  @Expose()
  created: string;

}
