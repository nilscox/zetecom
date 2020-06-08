import { DeepPartial, getManager } from 'typeorm';

import { Notification, NotificationType } from '../../modules/notification/notification.entity';

export const createNotification = async (data: DeepPartial<Notification<NotificationType>> = {}) => {
  const manager = getManager();

  const notification = manager.create(Notification, {
    ...data,
  });

  return manager.save(notification);
};
