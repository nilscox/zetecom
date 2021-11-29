import styled from '@emotion/styled';
import {
  ReactionsCount,
  ReactionType,
  selectCanReply,
  selectCanSetReaction,
  selectCanSubscribe,
  selectCanToggleReplies,
  selectCanToggleReplyForm,
  selectComment,
  setReaction,
  toggleReplies,
  toggleReplyForm,
  toggleSubscription,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import IconCaretRight from '~/components/icons/CaretRight.svg';
import IconNotification from '~/components/icons/Notification.svg';
import IconNotificationActive from '~/components/icons/NotificationActive.svg';

import { Button, ButtonProps } from '~/components/elements/Button/Button';
import { Icon } from '~/components/elements/Icon/Icon';
import { IconButton } from '~/components/elements/IconButton/IconButton';
import { Text } from '~/components/elements/Text/Text';
import { Reply as ReplySvg } from '~/components/icons';
import { Flex } from '~/components/layout/Flex/Flex';
import { useAppSelector } from '~/hooks/useAppSelector';
import { border, breakpoints, color, domain, radius, spacing } from '~/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const conditionally = <T extends (...args: any[]) => any>(condition: boolean, func: T): T | undefined => {
  if (!condition) {
    return undefined;
  }

  return func;
};

type CommentFooterProps = {
  commentId: string;
};

export const CommentFooter: React.FC<CommentFooterProps> = ({ commentId }) => {
  const comment = useAppSelector(selectComment, commentId);
  const { reactionsCount, userReaction, repliesCount, areRepliesOpen, isFetchingReplies, subscribed } = comment;

  const canSetReaction = useAppSelector(selectCanSetReaction, commentId);
  const canSubscribe = useAppSelector(selectCanSubscribe, commentId);
  const canReply = useAppSelector(selectCanReply, commentId);
  const canToggleReplies = useAppSelector(selectCanToggleReplies, commentId);
  const canToggleReplyForm = useAppSelector(selectCanToggleReplyForm, commentId);

  const dispatch = useDispatch();

  return (
    <CommentFooterContainer>
      <Reactions
        counts={reactionsCount}
        userReaction={userReaction}
        onSetReaction={conditionally(canSetReaction, (type) => dispatch(setReaction(commentId, type)))}
      />

      <Replies
        loading={isFetchingReplies}
        open={areRepliesOpen}
        count={repliesCount}
        onClick={conditionally(canToggleReplies, () => dispatch(toggleReplies(commentId)))}
      />

      {canSubscribe && <Subscribe subscribed={subscribed} onClick={() => dispatch(toggleSubscription(commentId))} />}

      {canReply && <Reply onClick={conditionally(canToggleReplyForm, () => dispatch(toggleReplyForm(commentId)))} />}
    </CommentFooterContainer>
  );
};

const FooterButton: React.FC<ButtonProps> = (props) => {
  return <Button borderRadius="none" paddingY={1} {...props} />;
};

export const CommentFooterContainer = styled(Flex)`
  background-color: ${color('backgroundLight')};
  border-top: ${border()};
  border-bottom-left-radius: ${radius()};
  border-bottom-right-radius: ${radius()};
  overflow-x: auto;
`;

type ReactionsProps = {
  counts: ReactionsCount;
  userReaction?: ReactionType | null;
  onSetReaction?: (type: ReactionType) => void;
};

const Reactions: React.FC<ReactionsProps> = ({ counts, userReaction, onSetReaction }) => (
  <>
    {Object.entries(counts).map(([reaction, count]) => (
      <Reaction
        key={reaction}
        type={reaction as ReactionType}
        count={count}
        isUserReaction={reaction === userReaction}
        onClick={onSetReaction ? () => onSetReaction(reaction as ReactionType) : undefined}
      />
    ))}
  </>
);

type ReactionProps = {
  type: ReactionType;
  count: number;
  isUserReaction: boolean;
  onClick?: () => void;
};

const reactionsEmojis: Record<ReactionType, string> = {
  like: '❤️',
  approve: '👍',
  think: '🧠',
  disagree: '🤨',
  dontUnderstand: '❓',
};

const reactionsTitles: Record<ReactionType, string> = {
  like: "J'aime",
  approve: "Je suis d'accord",
  think: 'Ça me fait réfléchir',
  disagree: "Je ne suis pas d'accord",
  dontUnderstand: 'Je ne comprends pas',
};

const Reaction: React.FC<ReactionProps> = ({ type, count, isUserReaction, onClick }) => (
  <ReactionButton
    disabled={!onClick}
    selected={isUserReaction}
    onClick={onClick}
    title={reactionsTitles[type]}
    className={isUserReaction ? 'user-reaction' : undefined}
  >
    <ReactionEmoji>{reactionsEmojis[type]}</ReactionEmoji>
    <Text marginLeft={2} fontWeight="body" color="text">
      {count}
    </Text>
  </ReactionButton>
);

const ReactionButton = styled(FooterButton)<{ selected: boolean }>`
  border-right: ${border()};
  background-color: ${({ selected }) => selected && '#ffeca6'};
  white-space: nowrap;

  ${breakpoints.down('small')} {
    padding: ${spacing(1, 2)};
  }
`;

const ReactionEmoji = styled(Text)`
  font-size: ${domain('comment', 'reactionFontSize')};

  ${breakpoints.down('small')} {
    font-size: ${domain('comment', 'reactionFontSizeSmall')};
  }
`;

type RepliesProps = {
  loading: boolean;
  open: boolean;
  count: number;
  onClick?: () => void;
};

const Replies: React.FC<RepliesProps> = ({ loading, open, count, onClick }) => (
  <RepliesButton disabled={!onClick} loading={loading} title="Voir les réponses" onClick={onClick}>
    {count > 0 && <RepliesCaretIcon as={IconCaretRight} open={open} />}
    {count} réponse{count > 1 ? 's' : ''}
  </RepliesButton>
);

const RepliesButton = styled(FooterButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  white-space: nowrap;
`;

const RepliesCaretIcon = styled(Icon)<{ open: boolean }>`
  transform: rotate(${({ open }) => (open ? 90 : 0)}deg);
  transition: transform 135ms ease;
  margin-right: ${spacing(2)};
`;

type SubscribeProps = {
  subscribed?: boolean;
  onClick?: () => void;
};

const Subscribe: React.FC<SubscribeProps> = ({ subscribed, onClick }) => (
  <IconButton
    as={subscribed ? IconNotificationActive : IconNotification}
    color={subscribed ? 'primary' : undefined}
    title={subscribed ? 'Se désabonner' : "S'abonner aux réponses"}
    onClick={onClick}
  />
);

type ReplyProps = {
  onClick?: () => void;
};

const Reply: React.FC<ReplyProps> = ({ onClick }) => (
  <FooterButton disabled={!onClick} onClick={onClick}>
    <ReplyText>Répondre</ReplyText>
    <ReplyIcon as={ReplySvg} />
  </FooterButton>
);

const ReplyText = styled(Text)`
  ${breakpoints.down('small')} {
    display: none;
  }
`;

const ReplyIcon = styled(Icon)`
  ${breakpoints.up('small')} {
    display: none;
  }
`;
