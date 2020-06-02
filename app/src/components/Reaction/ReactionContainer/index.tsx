import React, { useCallback, useReducer, useState } from 'react';

import { ReactionEditionForm } from 'src/components/ReactionForm';
import { Reaction } from 'src/types/Reaction';

import ReactionComponent, { ReactionComponentProps } from '../ReactionComponent';

import useReplies from './hooks/useReplies';
import useReport from './hooks/useReport';
import useViewHistory from './hooks/useViewHistory';
import Replies from './Replies';
import ReplyForm from './ReplyForm';

type ReactionOrEditionFormProps = ReactionComponentProps & {
  reaction: Reaction;
  displayEditionForm: boolean;
  onEdited: (reaction: Reaction) => void;
  closeEditionForm: () => void;
};

const ReactionOrEditionForm: React.FC<ReactionOrEditionFormProps> = (props) => {
  const { reaction, displayEditionForm, onEdited, closeEditionForm } = props;

  if (displayEditionForm) {
    return (
      <ReactionEditionForm
        reaction={reaction}
        onEdited={onEdited}
        closeForm={closeEditionForm}
      />
    );
  }

  return <ReactionComponent {...props} />;
};

type ReactionStates = {
  displayReplies: boolean;
  displayReplyForm: boolean;
  displayEditionForm: boolean;
};

type ReactionStatesAction = {
  property: keyof ReactionStates;
  value: boolean;
};

const useReactionStates = () => {
  const reducer = (states: ReactionStates, action: ReactionStatesAction) => {
    return { ...states, [action.property]: action.value };
  };

  const initialState: ReactionStates = {
    displayReplies: false,
    displayReplyForm: false,
    displayEditionForm: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const set = (property: keyof ReactionStates, value: boolean) => dispatch({ property, value });

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

type ReactionContainerProps = {
  reaction: Reaction;
};

const ReactionContainer: React.FC<ReactionContainerProps> = ({ reaction: originalReaction }) => {
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
  ] = useReactionStates();

  const [reaction, setReaction] = useState(originalReaction);

  const [
    { replies, remainingRepliesCount, loading, error },
    { fetchMoreReplies, addReply },
  ] = useReplies(reaction);

  if (error)
    throw error;

  const report = useReport(reaction);
  const viewHistory = useViewHistory(reaction);

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

  const onReplyCreated = (created: Reaction) => {
    addReply(created);
    closeReplyForm();
    setReaction({
      ...reaction,
      repliesCount: reaction.repliesCount + 1,
    });
  };

  const onEdited = (reaction: Reaction) => {
    setReaction(reaction);
    closeEditionForm();
  };

  return (
    <div className="reaction" id={`reaction-${reaction.id}`}>

      <ReactionOrEditionForm
        reaction={reaction}
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
        reaction={reaction}
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

export default ReactionContainer;
