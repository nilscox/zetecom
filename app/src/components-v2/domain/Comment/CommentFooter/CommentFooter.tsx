/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';

import { borderRadius, color, domain } from 'src/theme';

import Reactions from './Reactions/Reactions';
import { ReactionType } from './Reactions/ReactionType';
import RepliesButton from './RepliesButton/RepliesButton';
import ReplyButton from './ReplyButton/ReplyButton';
import SubscribeButton from './SubscribeButton/SubscribeButton';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid ${color('border')};
  border-bottom-left-radius: ${borderRadius(2)};
  border-bottom-right-radius: ${borderRadius(2)};
  background: ${domain('commentLightBackground')};
`;

type CommentFooterProps = {
  userReaction: ReactionType | null;
  reactionsCounts: Record<ReactionType, number>;
  repliesLoading: boolean;
  repliesCount: number;
  repliesOpen: boolean;
  replyFormOpen: boolean;
  isSubscribed: boolean;
  onUserReactionChange: (reaction: ReactionType) => void;
  onToggleReplies: () => void;
  onOpenReplyForm: () => void;
  onToggleSubscription: () => void;
};

const CommentFooter: React.FC<CommentFooterProps> = ({
  userReaction,
  reactionsCounts,
  repliesLoading,
  repliesOpen,
  repliesCount,
  replyFormOpen,
  isSubscribed,
  onUserReactionChange,
  onToggleReplies,
  onOpenReplyForm,
  onToggleSubscription,
}) => (
  <Container>
    <Reactions counts={reactionsCounts} userReaction={userReaction} setUserReaction={onUserReactionChange} />

    <RepliesButton
      loading={repliesLoading}
      repliesOpen={repliesOpen}
      repliesCount={repliesCount}
      onClick={onToggleReplies}
    />

    <SubscribeButton
      active={isSubscribed}
      onClick={onToggleSubscription}
      css={theme => css`
        margin-left: auto;
        margin-right: ${theme.spacings[1]};
      `}
    />

    <ReplyButton isReplyFormOpen={replyFormOpen} onClick={onOpenReplyForm} />
  </Container>
);

export default CommentFooter;
