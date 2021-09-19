import { CommentDto, commentDtoToEntity } from '../../../../entities';
import { FetchCommentsOptions } from '../../../../gateways';
import { Paginated } from '../../../../shared/paginated';
import { createThunk } from '../../../../store/createThunk';
import { setFetchingComments } from '../../actions';
import {
  selectCommentsPage,
  selectCommentsPageSize,
  selectCommentsSearchQuery,
  selectCommentsSort,
  selectCurrentCommentsArea,
} from '../../selectors';
import { updateCommentsArea } from '../index';

export const fetchComments = createThunk(async ({ getState, dispatch, commentsAreaGateway }, query?: string) => {
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
    comments = await commentsAreaGateway.searchComments(commentsAreaId, search, fetchOptions);
  } else {
    comments = await commentsAreaGateway.fetchRootComments(commentsAreaId, fetchOptions);
  }

  dispatch(setFetchingComments(false));

  dispatch(
    updateCommentsArea(commentsAreaId, {
      comments: comments.results.map(commentDtoToEntity),
    }),
  );
});
