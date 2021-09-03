import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities/Comment';
import { CommentsArea, createCommentsArea } from '../../../../entities/CommentsArea';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { createMemoryStore } from '../../../../store/memoryStore';
import { selectCommentsArea } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { commentEntityToDto } from '../../../comment/commentDtoMap';
import { selectIsFetchingCommentsArea } from '../../selectors/commentsAreaSelectors';

import { fetchCommentsArea } from './fetchCommentsArea';

describe('fetchCommentsArea', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    ({ dispatch, getState, commentGateway } = createMemoryStore());
  });

  const setup = (commentsArea: CommentsArea, comments: Comment[]) => {
    commentGateway.fetchCommentsArea.resolvesToOnce(commentsArea);
    commentGateway.fetchRootComments.resolvesToOnce(paginated(comments.map(commentEntityToDto)));
  };

  it('fetches a comments area and its root comments', async () => {
    const commentsArea = createCommentsArea();
    const comments = [createComment()];

    setup(commentsArea, comments);

    await dispatch(fetchCommentsArea(commentsArea.id));

    expect(commentGateway.fetchCommentsArea).toHaveBeenCalledWith([commentsArea.id]);
    expect(commentGateway.fetchRootComments).toHaveBeenCalledWith([commentsArea.id, expect.anything()]);

    expect(selectCommentsArea(getState(), commentsArea.id)).toEqual({
      ...commentsArea,
      comments,
      commentsCount: 1,
    });
  });

  it('notifies that the comments area is being fetched', async () => {
    const commentsArea = createCommentsArea();

    setup(commentsArea, []);

    const promise = dispatch(fetchCommentsArea(commentsArea.id));

    expect(selectIsFetchingCommentsArea(getState())).toEqual(true);

    await promise;

    expect(selectIsFetchingCommentsArea(getState())).toEqual(false);
  });
});
