import React, { useState } from 'react';

import clsx from 'clsx';

import useReactions from 'src/components-v2/domain/Comment/hooks/useUserReaction';
import Collapse from 'src/components-v2/layout/Collapse/Collapse';
import { Comment as CommentType } from 'src/types/Comment';
import { User } from 'src/types/User';

import CommentForm from '../CommentForm/CommentForm';

import CommentComponent from './CommentComponent/CommentComponent';
import { ReactionType } from './CommentFooter/Reactions/ReactionType';
import CommentReplies from './CommentReplies/CommentReplies';
import Nested from './Nested/Nested';

export type CommentProps = {
  className?: string;
  user: User;
  comment: CommentType;
  repliesLoading: boolean;
  submittingEdition: boolean;
  submittingReply: boolean;
  onEdit?: (commentId: number, text: string) => void;
  onReport?: (commentId: number) => void;
  onUserReactionChange: (commentId: number, type: ReactionType) => void;
  onToggleSubscription?: (commentId: number) => void;
  onReply: (commentId: number, text: string) => void;
  fetchReplies: (commentId: number) => void;
  getReplies: (commentId: number) => CommentType[] | null;
};

const Comment: React.FC<CommentProps> = props => {
  // prettier-ignore
  const {
    className, user, comment, repliesLoading, submittingEdition, submittingReply,
    onEdit, onReport, onUserReactionChange, onToggleSubscription, onReply, fetchReplies, getReplies,
  } = props;

  const [editing, setEditing] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [replyFormOpen, setReplyFormOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(comment.subscribed);

  const [reactionsCount, userReaction, handleUserReactionChange] = useReactions(comment, onUserReactionChange);

  const replies = getReplies(comment.id);

  const handleToggleReplies = () => {
    fetchReplies(comment.id);
    setRepliesOpen(!repliesOpen);
  };

  const handleToggleSubscription = () => {
    setSubscribed(!subscribed);
    onToggleSubscription(comment.id);
  };

  const handleReply = () => {
    if (!repliesOpen) {
      handleToggleReplies();
    }

    setReplyFormOpen(true);
  };

  if (editing) {
    return (
      <CommentForm
        type="edition"
        commentId={comment.id}
        className={className}
        placeholder="Éditez votre message..."
        author={comment.author}
        initialText={comment.text}
        submitting={submittingEdition}
        onSubmit={text => onEdit(comment.id, text)}
        onClose={() => setEditing(false)}
      />
    );
  }

  return (
    <div className={clsx('comment', className)} id={`comment-${comment.id}`} data-testid={`comment-${comment.id}`}>
      <CommentComponent
        comment={{ ...comment, reactionsCount, userReaction, subscribed }}
        repliesOpen={repliesOpen}
        repliesLoading={repliesLoading}
        replyFormOpen={replyFormOpen}
        onEdit={() => setEditing(true)}
        onReport={() => onReport(comment.id)}
        onUserReactionChange={handleUserReactionChange}
        onToggleReplies={handleToggleReplies}
        onReply={handleReply}
        onToggleSubscription={handleToggleSubscription}
      />

      <Collapse in={replyFormOpen}>
        <Nested>
          <CommentForm
            type="reply"
            commentId={comment.id}
            author={user}
            placeholder={`Répondez à ${comment.author.nick}...`}
            submitting={submittingReply}
            onSubmit={text => onReply(comment.id, text)}
            onClose={() => setReplyFormOpen(false)}
          />
        </Nested>
      </Collapse>

      <Collapse in={repliesOpen && replies?.length > 0}>
        <Nested barNegativeMargin={replyFormOpen}>
          <CommentReplies replies={replies || []} {...props} />
        </Nested>
      </Collapse>
    </div>
  );
};

export default Comment;
