import React, { forwardRef, useRef } from 'react';

import { ThemeProvider } from '@emotion/react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import theme from 'src/theme';

import CommentsAreaForm, { CommentAreaFormProps, CommentsAreaFormRef } from './CommentAreaForm';

const defaultProps: CommentAreaFormProps = {
  fieldErrors: {},
  isSubmitting: false,
  clearFieldError: () => {},
  onCancel: () => {},
  onSubmit: () => {},
};

// eslint-disable-next-line react/display-name
const Test = forwardRef<CommentsAreaFormRef, Partial<CommentAreaFormProps>>((props, ref) => (
  <ThemeProvider theme={theme}>
    <CommentsAreaForm ref={ref} {...defaultProps} {...props} />
  </ThemeProvider>
));

describe('CommentsAreaForm', () => {
  it('fill and submit a comments area request', async () => {
    const onSubmit = jest.fn();

    render(<Test onSubmit={onSubmit} />);

    await act(async () => {
      await userEvent.type(screen.getByPlaceholderText("Titre de l'information"), 'title', { delay: 1 });
      await userEvent.type(screen.getByPlaceholderText("URL de l'information"), 'url', { delay: 1 });
      await userEvent.type(screen.getByPlaceholderText('Auteur'), 'author', { delay: 1 });
      await userEvent.type(screen.getByPlaceholderText('Date de publication'), '10022021', { delay: 1 });

      userEvent.click(screen.getByRole('button', { name: "Demander l'ouverture" }));
    });

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'title',
      url: 'url',
      author: 'author',
      publicationDate: '2021-02-10T00:00:00.000Z',
    });
  });

  it('clear the comments area form', async () => {
    const Component: React.FC = () => {
      const ref = useRef<CommentsAreaFormRef>(null);

      return (
        <>
          <button onClick={() => ref.current?.reset()}>reset</button>
          <Test ref={ref} />
        </>
      );
    };

    render(<Component />);

    await act(async () => {
      await userEvent.type(screen.getByPlaceholderText("Titre de l'information"), 'title', { delay: 1 });
      await userEvent.type(screen.getByPlaceholderText("URL de l'information"), 'url', { delay: 1 });
      await userEvent.type(screen.getByPlaceholderText('Auteur'), 'author', { delay: 1 });
      await userEvent.type(screen.getByPlaceholderText('Date de publication'), '10022021', { delay: 1 });

      userEvent.click(screen.getByRole('button', { name: 'reset' }));
    });

    expect(screen.getByPlaceholderText("Titre de l'information")).toHaveValue('');
    expect(screen.getByPlaceholderText("URL de l'information")).toHaveValue('');
    expect(screen.getByPlaceholderText('Auteur')).toHaveValue('');
    expect(screen.getByPlaceholderText('Date de publication')).toHaveValue('');
  });
});
