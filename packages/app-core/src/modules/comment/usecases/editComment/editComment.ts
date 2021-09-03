import { createThunk } from '../../../../store/createThunk';
import { setIsSubmittingEdition } from '../../commentActions';
import { updateComment } from '../updateComment/updateComment';

export const editComment = createThunk(async ({ dispatch, commentGateway }, commentId: string, text: string) => {
  dispatch(setIsSubmittingEdition(commentId, true));

  const edited = await commentGateway.editComment(commentId, text);

  dispatch(
    updateComment(commentId, {
      text: edited.text,
      edited: edited.edited,
      isEditing: false,
    }),
  );

  dispatch(setIsSubmittingEdition(commentId, false));
});
