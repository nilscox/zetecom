import { plainToClass, Transform, TransformFnParams, Type } from 'class-transformer';
import { TransformationType } from 'class-transformer';

import { UserLight } from './User';

class RulesUpdatePayload {
  version: string;
}

class SubscriptionReplyPayload {
  commentsAreaId: number;

  commentsAreaTitle: string;

  commentsAreaImageUrl: string;

  commentId: number;

  replyId: number;

  @Type(() => UserLight)
  author: UserLight;

  text: string;
}

class CommentsAreaRequestApprovedPayload {
  requestedInformationUrl: string;

  commentsAreaId: number;

  commentsAreaImageUrl: string;

  commentsAreaTitle: string;
}

class CommentsAreaRequestRejectedPayload {
  requestId: number;

  requestedInformationUrl: string;

  reason?: string;
}

type MapNotificationPayload = {
  rulesUpdate: RulesUpdatePayload;
  subscriptionReply: SubscriptionReplyPayload;
  commentsAreaRequestApproved: CommentsAreaRequestApprovedPayload;
  commentsAreaRequestRejected: CommentsAreaRequestRejectedPayload;
};

export type NotificationType = keyof MapNotificationPayload;

const transformNotificationPayload = ({ type: transform, value, obj: { type } }: TransformFnParams) => {
  if (transform === TransformationType.CLASS_TO_CLASS) {
    return value;
  }

  if (transform !== TransformationType.PLAIN_TO_CLASS) {
    throw new Error('cannot handle transform');
  }

  if (type === 'rulesUpdate') {
    return plainToClass(RulesUpdatePayload, value);
  }

  if (type === 'subscriptionReply') {
    return plainToClass(SubscriptionReplyPayload, value);
  }

  if (type === 'commentsAreaRequestApproved') {
    return plainToClass(CommentsAreaRequestApprovedPayload, value);
  }

  if (type === 'commentsAreaRequestRejected') {
    return plainToClass(CommentsAreaRequestRejectedPayload, value);
  }
};

export class Notification<T extends NotificationType> {
  id: number;

  type: T;

  created: Date;

  @Transform(value => typeof value === 'string' && new Date(value))
  seen: Date | false;

  @Transform(transformNotificationPayload)
  payload: MapNotificationPayload[T];
}

export class NotificationsCount {
  count: number;
}
