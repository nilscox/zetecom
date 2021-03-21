import React from 'react';

import styled from '@emotion/styled';

import Notification from 'src/components/domain/Notification/Notification';
import Link, { ExternalLink } from 'src/components/elements/Link/Link';
import Nested from 'src/components/layout/Nested/Nested';
import { spacing } from 'src/theme';
import { Notification as NotificationType } from 'src/types/Notification';
import env from 'src/utils/env';

const getNotificationData = (notification: NotificationType): { title: React.ReactNode; text: React.ReactNode } => {
  if (notification.type === 'rulesUpdate') {
    const { version } = notification.payload;

    return {
      title: 'La charte a été mise à jour !',
      text: (
        <p>
          La version <strong>{version}</strong> de la charte est disponible à l'adresse{' '}
          <ExternalLink href={`${env.WEBSITE_URL}/charte-v${version}.html`}></ExternalLink>, ainsi qu'un détail des
          changements apportés.
        </p>
      ),
    };
  }

  if (notification.type === 'subscriptionReply') {
    const { author, text, commentsAreaId, commentsAreaTitle } = notification.payload;

    return {
      title: <>{author.nick} a répondu à un commentaire.</>,
      text: (
        <>
          <p>
            Sur la zone de commentaires <Link to={`/commentaires/${commentsAreaId}`}>{commentsAreaTitle}</Link>,{' '}
            {author.nick} a répondu à un commentaire que vous suivez.
            <br />
          </p>
          <Nested>{text}</Nested>
        </>
      ),
    };
  }

  if (notification.type === 'commentsAreaRequestApproved') {
    // eslint-disable-next-line no-empty-pattern
    const {} = notification.payload;

    return {
      title: <>Votre demande d'ouverture de zone de commentaires a été approuvée.</>,
      text: <p></p>,
    };
  }

  if (notification.type === 'commentsAreaRequestRejected') {
    // eslint-disable-next-line no-empty-pattern
    const {} = notification.payload;

    return {
      title: <>Votre demande d'ouverture de zone de commentaires n'a pas été retenue.</>,
      text: <p></p>,
    };
  }

  return { title: '', text: '' };
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${spacing(4)};
`;

type NotificationsListProps = {
  notifications: NotificationType[];
  markAsSeen: (notification: NotificationType) => void;
};

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, markAsSeen }) => (
  <Container>
    {notifications?.map(notification => (
      <Notification
        key={notification.id}
        date={new Date(notification.created)}
        seen={notification.seen ? new Date(notification.seen) : false}
        text={notification.payload}
        markAsSeen={!notification.seen ? () => markAsSeen(notification) : undefined}
        {...getNotificationData(notification)}
      />
    ))}
  </Container>
);

export default NotificationsList;
