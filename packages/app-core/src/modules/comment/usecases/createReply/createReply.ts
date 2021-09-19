import { commentDtoToEntity } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { selectCurrentCommentsArea } from '../../../commentsArea';
import { setIsSubmittingReply } from '../../actions';
import { selectComment } from '../../selectors';
import { updateComment } from '../index';

export const createReply = createThunk(
  async ({ getState, dispatch, commentGateway }, parentId: string, text: string) => {
    const { repliesCount, replies } = selectComment(getState(), parentId);
    const currentCommentsArea = selectCurrentCommentsArea(getState());

    if (!currentCommentsArea) {
      throw new Error('expected currentCommentsArea to be set');
    }

    dispatch(setIsSubmittingReply(parentId, true));

    const replyDto = await commentGateway.createComment(text, currentCommentsArea.id, parentId);

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
