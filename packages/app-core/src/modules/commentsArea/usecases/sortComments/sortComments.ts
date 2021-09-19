import { SortType } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { setCommentsSort } from '../../actions';
import { fetchComments } from '../index';

export const sortComments = createThunk(async ({ dispatch }, sort: SortType) => {
  dispatch(setCommentsSort(sort));

  await dispatch(fetchComments());
});
