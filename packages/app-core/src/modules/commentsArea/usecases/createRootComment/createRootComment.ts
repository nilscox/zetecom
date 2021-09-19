import { commentDtoToEntity } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { setIsSubmittingRootComment } from '../../actions';
import { selectCurrentCommentsArea } from '../../selectors';
import { updateCommentsArea } from '../index';

export const createRootComment = createThunk(async ({ getState, dispatch, commentGateway }, text: string) => {
  const currentCommentsArea = selectCurrentCommentsArea(getState());

  if (!currentCommentsArea) {
    return;
  }

  dispatch(setIsSubmittingRootComment(true));

  const commentDto = await commentGateway.createComment(text, currentCommentsArea.id);
  const comment = commentDtoToEntity(commentDto);

  dispatch(
    updateCommentsArea(currentCommentsArea.id, {
      comments: [comment, ...currentCommentsArea.comments],
      commentsCount: currentCommentsArea.commentsCount + 1,
    }),
  );

  dispatch(setIsSubmittingRootComment(false));
});
