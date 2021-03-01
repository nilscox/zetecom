import { NotificationType } from './notification-type';

export interface RulesUpdateNotificationPayload {
  version: string;
}

export interface SubscriptionReplyNotificationPayload {
  commentsAreaId: number;
  commentsAreaTitle: string;
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
  [NotificationType.COMMENTS_AREA_REQUEST_APPROVED]: CommentsAreaRequestApprovedPayload;
  [NotificationType.COMMENTS_AREA_REQUEST_REJECTED]: CommentsAreaRequestRejectedPayload;
};
