import { SortType } from '../../../../entities/SortType';
import { createThunk } from '../../../../store/createThunk';
import { setCommentsSort } from '../../commentsAreaActions';
import { fetchComments } from '../fetchComments/fetchComments';

export const sortComments = createThunk(async ({ dispatch }, sort: SortType) => {
  dispatch(setCommentsSort(sort));

  await dispatch(fetchComments());
});
