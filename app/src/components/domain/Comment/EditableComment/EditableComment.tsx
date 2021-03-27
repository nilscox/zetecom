import React, { useEffect, useState } from 'react';

import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import { Comment as CommentType } from 'src/types/Comment';

import CommentComponent from '../CommentComponent/CommentComponent';
import { ReactionType } from '../CommentFooter/Reactions/ReactionType';

type EditableCommentProps = {
  comment: CommentType;
  isPin?: boolean;
  submittingEdition: boolean;
  repliesOpen: boolean;
  repliesLoading: boolean;
  replyFormOpen: boolean;
  onPin?: () => void;
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
  isPin,
  submittingEdition,
  repliesOpen,
  repliesLoading,
  replyFormOpen,
  onPin,
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
      isPin={isPin}
      repliesOpen={repliesOpen}
      repliesLoading={repliesLoading}
      replyFormOpen={replyFormOpen}
      onPin={onPin}
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
