import { createThunk } from '../../../../store/createThunk';
import { selectComment } from '../../selectors/commentSelectors';
import { updateComment } from '../updateComment/updateComment';

export const toggleSubscription = createThunk(async ({ getState, dispatch, commentGateway }, commentId: string) => {
  const { subscribed } = selectComment(getState(), commentId);

  dispatch(updateComment(commentId, { subscribed: !subscribed }));

  await commentGateway.setSubscription(commentId, !subscribed);
});
