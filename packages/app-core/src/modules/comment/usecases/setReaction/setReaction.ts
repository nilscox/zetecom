import { ReactionType } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { selectComment } from '../../selectors';
import { updateComment } from '../index';

export const setReaction = createThunk(
  async ({ getState, dispatch, commentGateway, trackingGateway }, commentId: string, reaction: ReactionType) => {
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

    if (newReaction) {
      trackingGateway.track({
        category: 'comment',
        action: 'set reaction',
        name: `set reaction ${newReaction}`,
      });
    } else {
      trackingGateway.track({
        category: 'comment',
        action: 'unset reaction',
      });
    }
  },
);
