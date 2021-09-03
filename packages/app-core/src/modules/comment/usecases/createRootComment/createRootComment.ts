import { createThunk } from '../../../../store/createThunk';
import { setComment } from '../../../../store/normalize';
import { setIsSubmittingRootComment } from '../../commentActions';
import { commentDtoToEntity } from '../../commentDtoMap';

export const createRootComment = createThunk(async ({ dispatch, commentGateway }, text: string) => {
  dispatch(setIsSubmittingRootComment(true));

  const commentDto = await commentGateway.createComment(text);

  dispatch(setComment(commentDtoToEntity(commentDto)));

  dispatch(setIsSubmittingRootComment(false));
});
