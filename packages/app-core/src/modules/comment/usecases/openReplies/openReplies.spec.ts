import { expect } from 'earljs';

import { Comment, commentDtoToEntity, createComment } from '../../../../entities';
import { MockCommentGateway } from '../../../../shared/mocks';
import { paginated } from '../../../../shared/paginated';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectComment, setComment } from '../../../../store/normalize';

import { closeReplies, openReplies, toggleReplies } from './openReplies';

describe('openReplies', () => {
  let store: MemoryStore;

  let commentGateway: MockCommentGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ commentGateway } = store.dependencies);
  });

  const getComment = (id: string) => store.select(selectComment, id);

  const setup = (comment: Comment, replies: Comment[] = []) => {
    store.dispatch(setComment(comment));
    commentGateway.fetchReplies.resolvesToOnce(paginated(replies.map(commentDtoToEntity)));
  };

  it("opens a comment's replies", async () => {
    const comment = createComment({ repliesCount: 1 });
    const replies = [createComment()];

    setup(comment, replies);

    await store.dispatch(openReplies(comment.id));

    expect(getComment(comment.id)).toBeAnObjectWith({
      areRepliesOpen: true,
      replies,
    });
  });

  it('does not fetch the replies when they were already fetched', async () => {
    const replies = [createComment()];
    const comment = createComment({ replies });

    setup(comment, replies);

    await store.dispatch(openReplies(comment.id));

    expect(commentGateway.fetchReplies).not.toBeExhausted();
  });

  it("closes a comment's replies", async () => {
    const comment = createComment({ areRepliesOpen: true });

    setup(comment, []);

    await store.dispatch(closeReplies(comment.id));

    expect(getComment(comment.id).areRepliesOpen).toEqual(false);
  });

  it("toggles a comment's replies", async () => {
    const comment = createComment();

    setup(comment, []);

    await store.dispatch(toggleReplies(comment.id));

    expect(getComment(comment.id).areRepliesOpen).toEqual(true);

    await store.dispatch(toggleReplies(comment.id));

    expect(getComment(comment.id).areRepliesOpen).toEqual(false);
  });
});
