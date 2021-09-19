import styled from '@emotion/styled';
import {
  markNotificationAsSeen,
  NotificationPayload,
  NotificationType as NotificationTypeEnum,
  selectNotification,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import CloseIcon from '~/components/icons/Close.svg';

import { IconButton } from '~/components/elements/IconButton/IconButton';
import { Link, WebsiteLink } from '~/components/elements/Link/Link';
import { Markdown } from '~/components/elements/Markdown/Markdown';
import { Text } from '~/components/elements/Text/Text';
import { Box } from '~/components/layout/Box/Box';
import { Flex } from '~/components/layout/Flex/Flex';
import { Nested } from '~/components/layout/Nested/Nested';
import { useAppSelector } from '~/hooks/useAppSelector';
import useDateFormat, { DATE_FORMAT_DAY_HOUR } from '~/hooks/useFormatDate';
import { spacing } from '~/theme';

export type NotificationProps = {
  notificationId: string;
};

export const Notification: React.FC<NotificationProps> = ({ notificationId }) => {
  const dispatch = useDispatch();

  const notification = useAppSelector(selectNotification, notificationId);

  if (!notification) {
    throw new Error(`Expected notification with id "${notificationId}" to be defined`);
  }

  const { type, date, seen, payload } = notification;

  return (
    <NotificationComponent
      seen={Boolean(seen)}
      date={date}
      markAsSeen={() => dispatch(markNotificationAsSeen(notificationId))}
    >
      <NotificationContent type={type} payload={payload} />
    </NotificationComponent>
  );
};

type NotificationContentProps<T extends NotificationTypeEnum> = {
  type: T;
  payload: NotificationPayload[T];
};

const NotificationContent: React.FC<NotificationContentProps<NotificationTypeEnum>> = ({ type, payload }) => {
  if (type === NotificationTypeEnum.commentReply) {
    return <NotificationCommentReply {...(payload as NotificationPayload[NotificationTypeEnum.commentReply])} />;
  }

  if (type === NotificationTypeEnum.rulesUpdated) {
    return <NotificationRulesUpdated {...(payload as NotificationPayload[NotificationTypeEnum.rulesUpdated])} />;
  }

  throw new Error(`Unknown notification type "${type as string}"`);
};

const NotificationRulesUpdated: React.FC<NotificationPayload[NotificationTypeEnum.rulesUpdated]> = ({ version }) => (
  <Box marginTop={4}>
    <strong>La charte a été mise à jour !</strong> Prenez connaissance des modifications de la charte apportées avec la
    version <em>{version}</em>{' '}
    <WebsiteLink href={`/charte.html?version=${version}`}>sur le site de Zétécom</WebsiteLink>.
  </Box>
);

const NotificationCommentReply: React.FC<NotificationPayload[NotificationTypeEnum.commentReply]> = ({
  commentsAreaId,
  informationTitle,
  authorNick,
  text,
}) => (
  <>
    <Box marginY={4}>
      <strong>{authorNick}</strong> a répondu à votre commentaire sur{' '}
      <Link to={`/commentaires/${commentsAreaId}`}>{informationTitle}</Link>
    </Box>
    <Nested>
      <Markdown markdown={text} />
    </Nested>
  </>
);

type NotificationComponentProps = {
  date: Date;
  seen: boolean;
  markAsSeen: () => void;
};

const NotificationComponent: React.FC<NotificationComponentProps> = ({ date, seen, markAsSeen, children }) => {
  const formatDate = useDateFormat(DATE_FORMAT_DAY_HOUR);

  return (
    <Container padding={3} border borderRadius seen={seen}>
      <TopContainer direction="row">
        <Text fontSize={1} color="textLight">
          {formatDate(date)}
        </Text>

        {!seen && (
          <Box marginLeft="auto">
            <CloseIconButton as={CloseIcon} size={5} marginX={0} title="Marquer comme lue" onClick={markAsSeen} />
          </Box>
        )}
      </TopContainer>

      {children}
    </Container>
  );
};

const Container = styled(Box)<{ seen: boolean }>`
  opacity: ${({ seen }) => (seen ? 0.6 : 1)};
`;

const TopContainer = styled(Flex)`
  min-height: ${spacing(5)};
`;

const CloseIconButton = styled(IconButton)`
  display: block;
`;
