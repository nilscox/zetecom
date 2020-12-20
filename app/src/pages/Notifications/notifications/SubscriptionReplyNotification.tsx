import React from 'react';

import Link from '../../../components/Link';
import NotificationComponent, { NotificationProps } from '../NotificationComponent';

type SubscriptionReplyNotificationProps = NotificationProps<'subscriptionReply'>;

const SubscriptionReplyNotification: React.FC<SubscriptionReplyNotificationProps> = ({ notification, markAsSeen }) => (
  <NotificationComponent
    seen={notification.seen}
    title={
      <>
        <strong>{notification.payload.author.nick}</strong> a répondu à un commentaire
      </>
    }
    subTitle={
      <>
        Sur la zone de commentaires{' '}
        <strong>
          <Link to={`/commentaires/${notification.payload.commentsAreaId}`}>
            {notification.payload.commentsAreaTitle}
          </Link>
        </strong>
      </>
    }
    date={notification.created}
    imageSrc={notification.payload.commentsAreaImageUrl}
    text={notification.payload.text}
    markAsSeen={markAsSeen}
  />
);

export default SubscriptionReplyNotification;
