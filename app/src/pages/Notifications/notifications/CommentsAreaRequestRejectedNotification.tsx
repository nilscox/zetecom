import React from 'react';

import NotificationComponent, { NotificationProps } from '../NotificationComponent';

import imageNeutralFace from './neutralface.png';

type CommentsAreaRequestRejectedNotificationProps = NotificationProps<'commentsAreaRequestRejected'>;

const CommentsAreaRequestRejectedNotification: React.FC<CommentsAreaRequestRejectedNotificationProps> = ({
  notification,
  markAsSeen,
}) => (
  <NotificationComponent
    seen={notification.seen}
    title="Votre demande d'ouverture de zone de commentaires n'a pas été retenue"
    subTitle={
      <>
        Cette demande concernait l’ouverture d'une nouvelle zone de commentaire sur la page :<br />
        <a href={notification.payload.requestedInformationUrl}>{notification.payload.requestedInformationUrl}</a>
      </>
    }
    date={notification.created}
    imageSrc={imageNeutralFace}
    markAsSeen={markAsSeen}
  />
);

export default CommentsAreaRequestRejectedNotification;
