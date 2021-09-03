import { createThunk } from '../../../../store/createThunk';
import { setIsFetchingReplies } from '../../commentActions';
import { commentDtoToEntity } from '../../commentDtoMap';
import { updateComment } from '../updateComment/updateComment';

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
