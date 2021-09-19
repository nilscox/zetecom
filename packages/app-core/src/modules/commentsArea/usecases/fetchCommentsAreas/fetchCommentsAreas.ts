import { commentsAreaDtoToEntity } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { setCommentsArea } from '../../../../store/normalize';
import { setCommentsAreas, setFetchingCommentsAreas, setTotalCommentsAreas } from '../../actions';
import { selectTotalCommentsAreas } from '../../selectors';

export const fetchCommentsAreas = createThunk(async ({ getState, dispatch, commentsAreaGateway }) => {
  if (selectTotalCommentsAreas(getState()) > 0) {
    return;
  }

  dispatch(setFetchingCommentsAreas(true));

  const commentsAreasDtos = await commentsAreaGateway.fetchCommentsAreas();
  const commentsAreas = commentsAreasDtos.results.map(commentsAreaDtoToEntity);

  dispatch(setCommentsArea(...commentsAreas));
  dispatch(setCommentsAreas(commentsAreas));
  dispatch(setTotalCommentsAreas(commentsAreasDtos.total));

  dispatch(setFetchingCommentsAreas(false));
});
