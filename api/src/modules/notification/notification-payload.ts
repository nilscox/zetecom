import { NotificationType } from './notification-type';

export interface RulesUpdateNotificationPayload {
  version: string;
}

export interface SubscriptionReplyNotificationPayload {
  commentsAreaId: number;
  commentId: number;
  replyId: number;
  author: { id: number; nick: string; avatar?: string };
  text: string;
}

export interface CommentsAreaRequestApprovedPayload {
  requestedInformationUrl: string;
  commentsAreaId: number;
  commentsAreaTitle: string;
}

export interface CommentsAreaRequestRejectedPayload {
  requestId: number;
  requestedInformationUrl: string;
  reason?: string;
}

export type NotificationPayload = {
  [NotificationType.RULES_UPDATE]: RulesUpdateNotificationPayload;
  [NotificationType.SUBSCRIPTION_REPLY]: SubscriptionReplyNotificationPayload;
};
