import { createId } from '../shared/createId';

export enum NotificationType {
  rulesUpdated = 'rulesUpdated',
  commentReply = 'commentReply',
}

export type NotificationPayload = {
  [NotificationType.rulesUpdated]: {
    version: string;
  };
  [NotificationType.commentReply]: {
    commentsAreaId: string;
    informationTitle: string;
    authorNick: string;
    text: string;
  };
};

export type NotificationDto<T extends NotificationType = NotificationType> = {
  id: string;
  type: T;
  date: Date;
  seen: Date | false;
  payload: NotificationPayload[T];
};

export type Notification<T extends NotificationType = NotificationType> = NotificationDto<T>;

export const createNotification = <T extends NotificationType>(
  overrides: Partial<Notification<T>> = {},
): Notification<T> => ({
  id: createId(),
  type: NotificationType.rulesUpdated as T,
  date: new Date(),
  seen: false,
  payload: { version: '' } as NotificationPayload[T],
  ...overrides,
});
