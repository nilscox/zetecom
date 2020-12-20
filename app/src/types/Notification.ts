import { plainToClass, Transform, Type } from 'class-transformer';
import { TransformationType } from 'class-transformer/enums';

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

export type NotificationType = 'rulesUpdate' | 'subscriptionReply';

const transformNotificationPayload = (
  value: unknown,
  { type }: Notification<NotificationType>,
  transform: TransformationType,
) => {
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
};

type MapNotificationPayload = {
  rulesUpdate: RulesUpdatePayload;
  subscriptionReply: SubscriptionReplyPayload;
};

export class Notification<T extends NotificationType> {
  id: number;

  type: T;

  created: Date;

  @Transform(value => value !== false && new Date(value))
  seen: Date | false;

  @Transform(transformNotificationPayload)
  payload: MapNotificationPayload[T];
}

export class NotificationsCount {
  count: number;
}
