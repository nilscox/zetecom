import { ReactionType } from '../../../../entities/Comment';
import { createThunk } from '../../../../store/createThunk';
import { selectComment } from '../../selectors/commentSelectors';
import { updateComment } from '../updateComment/updateComment';

export const setReaction = createThunk(
  async ({ getState, dispatch, commentGateway }, commentId: string, reaction: ReactionType) => {
    const { userReaction, reactionsCount } = selectComment(getState(), commentId);
    const newReaction = reaction === userReaction ? null : reaction;
    const reactions = { ...reactionsCount };

    if (userReaction) {
      reactions[userReaction]--;
    }

    if (newReaction) {
      reactions[newReaction]++;
    }

    dispatch(
      updateComment(commentId, {
        userReaction: newReaction,
        reactionsCount: reactions,
      }),
    );

    await commentGateway.updateReaction(commentId, newReaction);
  },
);
