import { commentDtoToEntity } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { setIsFetchingReplies } from '../../actions';
import { updateComment } from '../index';

export const fetchReplies = createThunk(async ({ dispatch, commentGateway }, commentId: string) => {
  dispatch(setIsFetchingReplies(commentId, true));

  const repliesDtos = await commentGateway.fetchReplies(commentId);

  dispatch(
    updateComment(commentId, {
      replies: repliesDtos.results.map(commentDtoToEntity),
      repliesCount: repliesDtos.total,
    }),
  );

  dispatch(setIsFetchingReplies(commentId, false));
});
