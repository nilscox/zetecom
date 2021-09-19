import { expect } from 'earljs';

import {
  Comment,
  commentEntityToDto,
  CommentsArea,
  commentsAreaEntityToDto,
  createComment,
  createCommentsArea,
} from '../../../../entities';
import { MockCommentsAreaGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectCommentsArea, setCommentsArea } from '../../../../store/normalize';
import { setCurrentCommentsArea } from '../../actions';
import {
  selectCommentsAreaByIdentifier,
  selectCommentsAreaNotFound,
  selectIsFetchingCommentsArea,
} from '../../selectors';

import { fetchCommentsAreaById, fetchCommentsAreaByIdentifier } from './fetchCommentsArea';

describe('fetchCommentsArea', () => {
  let store: MemoryStore;

  let commentsAreaGateway: MockCommentsAreaGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentsAreaGateway } = store.dependencies);
  });

  const setup = (commentsArea: CommentsArea, comments: Comment[]) => {
    commentsAreaGateway.fetchCommentsArea.resolvesToOnce(commentsAreaEntityToDto(commentsArea));
    commentsAreaGateway.fetchRootComments.resolvesToOnce(paginated(comments.map(commentEntityToDto)));
  };

  it('fetches a comments area and its root comments', async () => {
    const commentsArea = createCommentsArea({ commentsCount: 1 });
    const comments = [createComment()];

    setup(commentsArea, comments);

    await store.dispatch(fetchCommentsAreaById(commentsArea.id));

    expect(commentsAreaGateway.fetchCommentsArea).toHaveBeenCalledWith([commentsArea.id]);
    expect(commentsAreaGateway.fetchRootComments).toHaveBeenCalledWith([commentsArea.id, expect.anything()]);

    expect(store.select(selectCommentsArea, commentsArea.id)).toEqual({
      ...commentsArea,
      comments,
      commentsCount: 1,
    });
  });

  it('fetches a comments area by its identifier', async () => {
    const commentsArea = createCommentsArea({ commentsCount: 1 });
    const comments = [createComment()];

    setup(commentsArea, comments);
    commentsAreaGateway.fetchCommentsAreaByIdentifier.resolvesToOnce(commentsAreaEntityToDto(commentsArea));

    await store.dispatch(fetchCommentsAreaByIdentifier('identifier'));

    expect(commentsAreaGateway.fetchCommentsAreaByIdentifier).toHaveBeenCalledWith(['identifier']);

    expect(store.select(selectCommentsAreaByIdentifier, 'identifier')).toEqual({
      ...commentsArea,
      comments,
      commentsCount: 1,
    });
  });

  it('does not find a comments area', async () => {
    const commentsArea = createCommentsArea();

    setup(commentsArea, []);
    commentsAreaGateway.fetchCommentsAreaByIdentifier.resolvesToOnce(undefined);

    await store.dispatch(fetchCommentsAreaByIdentifier('identifier'));

    expect(store.select(selectCommentsAreaNotFound)).toEqual(true);

    commentsAreaGateway.fetchCommentsAreaByIdentifier.resolvesToOnce(commentsArea);

    await store.dispatch(fetchCommentsAreaByIdentifier('identifier'));

    expect(store.select(selectCommentsAreaNotFound)).toEqual(false);
  });

  it('notifies that the comments area is being fetched', async () => {
    const commentsArea = createCommentsArea();

    setup(commentsArea, []);

    const promise = store.dispatch(fetchCommentsAreaById(commentsArea.id));

    expect(store.select(selectIsFetchingCommentsArea)).toEqual(true);

    await promise;

    expect(store.select(selectIsFetchingCommentsArea)).toEqual(false);
  });

  it('only fetches the root comments when the comments area was already fetched', async () => {
    const commentsArea = createCommentsArea({ commentsCount: 1 });

    setup(commentsArea, []);
    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsArea(commentsArea));

    await store.dispatch(fetchCommentsAreaById(commentsArea.id));

    expect(commentsAreaGateway.fetchCommentsArea).not.toBeExhausted();
    expect(commentsAreaGateway.fetchRootComments).toBeExhausted();
  });
});
