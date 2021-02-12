import React from 'react';

import styled from '@emotion/styled';

import CommentFooter from 'src/components-v2/domain/Comment/CommentFooter/CommentFooter';
import { borderRadius, color } from 'src/theme';
import { Comment as CommentType } from 'src/types/Comment';

import CommentBody from './CommentBody/CommentBody';
import CommentHeader from './CommentHeader/CommentHeader';

export const CommentContainer = styled.div`
  border: 1px solid ${color('border')};
  border-radius: ${borderRadius(2)};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 1px rgba(0, 0, 0, 0.08);
`;

type CommentProps = {
  comment: CommentType;
  repliesOpen: boolean;
  repliesLoading: boolean;
  replyFormOpen: boolean;
  onEdit?: () => void;
  onReport?: () => void;
  onUserReactionChange: () => void;
  onToggleReplies: () => void;
  onOpenReplyForm: () => void;
  onToggleSubscription?: () => void;
};

const Comment: React.FC<CommentProps> = ({
  comment,
  repliesOpen,
  repliesLoading,
  replyFormOpen,
  onEdit,
  onReport,
  onUserReactionChange,
  onToggleReplies,
  onOpenReplyForm,
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
        onUserReactionChange={onUserReactionChange}
        onToggleReplies={onToggleReplies}
        onOpenReplyForm={onOpenReplyForm}
        onToggleSubscription={onToggleSubscription}
      />
    </CommentContainer>
  );
};

export default Comment;
