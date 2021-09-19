import React from 'react';

import { render, screen } from '@testing-library/react';
import { createCommentsArea, setCommentsArea, Store } from '@zetecom/app-core';
import { MockCommentGateway } from '@zetecom/app-core/shared/mocks';
import { expect } from 'earljs';

import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';

import { CommentsAreaOutline } from './CommentsAreaOutline';

describe('CommentsAreaOutline', () => {
  let store: Store;

  const commentGateway = new MockCommentGateway();

  beforeEach(() => {
    store = configureStore({ commentGateway });
  });

  it('renders the summary of a comments area', () => {
    const commentsArea = createCommentsArea({ commentsCount: 1 });

    store.dispatch(setCommentsArea(commentsArea));

    render(
      <Test store={store}>
        <CommentsAreaOutline commentsAreaId={commentsArea.id} link="" />
      </Test>,
    );

    expect(screen.getByText('1 commentaire'));
  });

  it('displays the number of comments = 0', () => {
    const commentsArea = createCommentsArea({ commentsCount: 0 });

    store.dispatch(setCommentsArea(commentsArea));

    render(
      <Test store={store}>
        <CommentsAreaOutline commentsAreaId={commentsArea.id} link="" />
      </Test>,
    );

    expect(screen.getByText('0 commentaires'));
  });

  it('displays the number of comments > 1', () => {
    const commentsArea = createCommentsArea({ commentsCount: 2 });

    store.dispatch(setCommentsArea(commentsArea));

    render(
      <Test store={store}>
        <CommentsAreaOutline commentsAreaId={commentsArea.id} link="" />
      </Test>,
    );

    expect(screen.getByText('2 commentaires'));
  });
});
