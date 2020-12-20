import React from 'react';

import NotificationComponent, { NotificationProps } from '../NotificationComponent';

type CommentsAreaRequestApprovedNotificationProps = NotificationProps<'commentsAreaRequestApproved'>;

const CommentsAreaRequestApprovedNotification: React.FC<CommentsAreaRequestApprovedNotificationProps> = ({
  notification,
  markAsSeen,
}) => (
  <NotificationComponent
    seen={notification.seen}
    title="Votre demande d'ouverture de zone de commentaires a été acceptée !"
    subTitle={
      <>
        Vous avez demandé l’ouverture d’une zone de commentaire sur la page :<br />
        <a href={notification.payload.requestedInformationUrl}>{notification.payload.requestedInformationUrl}</a>
      </>
    }
    date={notification.created}
    imageSrc={notification.payload.commentsAreaImageUrl}
    markAsSeen={markAsSeen}
  />
);

export default CommentsAreaRequestApprovedNotification;
