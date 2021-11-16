import { Notification, NotificationPayload, NotificationType } from '@zetecom/app-core';

import { APIUserLightDto } from './APIUserDto';

enum APINotificationType {
  RULES_UPDATE = 'rulesUpdate',
  SUBSCRIPTION_REPLY = 'subscriptionReply',
}

type APIRulesUpdatePayloadDto = {
  version: string;
};

type APISubscriptionReplyPayloadDto = {
  commentsAreaId: number;
  commentsAreaTitle: string;
  commentId: number;
  replyId: number;
  author: APIUserLightDto;
  text: string;
};

type APINotificationPayload = APIRulesUpdatePayloadDto | APISubscriptionReplyPayloadDto;

export type APINotificationDto = {
  id: number;
  type: APINotificationType;
  payload: APINotificationPayload;
  seen: Date | false;
  created: Date;
};

const mapNotificationType = {
  [APINotificationType.RULES_UPDATE]: NotificationType.rulesUpdated,
  [APINotificationType.SUBSCRIPTION_REPLY]: NotificationType.commentReply,
};

const transformNotificationPayload = (
  type: APINotificationType,
  payload: APINotificationPayload,
): NotificationPayload[NotificationType] => {
  if (type === APINotificationType.RULES_UPDATE) {
    return payload as NotificationPayload[NotificationType.rulesUpdated];
  }

  const p = payload as APISubscriptionReplyPayloadDto;

  return {
    text: p.text,
    commentsAreaId: String(p.commentsAreaId),
    informationTitle: p.commentsAreaTitle,
    authorNick: p.author.nick,
  } as NotificationPayload[NotificationType.commentReply];
};

export const transformNotification = (dto: APINotificationDto): Notification => ({
  ...dto,
  id: String(dto.id),
  type: mapNotificationType[dto.type],
  date: new Date(dto.created),
  seen: dto.seen ? new Date(dto.seen) : false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: transformNotificationPayload(dto.type, dto.payload) as any,
});
