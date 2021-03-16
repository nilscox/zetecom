import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';

import { seed, User } from '../../api';
import { clear, click, type, visitIntegration, within } from '../../utils';

import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';

import { getCommentAt, queryComments } from './index';

const [, , , user1, user2, user3] = users as User[];
const [, commentsArea2, commentsArea3] = commentsAreas;

describe('Comments list', () => {
  before('seed', async () => {
    await seed({ users: [user1, user2, user3], commentsAreas: [commentsArea3] });
  });

  const expectComments = (ids: number[]) => {
    const comments = queryComments();

    expect(comments).to.have.length(ids.length);

    for (const [n, id] of ids.entries()) {
      expect(comments[n]).to.have.id(`comment-${id}`);
    }
  };

  it('comments list', async () => {
    const { getByText } = await visitIntegration(commentsArea3.identifier);

    await waitFor(() => getByText(/2 text/i));

    within(getCommentAt(2), ({ getByText }) => {
      click(getByText('2 réponses'));
    });

    await waitFor(() => getByText(/2\.1 text/i));

    await within(getCommentAt(4), async ({ getByText }) => {
      await waitFor(() => getByText(/1 réponse/));
      click(getByText('1 réponse'));
    });

    await waitFor(() => getByText(/2\.2\.1 text/i));

    within(getCommentAt(2), ({ getByText }) => {
      click(getByText('2 réponses'));
    });

    await waitFor(() => {
      expect(getComputedStyle(getByText(/2\.2\.1 text/i))).to.have.property('visibility', 'hidden');
      expect(getComputedStyle(getByText(/ 2\.1 text/i))).to.have.property('visibility', 'hidden');
    });
  });

  it('comments list search', async () => {
    const { getByPlaceholderText } = await visitIntegration(commentsArea3.identifier);

    const search = async (text: string) => {
      clear(getByPlaceholderText('Rechercher...'));
      await type(getByPlaceholderText('Rechercher...'), text);
    };

    await waitFor(() => getByPlaceholderText('Rechercher...'));

    await search('nope');
    await waitFor(() => expectComments([]));

    await search('3 text');
    await waitFor(() => expectComments([7]));
    within(getCommentAt(0), ({ getByText }) => expect(getByText(/3 text/)).to.have.class('highlighted'));

    await search('score = 2');
    await waitFor(() => expectComments([7, 5]));

    await search('@user1');
    await waitFor(() => expectComments([7, 6, 1]));
  });

  it('comments list sort', async () => {
    const { getByTitle, getByRole } = await visitIntegration(commentsArea3.identifier);

    const sort = async (sort: RegExp) => {
      userEvent.click(getByTitle('Trier les commentaires'));
      userEvent.click(getByRole('menuitem', { name: sort }));
    };

    await waitFor(() => getByTitle('Trier les commentaires'));

    await sort(/les plus anciens en premier/i);
    await waitFor(() => expectComments([1, 3, 7, 8]));

    await sort(/les plus récents en premier/i);
    await waitFor(() => expectComments([8, 7, 3, 1]));

    await sort(/les plus pertinents en premier/i);
    await waitFor(() => expectComments([3, 1, 7, 8]));
  });

  it.only('comments list pagination', async () => {
    await seed({
      users: [user1, user2],
      commentsAreas: [
        {
          ...commentsArea2,
          comments: Array(3)
            .fill(null)
            .map((_, n) => ({ ...commentsArea2.comments[0], text: `comment ${n + 1}` })),
        },
      ],
    });

    const { getByTitle, getByText, getByTestId } = await visitIntegration(commentsArea2.identifier);

    const expectPage = (page: number, total: number) => {
      expect(getByTestId('current-page')).to.have.text(String(page));
      expect(getByTestId('total-pages')).to.have.text(String(total));
    };

    const expectNavigationDisabled = (expected: boolean[]) => {
      const titles = ['Première page', 'Page précédente', 'Page suivante', 'Dernière page'];

      for (const [n, title] of titles.entries()) {
        if (expected[n]) {
          expect(getByTitle(title)).to.have.attr('disabled');
        } else {
          expect(getByTitle(title)).not.to.have.attr('disabled');
        }
      }
    };

    await waitFor(() => {
      expectPage(1, 3);
      getByText('comment 21');
      expectNavigationDisabled([true, true, false, false]);
    });

    click(getByTitle('Page suivante'));

    await waitFor(() => {
      expectPage(2, 3);
      getByText('comment 11');
      expectNavigationDisabled([false, false, false, false]);
    });

    click(getByTitle('Page suivante'));

    await waitFor(() => {
      expectPage(3, 3);
      getByText('comment 1');
      expectNavigationDisabled([false, false, true, true]);
    });

    click(getByTitle('Page précédente'));
    await waitFor(() => expectPage(2, 3));

    click(getByTitle('Page précédente'));
    await waitFor(() => expectPage(1, 3));

    click(getByTitle('Dernière page'));
    await waitFor(() => expectPage(3, 3));

    click(getByTitle('Première page'));
    await waitFor(() => expectPage(1, 3));
  });
});
