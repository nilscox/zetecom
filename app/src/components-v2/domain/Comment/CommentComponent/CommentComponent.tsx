import React from 'react';

import styled from '@emotion/styled';

import CommentFooter from 'src/components-v2/domain/Comment/CommentFooter/CommentFooter';
import { ReactionType } from 'src/components-v2/domain/Comment/CommentFooter/Reactions/ReactionType';
import { borderRadius, color } from 'src/theme';
import { Comment as CommentType } from 'src/types/Comment';

// it's okay, they're not very far
import CommentBody from '../CommentBody/CommentBody';
import CommentHeader from '../CommentHeader/CommentHeader';

export const CommentContainer = styled.div`
  border: 1px solid ${color('border')};
  border-radius: ${borderRadius(2)};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 1px rgba(0, 0, 0, 0.08);
`;

type CommentComponentProps = {
  comment: CommentType;
  repliesOpen: boolean;
  repliesLoading: boolean;
  replyFormOpen: boolean;
  onEdit?: () => void;
  onReport?: () => void;
  onUserReactionChange: (type: ReactionType) => void;
  onToggleReplies: () => void;
  onReply: () => void;
  onToggleSubscription?: () => void;
};

const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  repliesOpen,
  repliesLoading,
  replyFormOpen,
  onEdit,
  onReport,
  onUserReactionChange,
  onToggleReplies,
  onReply,
  onToggleSubscription,
}) => {
  return (
    <CommentContainer>
      <CommentHeader
        user={comment.author}
        edited={Boolean(comment.edited)}
        date={comment.edited || comment.date}
        onEdit={onEdit}
        onReport={onReport}
      />

      <CommentBody text={comment.text} />

      <CommentFooter
        userReaction={comment.userReaction as any}
        reactionsCounts={comment.reactionsCount as any}
        repliesLoading={repliesLoading}
        repliesCount={comment.repliesCount}
        repliesOpen={repliesOpen}
        replyFormOpen={replyFormOpen}
        isSubscribed={comment.subscribed}
        authorNick={comment.author.nick}
        onUserReactionChange={onUserReactionChange}
        onToggleReplies={onToggleReplies}
        onReply={onReply}
        onToggleSubscription={onToggleSubscription}
      />
    </CommentContainer>
  );
};

export default CommentComponent;
