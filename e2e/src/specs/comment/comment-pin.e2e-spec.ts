import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { seed, User } from '../../api';
import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';
import { click, visitIntegration, within } from '../../utils';

import { getCommentAt } from './index';

const [, , , user1, user2, user3, user4] = users as User[];
const [, , commentsArea3] = commentsAreas;

describe('Comment pin', () => {
  let iframe: IFrame;

  before('get iframe', function () {
    iframe = this.iframe;
  });

  before('seed', async () => {
    await seed({
      users: [user1, user2, user3, user4],
      commentsAreas: [commentsArea3],
    });
  });

  const pin = async (comment: HTMLElement) => {
    await waitFor(() => {
      within(comment, ({ getByRole }) => {
        click(getByRole('button', { name: /épingler/i }));
      });
    });
  };

  const unpin = () => {
    within(getCommentAt(0), ({ getByRole }) => {
      click(getByRole('button', { name: /désépingler/i }));
    });
  };

  it('pin a comment', async () => {
    const { getByText, getAllByTestId, queryByText } = await visitIntegration(commentsArea3.identifier);

    await waitFor(() => getByText(/comment 1 text/));

    await pin(getCommentAt(0));
    await waitFor(() => getByText('Commentaire épinglé :'));
    expect(getByText(/comment 4 text/)).to.be.visible;

    unpin();
    await waitFor(() => getByText(/comment 1 text/));

    await pin(getCommentAt(1));
    await waitFor(() => getByText(/comment 3 text/));

    click(getByText(/désépingler/i));
    await waitFor(() => getByText(/comment 1 text/));

    within(getCommentAt(2), ({ getByText }) => click(getByText(/2 réponses/i)));
    await waitFor(() => getByText(/comment 2\.2 text/));
    within(getCommentAt(4), ({ getByText }) => click(getByText(/1 réponse/i)));
    await waitFor(() => getByText(/comment 2\.2\.1 text/));
    await pin(getCommentAt(5));

    await waitFor(() => getByText(/comment 2\.2\.1 text/));

    expect(getByText(/comment 2\.2 text/)).to.be.visible;
    expect(getByText(/comment 2 text/)).to.be.visible;

    within(getAllByTestId('comment-ancestor')[1], ({ getByTitle }) => click(getByTitle(/épingler/i)));

    await waitFor(() => expect(queryByText(/comment 2\.2\.1 text/)).to.be.null);
    await waitFor(() => getByText(/comment 2\.2 text/));

    unpin();
    await waitFor(() => getByText(/comment 2 text/));
  });
});
