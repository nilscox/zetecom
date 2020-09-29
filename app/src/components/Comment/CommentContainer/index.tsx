import React, { useCallback, useReducer, useState } from 'react';

import { CommentEditionForm } from 'src/components/CommentForm';
import { Comment } from 'src/types/Comment';

import CommentComponent from '../CommentComponent';

import useReplies from './hooks/useReplies';
import useReport from './hooks/useReport';
import useSetReaction from './hooks/useSetReaction';
import useSubscription from './hooks/useSubscription';
import useViewHistory from './hooks/useViewHistory';
import Replies from './Replies';
import ReplyForm from './ReplyForm';

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
  const [comment, setComment] = useState(originalComment);

  const [ commentStates, commentStatesCallbacks ] = useCommentStates();
  const { displayReplies, displayReplyForm, displayEditionForm } = commentStates;
  const {
    toggleReplies: toggleDisplayReplies,
    openReplyForm, closeReplyForm,
    openEditionForm, closeEditionForm,
  } = commentStatesCallbacks;

  const [
    { replies, remainingRepliesCount, loading: loadingReplies },
    { fetchMoreReplies, addReply },
  ] = useReplies(comment);

  const report = useReport(comment);
  const viewHistory = useViewHistory(comment);
  const toggleSubscription = useSubscription(comment, setComment);
  const setReaction = useSetReaction(comment, setComment);

  const toggleReplies = useCallback(() => {
    if (!replies) {
      fetchMoreReplies();
    }

    toggleDisplayReplies();
  }, [replies, fetchMoreReplies, toggleDisplayReplies]);

  const onReply = () => {
    if (!displayReplies) {
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

  const renderComment = () => {
    if (displayEditionForm) {
      return (
        <CommentEditionForm
          comment={comment}
          onEdited={onEdited}
          closeForm={closeEditionForm}
        />
      );
    }

    return (
      <CommentComponent
        comment={comment}
        displayReplies={displayReplies}
        displayReplyForm={displayReplyForm}
        onSetReaction={setReaction}
        onToggleReplies={!displayReplyForm ? toggleReplies : undefined}
        onToggleSubscription={toggleSubscription}
        onEdit={openEditionForm}
        onReply={onReply}
        onViewHistory={viewHistory}
        onReport={report}
      />
    );
  };

  return (
    <div className="comment" id={`comment-${comment.id}`}>

      {renderComment()}

      <ReplyForm
        comment={comment}
        displayReplyForm={displayReplyForm}
        closeReplyForm={closeReplyForm}
        onCreated={onReplyCreated}
      />

      <Replies
        replies={replies}
        displayReplies={displayReplies}
        loading={loadingReplies}
        remainingRepliesCount={remainingRepliesCount}
        fetchMoreReplies={fetchMoreReplies}
      />

    </div>
  );
};

export default CommentContainer;
