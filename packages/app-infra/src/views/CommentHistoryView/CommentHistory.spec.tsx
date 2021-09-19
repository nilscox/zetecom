import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { array, createComment, createCommentEdition, createUser, setComment } from '@zetecom/app-core';
import { MockRouterGateway } from '@zetecom/app-core/shared/mocks';
import { expect } from 'earljs';

import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';

import { CommentHistory } from './CommentHistory';

describe('CommentHistory', () => {
  const before = () => screen.getByLabelText('left').textContent;
  const after = () => screen.getByLabelText('right').textContent;

  beforeEach(() => {
    const comment = createComment({
      author: createUser({ nick: 'Author' }),
      text: 'version 3',
      date: new Date(2020, 0, 1),
      edited: new Date(2020, 0, 3),
      history: array(3, (i) => createCommentEdition({ date: new Date(2020, 0, i + 1), text: `version ${i + 1}` })),
    });

    const store = configureStore({ routerGateway: new MockRouterGateway() });

    store.dispatch(setComment(comment));

    render(
      <Test store={store}>
        <CommentHistory commentId={comment.id} />
      </Test>,
    );
  });

  it("displays a comment's last edition", () => {
    screen.getByText("Historique d'éditions");
    screen.getByText('Author');
    screen.getByText('Le 02 janvier 2020 à 00h00');
    screen.getByText('Le 03 janvier 2020 à 00h00');
  });

  it('changes the revision', () => {
    const select = screen.getByLabelText('Version');
    const beforeIcon = screen.getByRole('button', { name: 'Version précédente' });
    const afterIcon = screen.getByRole('button', { name: 'Version suivante' });

    expect(before()).toEqual('version 2');
    expect(after()).toEqual('version 3');
    expect(select).toHaveValue('3');
    expect(afterIcon).toBeDisabled();

    userEvent.click(beforeIcon);

    expect(before()).toEqual('version 1');
    expect(after()).toEqual('version 2');
    expect(select).toHaveValue('2');
    expect(beforeIcon).toBeDisabled();

    userEvent.selectOptions(select, '2 -&gt; 3');

    expect(select).toHaveValue('3');
  });
});
