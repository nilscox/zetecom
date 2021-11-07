import { createThunk } from '../../../../store/createThunk';
import { selectComment } from '../../selectors';
import { updateComment } from '../index';

export const toggleSubscription = createThunk(
  async ({ getState, dispatch, commentGateway, trackingGateway }, commentId: string) => {
    const { subscribed } = selectComment(getState(), commentId);

    dispatch(updateComment(commentId, { subscribed: !subscribed }));

    await commentGateway.setSubscription(commentId, !subscribed);

    trackingGateway.track({
      category: 'comment',
      action: subscribed ? 'unsubscribed' : 'subscribed',
    });
  },
);
