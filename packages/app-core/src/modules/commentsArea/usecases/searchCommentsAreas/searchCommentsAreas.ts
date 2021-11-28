import { createThunk } from '../../../../store/createThunk';
import { selectIsFetchingCommentsAreas } from '../..';
import { setCommentsAreasSearchQuery, setFetchingCommentsAreas } from '../../actions';
import { fetchCommentsAreas } from '../index';

const SEARCH_DEBOUNCE_TIMEOUT = 500;

let searchTimeout: number | undefined;

export const searchCommentsAreas = createThunk(async ({ dispatch, getState, timerGateway }, query?: string) => {
  if (searchTimeout) {
    timerGateway.clearTimeout(searchTimeout);
  }

  if (!selectIsFetchingCommentsAreas(getState())) {
    dispatch(setFetchingCommentsAreas(true));
  }

  searchTimeout = timerGateway.setTimeout(async () => {
    if (query === '') {
      await dispatch(clearSearch());
    } else {
      await dispatch(setSearch(query));
    }
  }, SEARCH_DEBOUNCE_TIMEOUT);
});

const setSearch = createThunk(async ({ dispatch }, query?: string) => {
  dispatch(setCommentsAreasSearchQuery(query));

  await dispatch(fetchCommentsAreas());
});

const clearSearch = createThunk(async ({ dispatch }) => {
  dispatch(setCommentsAreasSearchQuery(undefined));

  await dispatch(fetchCommentsAreas());
});
