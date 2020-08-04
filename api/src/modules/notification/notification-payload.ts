export interface RulesUpdateNotificationPayload {
  version: string;
}

export interface SubscriptionReplyNotificationPayload {
  informationId: number;
  commentId: number;
  replyId: number;
  author: { id: number; nick: string; avatar?: string };
  text: string;
}

export type NotificationPayload = RulesUpdateNotificationPayload | RulesUpdateNotificationPayload;
