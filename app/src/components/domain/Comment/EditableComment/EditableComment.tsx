import React, { useEffect, useState } from 'react';

import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import { Comment as CommentType } from 'src/types/Comment';

import CommentComponent from '../CommentComponent/CommentComponent';
import { ReactionType } from '../CommentFooter/Reactions/ReactionType';

type EditableCommentProps = {
  comment: CommentType;
  submittingEdition: boolean;
  repliesOpen: boolean;
  repliesLoading: boolean;
  replyFormOpen: boolean;
  onEdit?: (text: string) => void;
  onReport?: () => void;
  onSetReaction?: (type: ReactionType | null) => void;
  onSetSubscription?: (subscribed: boolean) => void;
  onToggleReplies?: () => void;
  onReply?: () => void;
  onViewHistory?: () => void;
};

const EditableComment: React.FC<EditableCommentProps> = ({
  comment,
  submittingEdition,
  repliesOpen,
  repliesLoading,
  replyFormOpen,
  onEdit,
  onReport,
  onSetReaction,
  onToggleReplies,
  onReply,
  onSetSubscription,
  onViewHistory,
}) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!submittingEdition) {
      setEditing(false);
    }
  }, [submittingEdition]);

  if (editing && onEdit) {
    return (
      <CommentForm
        type="edition"
        placeholder="Éditez votre message..."
        author={comment.author}
        initialText={comment.text}
        submitting={submittingEdition}
        onSubmit={onEdit}
        onClose={() => setEditing(false)}
      />
    );
  }

  return (
    <CommentComponent
      comment={comment}
      repliesOpen={repliesOpen}
      repliesLoading={repliesLoading}
      replyFormOpen={replyFormOpen}
      onEdit={onEdit ? () => setEditing(true) : undefined}
      onReport={onReport}
      onSetReaction={onSetReaction}
      onToggleReplies={onToggleReplies}
      onReply={onReply}
      onSetSubscription={onSetSubscription}
      onViewHistory={onViewHistory}
    />
  );
};

export default EditableComment;
