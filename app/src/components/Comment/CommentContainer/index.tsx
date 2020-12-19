import React, { useCallback, useEffect, useReducer, useState } from 'react';

import { CommentEditionForm } from 'src/components/CommentForm';
import usePrevious from 'src/hooks/use-previous';
import { Comment } from 'src/types/Comment';

import CommentComponent from '../CommentComponent';

import useReplies from './hooks/useReplies';
import useReport from './hooks/useReport';
import useSetReaction from './hooks/useSetReaction';
import useSubscription from './hooks/useSubscription';
import useViewHistory from './hooks/useViewHistory';
import Replies from './Replies';
import ReplyForm from './ReplyForm';

export type CommentAction =
  | 'setReaction'
  | 'toggleReplies'
  | 'toggleSubscription'
  | 'edit'
  | 'reply'
  | 'viewHistory'
  | 'report';

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
  actions?: CommentAction[];
};

const CommentContainer: React.FC<CommentContainerProps> = ({ comment: originalComment, actions }) => {
  const [comment, setComment] = useState(originalComment);

  const [commentStates, commentStatesCallbacks] = useCommentStates();
  const { displayReplies, displayReplyForm, displayEditionForm } = commentStates;
  const {
    toggleReplies: toggleDisplayReplies,
    openReplyForm,
    closeReplyForm,
    openEditionForm,
    closeEditionForm,
  } = commentStatesCallbacks;

  const [{ replies, remainingRepliesCount, loading: loadingReplies }, { fetchMoreReplies, addReply }] = useReplies(
    comment,
  );

  const prevReplies = usePrevious(replies);

  const report = useReport(comment);
  const viewHistory = useViewHistory(comment);
  const toggleSubscription = useSubscription(comment, setComment);
  const setReaction = useSetReaction(comment, setComment);

  const toggleReplies = useCallback(() => {
    if (!replies) {
      fetchMoreReplies();
    } else {
      toggleDisplayReplies();
    }
  }, [replies, fetchMoreReplies, toggleDisplayReplies]);

  useEffect(() => {
    if (prevReplies === undefined && replies !== undefined) {
      toggleDisplayReplies();
    }
  }, [prevReplies, replies, toggleDisplayReplies]);

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

  const can = (action: CommentAction) => {
    if (!actions) {
      return true;
    }

    return actions.includes(action);
  };

  const renderComment = () => {
    if (displayEditionForm) {
      return <CommentEditionForm comment={comment} onEdited={onEdited} closeForm={closeEditionForm} />;
    }

    return (
      <CommentComponent
        comment={comment}
        displayReplies={displayReplies}
        displayReplyForm={displayReplyForm}
        loadingReplies={loadingReplies}
        onSetReaction={can('setReaction') ? setReaction : undefined}
        onToggleReplies={can('toggleReplies') && !displayReplyForm ? toggleReplies : undefined}
        onToggleSubscription={can('toggleSubscription') ? toggleSubscription : undefined}
        onEdit={can('edit') ? openEditionForm : undefined}
        onReply={can('reply') ? onReply : undefined}
        onViewHistory={can('viewHistory') ? viewHistory : undefined}
        onReport={can('report') ? report : undefined}
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

      {replies && remainingRepliesCount !== undefined && (
        <Replies
          replies={replies}
          displayReplies={displayReplies}
          remainingRepliesCount={remainingRepliesCount}
          fetchMoreReplies={fetchMoreReplies}
        />
      )}
    </div>
  );
};

export default CommentContainer;
