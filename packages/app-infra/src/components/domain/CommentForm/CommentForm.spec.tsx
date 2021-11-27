import React from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createAuthenticatedUser, setAuthenticatedUser, Store } from '@zetecom/app-core';
import { MockCommentGateway, MockUserGateway } from '@zetecom/app-core/shared/mocks';
import { expect, mockFn } from 'earljs';

import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';
import { type } from '~/utils/tests';

import { CommentForm, CommentFormProps } from './CommentForm';

describe('CommentForm', () => {
  let store: Store;

  const commentGateway = new MockCommentGateway();

  beforeEach(() => {
    store = configureStore({
      commentGateway,
      userGateway: new MockUserGateway(),
    });
  });

  const setup = (props: Partial<CommentFormProps> = {}) => {
    store.dispatch(setAuthenticatedUser(createAuthenticatedUser()));

    return render(
      <Test store={store}>
        <CommentForm isLoading={false} placeholder="placeholder" onSubmit={() => {}} {...props} />
      </Test>,
    );
  };

  it('writes a comment', async () => {
    const onSubmit = mockFn().returns(undefined);

    setup({ onSubmit });

    await type(screen.getByPlaceholderText('placeholder'), 'hello');

    act(() => {
      fireEvent.submit(screen.getByRole('button', { name: 'Envoyer' }));
    });

    expect(onSubmit).toHaveBeenCalledWith(['hello']);
  });

  it('writes a comment with an initial value', async () => {
    setup({ placeholder: 'placeholder', initialValue: 'initial value' });

    expect(screen.getByPlaceholderText('placeholder')).toHaveValue('initial value');
  });

  it('previews a draft comment', () => {
    setup();

    userEvent.type(screen.getByPlaceholderText('placeholder'), 'message in *markdown*');

    userEvent.click(screen.getByText('Aperçu'));

    expect(screen.getByText('message in')).toBeVisible();
    expect(screen.getByText('markdown')).toBeVisible();
  });

  it('cannot submit the comment if the text is empty', () => {
    setup();

    expect(screen.getByText('Envoyer')).toBeDisabled();
  });

  it('closes the comment form', () => {
    const onClose = mockFn().returns(undefined);

    setup({ onClose, closeButtonTitle: 'close' });

    userEvent.click(screen.getByTitle('close'));

    expect(onClose).toBeExhausted();
  });
});
