import { UserLight } from './User';

type BaseNotification = {
  id: number;
  type: string;
  created: string;
  seen: string | false;
};

type RulesUpdateNotification = BaseNotification & {
  type: 'rulesUpdate';
  payload: {
    version: string;
  };
};

type SubscriptionReplyNotification = BaseNotification & {
  type: 'subscriptionReply';
  payload: {
    commentsAreaId: number;
    commentsAreaTitle: string;
    commentsAreaImageUrl: string;
    commentId: number;
    replyId: number;
    author: UserLight;
    text: string;
  };
};

type CommentsAreaRequestApprovedNotification = BaseNotification & {
  type: 'commentsAreaRequestApproved';
  payload: {
    requestedInformationUrl: string;
    commentsAreaId: number;
    commentsAreaImageUrl: string;
    commentsAreaTitle: string;
  };
};

type CommentsAreaRequestRejectedNotification = BaseNotification & {
  type: 'commentsAreaRequestRejected';
  payload: {
    requestId: number;
    requestedInformationUrl: string;
    reason?: string;
  };
};

export enum NotificationType {
  rulesUpdate,
  subscriptionReply,
  commentsAreaRequestApproved,
  commentsAreaRequestRejected,
}

export type Notification =
  | RulesUpdateNotification
  | SubscriptionReplyNotification
  | CommentsAreaRequestApprovedNotification
  | CommentsAreaRequestRejectedNotification;

export type NotificationsCount = {
  count: number;
};
