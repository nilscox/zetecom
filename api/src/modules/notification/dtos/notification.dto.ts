import { Expose, Type } from 'class-transformer';

import { UserLightDto } from '../../user/dtos/user-ligth.dto';
import { NotificationType } from '../notification-type';

import { NotificationsCountDto } from './notifications-count.dto';

class RulesUpdatePayloadDto {
  @Expose()
  version: string;
}

class SubscriptionReplyPayloadDto {

  @Expose()
  commentsAreaId: number;

  @Expose()
  commentId: number;

  @Expose()
  replyId: number;

  @Expose()
  @Type(() => UserLightDto)
  author: UserLightDto;

  @Expose()
  text: string;
}

type NotificationPayload = RulesUpdatePayloadDto | SubscriptionReplyPayloadDto;

const mapNotificationTypePayload = {
  [NotificationType.RULES_UPDATE]: RulesUpdatePayloadDto,
  [NotificationType.SUBSCRIPTION_REPLY]: SubscriptionReplyPayloadDto,
};

export class NotificationDto {
  constructor(partial: Partial<NotificationsCountDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  type: NotificationType;

  @Expose()
  @Type(({ object }: any) => mapNotificationTypePayload[object.type])
  payload: NotificationPayload;

  @Expose()
  seen: Date | false;

  @Expose()
  created: Date;

}
