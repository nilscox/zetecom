import { plainToClass, Transform, Type } from 'class-transformer';
import { TransformationType } from 'class-transformer/enums';

import { UserLight } from './User';

class RulesUpdatePayload {
  version: string;
}

class SubscriptionReplyPayload {
  commentsAreaId: number;

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

  getLink() {
    // if (this.type === 'rulesUpdate') {
    //   return { href: env.WEBSITE_URL + '/charte.html', external: true };
    // }
    // if (this.type === 'subscriptionReply') {
    //   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //   return { href: `/commentaires/${this.payload.commentsAreaId}`, external: false };
    // }
  }
}

export class NotificationsCount {
  count: number;
}
