import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Comment, createComment, createUser } from '@zetecom/app-core';
import { MockCommentGateway } from '@zetecom/app-core/shared/mocks';

import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';

import { ReportComment } from './ReportComment';

describe('ReportComment', () => {
  let commentGateway: MockCommentGateway;

  const setup = (comment: Comment) => {
    commentGateway = new MockCommentGateway();

    commentGateway.reportComment.resolvesToOnce(undefined);

    const store = configureStore({ commentGateway });

    render(
      <Test store={store}>
        <ReportComment comment={comment} />
      </Test>,
    );
  };

  it('display the comment to report', () => {
    const author = createUser({ nick: 'Toto' });
    const comment = createComment({ author, text: 'Gros nul.' });

    setup(comment);

    screen.getByText('Signaler le commentaire de Toto');
    screen.getByText('Vous êtes sur le point de signaler un commentaire.');
    screen.getByText('Gros nul.');
  });

  it('reports a comment with a message', async () => {
    const comment = createComment();
    const message = "C'est lui le gros nul.";

    setup(comment);

    userEvent.type(screen.getByRole('textbox'), message);

    act(() => {
      fireEvent.submit(screen.getByRole('button', { name: 'Signaler' }));
    });

    await waitFor(() => {
      screen.getByText(/Le commentaire a bien été signalé/);
    });
  });
});
