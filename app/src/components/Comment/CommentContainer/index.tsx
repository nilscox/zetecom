import React, { useCallback, useReducer, useState } from 'react';

import { CommentEditionForm } from 'src/components/CommentForm';
import { Comment } from 'src/types/Comment';

import CommentComponent, { CommentComponentProps } from '../CommentComponent';

import useReplies from './hooks/useReplies';
import useReport from './hooks/useReport';
import useViewHistory from './hooks/useViewHistory';
import Replies from './Replies';
import ReplyForm from './ReplyForm';

type CreationOrEditionFormProps = CommentComponentProps & {
  comment: Comment;
  displayEditionForm: boolean;
  onEdited: (comment: Comment) => void;
  closeEditionForm: () => void;
};

const CreationOrEditionForm: React.FC<CreationOrEditionFormProps> = (props) => {
  const { comment, displayEditionForm, onEdited, closeEditionForm } = props;

  if (displayEditionForm) {
    return (
      <CommentEditionForm
        comment={comment}
        onEdited={onEdited}
        closeForm={closeEditionForm}
      />
    );
  }

  return <CommentComponent {...props} />;
};

type CommentStates = {
  displayReplies: boolean;
  displayReplyForm: boolean;
  displayEditionForm: boolean;
};

type CommentStatesAction = {
  property: keyof CommentStates;
  value: boolean;
};

const useCommentStates = () => {
  const reducer = (states: CommentStates, action: CommentStatesAction) => {
    return { ...states, [action.property]: action.value };
  };

  const initialState: CommentStates = {
    displayReplies: false,
    displayReplyForm: false,
    displayEditionForm: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const set = (property: keyof CommentStates, value: boolean) => dispatch({ property, value });

  return [
    state,
    {
      toggleReplies: () => set('displayReplies', !state.displayReplies),
      openReplyForm: () => set('displayReplyForm', true),
      closeReplyForm: () => set('displayReplyForm', false),
      openEditionForm: () => set('displayEditionForm', true),
      closeEditionForm: () => set('displayEditionForm', false),
    },
  ] as const;
};

type CommentContainerProps = {
  comment: Comment;
};

const CommentContainer: React.FC<CommentContainerProps> = ({ comment: originalComment }) => {
  const [
    {
      displayReplies,
      displayReplyForm,
      displayEditionForm,
    },
    {
      toggleReplies: toggleDisplayReplies,
      openReplyForm,
      closeReplyForm,
      openEditionForm,
      closeEditionForm,
    },
  ] = useCommentStates();

  const [comment, setComment] = useState(originalComment);

  const [
    { replies, remainingRepliesCount, loading, error },
    { fetchMoreReplies, addReply },
  ] = useReplies(comment);

  if (error)
    throw error;

  const report = useReport(comment);
  const viewHistory = useViewHistory(comment);

  const toggleReplies = useCallback(() => {
    if (!replies && !error)
      fetchMoreReplies();

    toggleDisplayReplies();
  }, [replies, error, fetchMoreReplies, toggleDisplayReplies]);

  const onReply = () => {
    if (!displayReplies) {
      // fetch replies if opened for the first time using the reply button
      toggleReplies();
    }

    openReplyForm();
  };

  const onReplyCreated = (created: Comment) => {
    addReply(created);
    closeReplyForm();
    setComment({
      ...comment,
      repliesCount: comment.repliesCount + 1,
    });
  };

  const onEdited = (comment: Comment) => {
    setComment(comment);
    closeEditionForm();
  };

  return (
    <div className="comment" id={`comment-${comment.id}`}>

      <CreationOrEditionForm
        comment={comment}
        displayReplies={displayReplies}
        toggleReplies={!displayReplyForm ? toggleReplies : null}
        displayReplyForm={displayReplyForm}
        onReply={onReply}
        onEdit={openEditionForm}
        onViewHistory={viewHistory}
        onReport={report}
        displayEditionForm={displayEditionForm}
        onEdited={onEdited}
        closeEditionForm={closeEditionForm}
      />

      <ReplyForm
        comment={comment}
        displayReplyForm={displayReplyForm}
        closeReplyForm={closeReplyForm}
        onCreated={onReplyCreated}
      />

      <Replies
        replies={replies}
        displayReplies={displayReplies}
        loading={loading}
        remainingRepliesCount={remainingRepliesCount}
        fetchMoreReplies={fetchMoreReplies}
      />

    </div>
  );
};

export default CommentContainer;
