import { createThunk } from '../../../../store/createThunk';
import { setIsSubmittingReply } from '../../commentActions';
import { commentDtoToEntity } from '../../commentDtoMap';
import { selectComment } from '../../selectors/commentSelectors';
import { updateComment } from '../updateComment/updateComment';

export const createReply = createThunk(
  async ({ getState, dispatch, commentGateway }, parentId: string, text: string) => {
    const { repliesCount, replies } = selectComment(getState(), parentId);

    dispatch(setIsSubmittingReply(parentId, true));

    const replyDto = await commentGateway.createComment(text, parentId);

    dispatch(
      updateComment(parentId, {
        repliesCount: repliesCount + 1,
        replies: [commentDtoToEntity(replyDto), ...replies],
        isReplyFormOpen: false,
      }),
    );

    dispatch(setIsSubmittingReply(parentId, false));
  },
);
