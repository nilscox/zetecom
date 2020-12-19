import React from 'react';

import { NotificationProps } from '../Notification';

type RulesUpdateNotificationProps = NotificationProps<'rulesUpdate'>;

const RulesUpdateNotification: React.FC<RulesUpdateNotificationProps> = ({ notification }) => (
  <>
    La charte a été mise à jour ! Nouvelle version : <strong>{notification.payload.version}</strong>
  </>
);

export default RulesUpdateNotification;
