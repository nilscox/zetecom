import React from 'react';

import {
  createAuthenticatedUser,
  createNotification,
  markNotificationAsSeen,
  NotificationType,
  setAuthenticatedUser,
  Store,
} from '@zetecom/app-core';
import { setNotification, setUserNotifications } from '@zetecom/app-core/modules/notifications/actions';

import { Demo } from '~/demos';
import { nilscox, vaccinsEffetsSecondaires as commentsArea } from '~/fixtures';

import { Notification } from './Notification';

const rulesUpdatedNotification = createNotification({
  type: NotificationType.rulesUpdated,
  payload: {
    version: '3.8.6',
  },
});

const commentReplyNotification = createNotification({
  type: NotificationType.commentReply,
  payload: {
    commentsAreaId: commentsArea.id,
    informationTitle: commentsArea.information.title,
    authorNick: nilscox.nick,
    text: commentsArea.comments[0].replies[0].text,
  },
});

const prepare = ({ store }: { store: Store }) => {
  store.dispatch(setAuthenticatedUser(createAuthenticatedUser()));
  store.dispatch(setNotification(rulesUpdatedNotification, commentReplyNotification));
  store.dispatch(setUserNotifications([rulesUpdatedNotification, commentReplyNotification]));
};

export const commentReply: Demo = {
  description: 'Comment reply notification',
  prepare,
  render: () => <Notification notificationId={commentReplyNotification.id} />,
};

export const rulesUpdated: Demo = {
  description: 'Rules updated notification',
  prepare,
  render: () => <Notification notificationId={rulesUpdatedNotification.id} />,
};

export const seen: Demo = {
  description: 'Seen notification',
  prepare: ({ store }) => {
    prepare({ store });
    store.dispatch(markNotificationAsSeen(commentReplyNotification.id));
  },
  render: () => <Notification notificationId={commentReplyNotification.id} />,
};
