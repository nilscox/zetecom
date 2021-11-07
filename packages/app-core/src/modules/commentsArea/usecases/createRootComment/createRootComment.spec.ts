import { expect } from 'earljs';

import { Comment, commentEntityToDto, createComment, createCommentsArea } from '../../../../entities';
import { MockCommentGateway, MockTrackingGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setCommentsArea } from '../../../../store/normalize';
import { setCurrentCommentsArea } from '../../actions';
import { selectCurrentCommentsArea, selectIsSubmittingRootComment } from '../../selectors';

import { createRootComment as createCommentThunk } from './createRootComment';

describe('createRootComment', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway, trackingGateway } = store.dependencies);
  });

  const commentsArea = createCommentsArea();

  const setup = (comment: Comment) => {
    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsArea(commentsArea));

    commentGateway.createComment.resolvesToOnce(commentEntityToDto(comment));
  };

  const getComment = (id: string) => store.select(selectComment, id);
  const getCurrentCommentsArea = () => store.select(selectCurrentCommentsArea);

  it('creates a root comment', async () => {
    const comment = createComment();

    setup(comment);

    await store.dispatch(createCommentThunk(comment.text));

    expect(commentGateway.createComment).toHaveBeenCalledWith([comment.text, commentsArea.id]);

    expect(getComment(comment.id)).toEqual(comment);

    expect(getCurrentCommentsArea()!).toBeAnObjectWith({
      comments: [comment],
      commentsCount: 1,
    });
  });

  it('notifies that a root comment is being submitted', async () => {
    const comment = createComment();

    setup(comment);

    const promise = store.dispatch(createCommentThunk(comment.text));

    expect(store.select(selectIsSubmittingRootComment)).toEqual(true);

    await promise;

    expect(store.select(selectIsSubmittingRootComment)).toEqual(false);
  });

  it('tracks a comment created event', async () => {
    setup(createComment());

    await store.dispatch(createCommentThunk(''));

    expect(trackingGateway.track).toHaveBeenCalledWith([{ category: 'comment', action: 'comment created' }]);
  });
});
