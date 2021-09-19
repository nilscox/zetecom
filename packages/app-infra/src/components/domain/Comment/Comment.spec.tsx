import React from 'react';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AuthenticatedUser,
  Comment as CommentType,
  createAuthenticatedUser,
  createComment,
  createCommentDto,
  createCommentsArea,
  createReactionsCount,
  createUser,
  paginated,
  ReactionType,
  setAuthenticatedUser,
  setComment,
  setCommentsArea,
  Store,
} from '@zetecom/app-core';
import { setCurrentCommentsArea } from '@zetecom/app-core/modules/commentsArea/actions';
import { MockCommentGateway, MockRouterGateway } from '@zetecom/app-core/shared/mocks';
import { expect } from 'earljs';

import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';

import { Comment } from './Comment';

describe('Comment', () => {
  let store: Store;

  const commentGateway = new MockCommentGateway();
  const routerGateway = new MockRouterGateway();

  beforeEach(() => {
    store = configureStore({ commentGateway, routerGateway });
  });

  const setup = (comment: CommentType, user?: AuthenticatedUser) => {
    const commentsArea = createCommentsArea();

    store.dispatch(setCommentsArea(commentsArea));
    store.dispatch(setCurrentCommentsArea(commentsArea));

    store.dispatch(setComment(comment));

    if (user) {
      store.dispatch(setAuthenticatedUser(user));
    }

    return render(
      <Test store={store}>
        <Comment commentId={comment.id} />
      </Test>,
    );
  };

  const comment = createComment({
    author: createUser({ nick: 'somebody' }),
    date: new Date(2020, 1, 10, 12, 55),
    text: 'text with _markdown_',
    reactionsCount: createReactionsCount({
      approve: 1,
      disagree: 2,
    }),
    repliesCount: 2,
  });

  it('displays a comment', () => {
    setup(comment);

    expect(screen.getByText('somebody')).toBeVisible();

    expect(screen.getByText('Le 10 février 2020 à 12h55')).toBeVisible();

    expect(screen.getByText('text with')).toBeVisible();
    expect(screen.getByText('markdown')).toBeVisible();

    expect(screen.getByRole('button', { name: "Je suis d'accord" })).toHaveText(/1/);
    expect(screen.getByRole('button', { name: "Je ne suis pas d'accord" })).toHaveText(/2/);

    const replyButton = screen.getByRole('button', { name: 'Voir les réponses' });

    expect(replyButton).toBeVisible();
    expect(replyButton).toHaveText('2 réponses');
  });

  it('displays an edited comment', () => {
    setup({ ...comment, edited: comment.date });

    expect(screen.getByText('* Le 10 février 2020 à 12h55')).toBeVisible();
  });

  it('displays a comment without replies', () => {
    setup({ ...comment, repliesCount: 0 });

    expect(screen.getByText('0 réponse')).toBeDisabled();
  });

  it('displays a comment as an unauthenticated user', () => {
    setup(comment);

    expect(screen.queryByRole('button', { name: 'Répondre' })).toEqual(null);
    expect(screen.getByRole('button', { name: "J'aime" })).toBeDisabled();
    expect(screen.queryByRole('button', { name: /S'abonner aux réponses/ })).toEqual(null);
    expect(screen.queryByRole('button', { name: /Signaler/ })).toEqual(null);
  });

  it("opens a comment's replies", async () => {
    const replies = [createCommentDto({ text: 'reply1' }), createCommentDto({ text: 'reply2' })];

    setup(comment);

    commentGateway.fetchReplies.resolvesTo(paginated(replies));

    userEvent.click(screen.getByText('2 réponses'));

    await waitFor(() => {
      expect(screen.getByText('reply1')).toBeVisible();
      expect(screen.getByText('reply2')).toBeVisible();
    });
  });

  it('edits a comment', async () => {
    setup(comment, createAuthenticatedUser(comment.author));

    commentGateway.editComment.resolvesTo(createCommentDto({ text: 'edited' }));

    userEvent.click(screen.getByTitle('Éditer votre message'));
    expect(screen.getByPlaceholderText('Éditez votre message...')).toBeVisible();

    userEvent.click(screen.getByTitle("Fermer le formulaire d'édition"));
    expect(screen.queryByPlaceholderText('Éditez votre message...')).toEqual(null);

    userEvent.click(screen.getByTitle('Éditer votre message'));

    const textArea = screen.getByPlaceholderText('Éditez votre message...');

    userEvent.type(textArea, 'edited');

    act(() => {
      fireEvent.submit(textArea);
    });

    await waitFor(() => {
      expect(screen.getByText('edited')).toBeVisible();
    });
  });

  it('replies to a comment', async () => {
    const replies = [createComment({ text: 'reply' })];
    const createdReply = createCommentDto({ text: 'This is a reply' });

    setup({ ...comment, replies, repliesCount: 1 }, createAuthenticatedUser());

    commentGateway.createComment.resolvesTo(createdReply);

    userEvent.click(screen.getAllByText('Répondre')[0]);

    expect(screen.getByText('reply')).toBeVisible();

    const textArea = screen.getByPlaceholderText(`Répondez à ${comment.author.nick}...`);

    userEvent.type(textArea, createdReply.text);

    act(() => {
      fireEvent.submit(textArea);
    });

    await waitFor(() => {
      expect(screen.getByText(createdReply.text)).toBeVisible();
    });
  });

  it("set a comment's reaction", () => {
    setup(comment, createAuthenticatedUser());

    commentGateway.updateReaction.resolvesTo(undefined);

    userEvent.click(screen.getByText(/^🧠/));

    expect(commentGateway.updateReaction).toHaveBeenCalledWith([comment.id, ReactionType.think]);
  });

  it('subscribes to a comment', () => {
    setup(comment, createAuthenticatedUser());

    commentGateway.setSubscription.resolvesTo(undefined);

    const subscribeButton = screen.getByTitle("S'abonner aux réponses");

    userEvent.click(subscribeButton);
    userEvent.click(subscribeButton);

    expect(commentGateway.setSubscription).toHaveBeenCalledExactlyWith([
      [comment.id, true],
      [comment.id, false],
    ]);
  });

  it('opens the comment report popup', () => {
    setup(comment, createAuthenticatedUser());

    routerGateway.openPopup.returns(undefined);

    const reportLink = screen.getByRole('link', { name: 'Signaler' });

    expect(reportLink).toHaveStyle({ opacity: '0' });
    act(() => void fireEvent.mouseOver(reportLink));
    expect(reportLink).toHaveStyle({ opacity: '1' });

    userEvent.click(reportLink);

    expect(routerGateway.openPopup).toHaveBeenCalledWith([`/commentaire/${comment.id}/signaler`]);
  });
});
