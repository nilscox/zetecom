import { Expose, Transform, Type } from 'class-transformer';

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
  commentsAreaTitle: string;

  @Expose()
  commentsAreaImageUrl: string;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Type(({ object }: Record<string, any>) => mapNotificationTypePayload[object.type])
  payload: NotificationPayload;

  @Expose()
  @Transform((value) => value || false)
  seen: Date | false;

  @Expose()
  created: Date;
}
