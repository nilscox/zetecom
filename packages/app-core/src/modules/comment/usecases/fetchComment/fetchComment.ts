import { commentDtoToEntity } from '../../../../entities';
import { setComment } from '../../../../store';
import { createThunk } from '../../../../store/createThunk';
import { setFetchingComment } from '../../actions';

export const fetchComment = createThunk(async ({ dispatch, commentGateway }, commentId: string) => {
  try {
    dispatch(setFetchingComment(true));

    const commentDto = await commentGateway.fetchComment(commentId);

    dispatch(setComment(commentDtoToEntity(commentDto)));
  } finally {
    dispatch(setFetchingComment(false));
  }
});
