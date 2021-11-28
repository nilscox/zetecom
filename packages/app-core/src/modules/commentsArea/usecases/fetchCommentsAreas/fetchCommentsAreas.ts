import { CommentsAreaDto, commentsAreaDtoToEntity } from '../../../../entities';
import { Paginated } from '../../../../shared';
import { createThunk } from '../../../../store/createThunk';
import { setCommentsArea } from '../../../../store/normalize';
import { setCommentsAreas, setFetchingCommentsAreas, setTotalCommentsAreas } from '../../actions';
import { selectCommentsAreasSearchQuery } from '../../selectors';

export const fetchCommentsAreas = createThunk(async ({ getState, dispatch, commentsAreaGateway }, query?: string) => {
  dispatch(setFetchingCommentsAreas(true));

  const search = query ?? selectCommentsAreasSearchQuery(getState());

  let commentsAreasDtos: Paginated<CommentsAreaDto>;

  if (search) {
    commentsAreasDtos = await commentsAreaGateway.searchCommentsAreas(search);
  } else {
    commentsAreasDtos = await commentsAreaGateway.fetchCommentsAreas();
  }

  const commentsAreas = commentsAreasDtos.results.map(commentsAreaDtoToEntity);

  dispatch(setCommentsArea(...commentsAreas));
  dispatch(setCommentsAreas(commentsAreas));
  dispatch(setTotalCommentsAreas(commentsAreasDtos.total));

  dispatch(setFetchingCommentsAreas(false));
});
