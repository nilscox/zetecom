import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AuthenticatedUser,
  CommentsArea as CommentsAreaType,
  createAuthenticatedUser,
  createComment,
  createCommentDto,
  createCommentsArea,
  paginated,
  setAuthenticatedUser,
  setCurrentCommentsArea,
  SortType,
  Store,
} from '@zetecom/app-core';
import { FakeTimerGateway, MockCommentGateway, MockCommentsAreaGateway } from '@zetecom/app-core/shared/mocks';
import { expect } from 'earljs';

import { Test } from '~/Test';
import { array } from '~/utils/array';
import { configureStore } from '~/utils/configureStore';
import { type } from '~/utils/tests';

import { CommentsArea } from './CommentsArea';

describe('CommentsArea', () => {
  let commentsAreaGateway: MockCommentsAreaGateway;
  let commentGateway: MockCommentGateway;
  let timerGateway: FakeTimerGateway;

  let store: Store;

  beforeEach(() => {
    commentsAreaGateway = new MockCommentsAreaGateway();
    commentGateway = new MockCommentGateway();
    timerGateway = new FakeTimerGateway();

    store = configureStore({ commentsAreaGateway, commentGateway, timerGateway });
  });

  const setup = (commentsArea: CommentsAreaType, user?: AuthenticatedUser) => {
    store.dispatch(setCurrentCommentsArea(commentsArea));

    if (user) {
      store.dispatch(setAuthenticatedUser(user));
    }

    render(
      <Test store={store}>
        <CommentsArea commentsAreaId={commentsArea.id} />
      </Test>,
    );
  };

  it('displays a comments area', () => {
    const commentsArea = createCommentsArea({ comments: [createComment({ text: 'comment' })] });

    setup(commentsArea);

    expect(screen.getByText('comment')).toBeVisible();
  });

  it('searches through the comments', async () => {
    const comment1 = createComment({ text: 'comment 1' });
    const comment2 = createComment({ text: 'comment 2' });

    const commentsArea = createCommentsArea({ comments: [comment1, comment2] });

    setup(commentsArea);
    commentsAreaGateway.searchComments.resolvesTo(paginated([comment1]));

    userEvent.type(screen.getByPlaceholderText('Rechercher...'), 'science');

    await act(() => timerGateway.invokeTimeout());

    expect(screen.getByText('comment 1')).toBeVisible();
    expect(screen.queryByText('comment 2')).toEqual(null);
  });

  it('sorts the comments', async () => {
    const commentsArea = createCommentsArea();

    setup(commentsArea);
    commentsAreaGateway.fetchRootComments.resolvesTo(paginated([]));

    userEvent.click(screen.getByTitle('Trier les commentaires'));
    userEvent.click(screen.getByText('Les plus anciens en premier'));

    expect(commentsAreaGateway.fetchRootComments).toHaveBeenCalledWith([
      commentsArea.id,
      expect.objectWith({ sort: SortType.dateAsc }),
    ]);
  });

  it('navigates through the comments pages', async () => {
    const commentsArea = createCommentsArea({ comments: array(31, () => createComment()) });

    setup(commentsArea);
    commentsAreaGateway.fetchRootComments.resolvesTo(paginated([]));

    for (const title of ['Page suivante', 'Dernière page', 'Page précédente', 'Première page']) {
      userEvent.click(screen.getByTitle(title));
    }

    expect(commentsAreaGateway.fetchRootComments).toHaveBeenCalledExactlyWith(
      [2, 4, 3, 1].map((page) => [commentsArea.id, expect.objectWith({ page })]),
    );
  });

  it('creates a root comment', async () => {
    const author = createAuthenticatedUser();
    const commentsArea = createCommentsArea();
    const createdComment = createCommentDto({ text: 'commentaire intéressant' });

    setup(commentsArea, author);
    commentGateway.createComment.resolvesTo(createdComment);

    await type(screen.getByPlaceholderText('Rédiger un commentaire...'), createdComment.text);
    userEvent.click(screen.getByText('Envoyer'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Rédiger un commentaire...')).toHaveValue('');
    });

    expect(screen.getByText(createdComment.text)).toBeVisible();
  });
});
