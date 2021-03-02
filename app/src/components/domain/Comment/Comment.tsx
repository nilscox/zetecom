import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import Collapse from 'src/components/layout/Collapse/Collapse';
import { spacing } from 'src/theme';
import { Comment as CommentType } from 'src/types/Comment';
import { User } from 'src/types/User';

import Nested from '../../elements/Nested/Nested';

import { ReactionType } from './CommentFooter/Reactions/ReactionType';
import CommentsList from './CommentsList/CommentsList';
import EditableComment from './EditableComment/EditableComment';
import useCanPerformAction from './hooks/useCanPerformAction';

const StyledNested = styled(Nested)<{ barNegativeMargin?: boolean }>`
  margin-top: ${spacing(2)};

  .bar {
    margin-top: ${props => (props.barNegativeMargin ? `-${props.theme.spacings[2]}` : undefined)};
  }
`;

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
  onSetReaction: (type: ReactionType | null) => void;
  onSetSubscription: (subscribed: boolean) => void;
  onReply: (text: string) => void;
  onViewHistory: () => void;
  fetchReplies: () => void;
};

const Comment: React.FC<CommentProps> = (props) => {
  // prettier-ignore
  const {
    CommentContainer, user, comment, replies, repliesLoading, submittingEdition, submittingReply,
    onEdit, onReport, onSetReaction, onSetSubscription, onReply, onViewHistory, fetchReplies,
  } = props;

  const [repliesOpen, setRepliesOpen] = useState(false);
  const [replyFormOpen, setReplyFormOpen] = useState(false);

  const can = useCanPerformAction(user, comment);

  const handleToggleReplies = () => {
    if (replies === undefined) {
      fetchReplies();
    }

    setRepliesOpen(!repliesOpen);
  };

  const handleReply = () => {
    if (!repliesOpen && comment.repliesCount > 0) {
      handleToggleReplies();
    }

    setReplyFormOpen(true);
  };

  useEffect(() => {
    setRepliesOpen(true);
    setReplyFormOpen(false);
  }, [submittingReply]);

  return (
    <div className="comment" id={`comment-${comment.id}`} data-testid="comment">
      <EditableComment
        comment={comment}
        submittingEdition={submittingEdition}
        repliesOpen={repliesOpen}
        repliesLoading={repliesLoading}
        replyFormOpen={replyFormOpen}
        onEdit={can('edit', onEdit)}
        onReport={can('report', onReport)}
        onToggleReplies={can('toggleReplies', handleToggleReplies)}
        onSetReaction={can('setReaction', onSetReaction)}
        onReply={can('reply', handleReply)}
        onSetSubscription={can('subscribe', onSetSubscription)}
        onViewHistory={can('viewHistory', onViewHistory)}
      />

      {user && (
        <Collapse in={replyFormOpen}>
          <StyledNested>
            <CommentForm
              type="reply"
              author={user}
              placeholder={`Répondez à ${comment.author.nick}...`}
              submitting={submittingReply}
              onSubmit={onReply}
              onClose={() => setReplyFormOpen(false)}
            />
          </StyledNested>
        </Collapse>
      )}

      <Collapse in={repliesOpen && (replies ?? []).length > 0}>
        <StyledNested barNegativeMargin={replyFormOpen}>
          <CommentsList CommentContainer={CommentContainer} comments={replies || []} />
        </StyledNested>
      </Collapse>
    </div>
  );
};

export default Comment;
