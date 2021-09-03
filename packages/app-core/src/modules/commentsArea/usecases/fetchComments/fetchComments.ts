import { CommentDto } from '../../../../entities/Comment';
import { FetchCommentsOptions } from '../../../../gateways/CommentGateway';
import { Paginated } from '../../../../shared/paginated';
import { createThunk } from '../../../../store/createThunk';
import { commentDtoToEntity } from '../../../comment/commentDtoMap';
import { setFetchingComments } from '../../commentsAreaActions';
import {
  selectCommentsPage,
  selectCommentsPageSize,
  selectCommentsSearchQuery,
  selectCommentsSort,
  selectCurrentCommentsArea,
} from '../../selectors/commentsAreaSelectors';
import { updateCommentsArea } from '../updateCommentsArea/updateCommentsArea';

export const fetchComments = createThunk(async ({ getState, dispatch, commentGateway }, query?: string) => {
  const currentCommentsArea = selectCurrentCommentsArea(getState());

  if (!currentCommentsArea) {
    return;
  }

  dispatch(setFetchingComments(true));

  const { id: commentsAreaId } = currentCommentsArea;

  const fetchOptions: FetchCommentsOptions = {
    page: selectCommentsPage(getState()),
    pageSize: selectCommentsPageSize(getState()),
    sort: selectCommentsSort(getState()),
  };

  const search = query ?? selectCommentsSearchQuery(getState());

  let comments: Paginated<CommentDto>;

  if (search) {
    comments = await commentGateway.searchComments(commentsAreaId, search, fetchOptions);
  } else {
    comments = await commentGateway.fetchRootComments(commentsAreaId, fetchOptions);
  }

  dispatch(setFetchingComments(false));

  dispatch(
    updateCommentsArea(commentsAreaId, {
      comments: comments.results.map(commentDtoToEntity),
      commentsCount: comments.total,
    }),
  );
});
