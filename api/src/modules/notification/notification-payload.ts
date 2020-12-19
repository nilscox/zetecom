import { NotificationType } from './notification-type';

export interface RulesUpdateNotificationPayload {
  version: string;
}

export interface SubscriptionReplyNotificationPayload {
  commentsAreaId: number;
  commentsAreaImageUrl: string;
  commentsAreaTitle: string;
  commentId: number;
  replyId: number;
  author: { id: number; nick: string; avatar?: string };
  text: string;
}

export type NotificationPayload = {
  [NotificationType.RULES_UPDATE]: RulesUpdateNotificationPayload;
  [NotificationType.SUBSCRIPTION_REPLY]: SubscriptionReplyNotificationPayload;
};
