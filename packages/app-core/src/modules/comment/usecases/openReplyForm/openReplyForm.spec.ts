import { expect } from 'earljs';

import { Comment, createComment } from '../../../../entities';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { closeReplyForm, openReplyForm, toggleReplyForm } from './openReplyForm';

describe('openReplyForm', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway } = store.dependencies);
  });

  const setup = (parent: Comment) => {
    store.dispatch(setComment(parent));
    commentGateway.fetchReplies.resolvesToOnce(paginated([]));

    return parent;
  };

  const getComment = (id: string) => store.select(selectComment, id);

  it('opens the reply form', async () => {
    const comment = setup(createComment());

    await store.dispatch(openReplyForm(comment.id));

    expect(getComment(comment.id).isReplyFormOpen).toEqual(true);
  });

  it('opens the replies', async () => {
    const comment = setup(createComment({ repliesCount: 1 }));

    await store.dispatch(openReplyForm(comment.id));

    expect(getComment(comment.id).areRepliesOpen).toEqual(true);
  });

  it('closes the reply form', async () => {
    const comment = setup(createComment({ isReplyFormOpen: true }));

    await store.dispatch(closeReplyForm(comment.id));

    expect(getComment(comment.id).isReplyFormOpen).toEqual(false);
  });

  it('toggles the reply form', async () => {
    const comment = setup(createComment());

    await store.dispatch(toggleReplyForm(comment.id));

    expect(getComment(comment.id).isReplyFormOpen).toEqual(true);

    await store.dispatch(toggleReplyForm(comment.id));

    expect(getComment(comment.id).isReplyFormOpen).toEqual(false);
  });
});
