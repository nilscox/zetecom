import { AppState, Reducer } from '../store';

type State = AppState['entities']['comments'];
type StateComment = State[string];

const updateCommentFactory =
  (state: State) =>
  (commentId: string, updater: Partial<StateComment> | ((comment: StateComment) => Partial<StateComment>)): State => {
    const comment = state[commentId];
    const updates = typeof updater === 'function' ? updater(comment) : updater;

    return { ...state, [comment.id]: { ...comment, ...updates } };
  };

export const commentsReducer: Reducer<State> = (state, action) => {
  if (action.type === 'setEntities') {
    return { ...state, ...action.payload.comments };
  }

  const updateComment = updateCommentFactory(state);

  switch (action.type) {
    case 'setAreRepliesOpen':
      return updateComment(action.payload.commentId, { areRepliesOpen: action.payload.repliesOpen });

    case 'setIsEditing':
      return updateComment(action.payload.commentId, { isEditing: action.payload.isEditing });

    case 'setIsSubmittingEdition':
      return updateComment(action.payload.commentId, { isSubmittingEdition: action.payload.isSubmittingEdition });

    case 'setIsFetchingReplies':
      return updateComment(action.payload.commentId, { isFetchingReplies: action.payload.isFetchingReplies });

    case 'setIsReplyFormOpen':
      return updateComment(action.payload.commentId, { isReplyFormOpen: action.payload.iReplyFormOpen });

    case 'setIsSubmittingReply':
      return updateComment(action.payload.commentId, { isSubmittingReply: action.payload.iSubmittingReply });
  }

  return state;
};
