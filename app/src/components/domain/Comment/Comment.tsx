import React, { useState } from 'react';

import CommentOrCommentForm from 'src/components/domain/Comment/CommentOrCommentForm/CommentOrCommentForm';
import CommentsList from 'src/components/domain/Comment/CommentsList/CommentsList';
import useCanPerformAction from 'src/components/domain/Comment/hooks/useCanPerformAction';
import useReactions from 'src/components/domain/Comment/hooks/useUserReaction';
import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import Collapse from 'src/components/layout/Collapse/Collapse';
import { Comment as CommentType } from 'src/types/Comment';
import { User } from 'src/types/User';

import { ReactionType } from './CommentFooter/Reactions/ReactionType';
import Nested from './Nested/Nested';

export type CommentProps = {
  CommentContainer: React.FC<{ comment: CommentType }>;
  user: User | null;
  comment: CommentType;
  replies?: CommentType[];
  repliesLoading: boolean;
  submittingEdition: boolean;
  submittingReply: boolean;
  onEdit: (text: string) => void;
  onReport: () => void;
  onUserReactionChange: (type: ReactionType | null) => void;
  onToggleSubscription: () => void;
  onReply: (text: string) => void;
  fetchReplies: () => void;
};

const Comment: React.FC<CommentProps> = props => {
  // prettier-ignore
  const {
    CommentContainer, user, comment, replies, repliesLoading, submittingEdition, submittingReply,
    onEdit, onReport, onUserReactionChange, onToggleSubscription, onReply, fetchReplies,
  } = props;

  const [repliesOpen, setRepliesOpen] = useState(false);
  const [replyFormOpen, setReplyFormOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(comment.subscribed);

  const [reactionsCount, userReaction, handleUserReactionChange] = useReactions(comment, onUserReactionChange);
  const can = useCanPerformAction(user, comment);

  const handleToggleReplies = () => {
    if (replies === undefined) {
      fetchReplies();
    }

    setRepliesOpen(!repliesOpen);
  };

  const handleToggleSubscription = () => {
    setSubscribed(!subscribed);
    onToggleSubscription?.();
  };

  const handleReply = () => {
    if (!repliesOpen && comment.repliesCount > 0) {
      handleToggleReplies();
    }

    setReplyFormOpen(true);
  };

  return (
    <div className="comment" id={`comment-${comment.id}`} data-testid={`comment-${comment.id}`}>
      <CommentOrCommentForm
        comment={{ ...comment, reactionsCount, userReaction, subscribed }}
        submittingEdition={submittingEdition}
        repliesOpen={repliesOpen}
        repliesLoading={repliesLoading}
        replyFormOpen={replyFormOpen}
        onEdit={can('edit', onEdit)}
        onReport={can('report', onReport)}
        onToggleReplies={can('toggleReplies', handleToggleReplies)}
        onUserReactionChange={can('setReaction', handleUserReactionChange)}
        onReply={can('reply', handleReply)}
        onToggleSubscription={can('subscribe', handleToggleSubscription)}
      />

      {user && (
        <Collapse in={replyFormOpen}>
          <Nested>
            <CommentForm
              type="reply"
              commentId={comment.id}
              author={user}
              placeholder={`Répondez à ${comment.author.nick}...`}
              submitting={submittingReply}
              onSubmit={onReply}
              onClose={() => setReplyFormOpen(false)}
            />
          </Nested>
        </Collapse>
      )}

      <Collapse in={repliesOpen && (replies ?? []).length > 0}>
        <Nested barNegativeMargin={replyFormOpen}>
          <CommentsList CommentContainer={CommentContainer} comments={replies || []} />
        </Nested>
      </Collapse>
    </div>
  );
};

export default Comment;
