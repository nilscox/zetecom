import { expect } from 'earljs';

import { Comment, commentEntityToDto, createComment, createCommentsArea } from '../../../../entities';
import { MockCommentGateway, MockTrackingGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setComment, setCommentsArea } from '../../../../store/normalize';
// eslint-disable-next-line import/no-internal-modules
import { setCurrentCommentsArea } from '../../../commentsArea/actions';
import { selectComment } from '../../selectors';

import { createReply } from './createReply';

describe('createReply', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway, trackingGateway } = store.dependencies);
  });

  const commentsArea = createCommentsArea();

  const getComment = (commentId: string) => store.select(selectComment, commentId);

  const setup = (parent: Comment, reply: Comment) => {
    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsArea(commentsArea));
    store.dispatch(setComment(parent));

    commentGateway.createComment.resolvesToOnce(commentEntityToDto(reply));
  };

  it('adds a reply to a comment', async () => {
    const parent = createComment();
    const reply = createComment();

    setup(parent, reply);

    await store.dispatch(createReply(parent.id, reply.text));

    expect(commentGateway.createComment).toHaveBeenCalledWith([reply.text, commentsArea.id, parent.id]);

    expect(getComment(parent.id)).toBeAnObjectWith({
      repliesCount: 1,
      replies: [reply],
    });
  });

  it('prepends a reply to a comment already having replies', async () => {
    const existingReply = createComment();
    const parent = createComment({ replies: [existingReply] });
    const reply = createComment();

    setup(parent, reply);

    await store.dispatch(createReply(parent.id, reply.text));

    expect(getComment(parent.id)).toBeAnObjectWith({
      repliesCount: 2,
      replies: [reply, existingReply],
    });
  });

  it('notifies that the reply is being submitted', async () => {
    const parent = createComment();
    const reply = createComment();

    setup(parent, reply);

    const promise = store.dispatch(createReply(parent.id, reply.text));

    expect(getComment(parent.id)).toBeAnObjectWith({
      isSubmittingReply: true,
    });

    await promise;

    expect(getComment(parent.id)).toBeAnObjectWith({
      isSubmittingReply: false,
    });
  });

  it('closes the reply form', async () => {
    const parent = createComment({ isReplyFormOpen: true });
    const reply = createComment();

    setup(parent, reply);

    await store.dispatch(createReply(parent.id, reply.text));

    expect(getComment(parent.id)).toBeAnObjectWith({
      isReplyFormOpen: false,
    });
  });

  it('tracks a comment created event', async () => {
    const parent = createComment();

    setup(parent, createComment());

    await store.dispatch(createReply(parent.id, ''));

    expect(trackingGateway.track).toHaveBeenCalledWith([{ category: 'comment', action: 'comment created' }]);
  });
});
