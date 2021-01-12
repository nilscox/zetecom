import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import sinon from 'sinon';
import { IFrame } from 'test-runner';

import commentsAreas from './fixtures/comments-areas.json';
import users from './fixtures/users.json';

import { as } from './api/as';
import { seed, User } from './api/seed';

import { clear, click, type, visitCommentHistory, visitIntegration, within } from './utils';
import { login } from './api/auth';

mocha.timeout(10000);
mocha.slow(8000);

const [, moderator, user1, user2, user3, user4] = users as User[];

const [, commentsArea2, commentsArea3] = commentsAreas;

const asModerator = as(moderator);
const asUser1 = as(user1);

describe('Comment', () => {
  let iframe: IFrame;

  beforeEach(async function () {
    iframe = this.iframe;
    await iframe.clearCookies();
  });

  describe('list', () => {
    before(async () => {
      await seed({ users: [user1, user2, user3], commentsAreas: [commentsArea3] });
    });

    const getComments = () => {
      return iframe.document!.querySelectorAll<HTMLElement>('.comment');
    };

    const getCommentAt = (index: number) => {
      return getComments()[index];
    };

    const expectComments = (ids: number[]) => {
      const comments = getComments();

      expect(comments).to.have.length(ids.length);

      for (const [n, id] of ids.entries()) {
        expect(comments[n]).to.have.id(`comment-${id}`);
      }
    };

    it('comments list', async () => {
      const { getByText } = await visitIntegration(commentsArea3.identifier, window.location.href);

      await waitFor(() => getByText(/2 text/i), { timeout: 2000 });

      within(getCommentAt(2), ({ getByRole }) => {
        click(getByRole('button', { name: /2 réponses/i }));
      });

      await waitFor(() => getByText(/2\.1 text/i));

      await within(getCommentAt(4), async ({ getByRole }) => {
        // await waitFor(() => getByRole('button', { name: /1 réponse/i }));
        click(getByRole('button', { name: /1 réponse/i }));
      });

      await waitFor(() => getByText(/2\.2\.1 text/i));

      within(getCommentAt(2), ({ getByRole }) => {
        click(getByRole('button', { name: /2 réponses/i }));
      });

      await waitFor(() => {
        expect(getComputedStyle(getByText(/2\.2\.1 text/i))).to.have.property('visibility', 'hidden');
        expect(getComputedStyle(getByText(/ 2\.1 text/i))).to.have.property('visibility', 'hidden');
      });
    });

    it('comments list search', async () => {
      const { getByPlaceholderText } = await visitIntegration(commentsArea3.identifier, window.location.href);

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
      const { getByTitle, getByRole } = await visitIntegration(commentsArea3.identifier, window.location.href);

      const sort = async (sort: RegExp) => {
        userEvent.click(getByTitle('Tri'));
        userEvent.click(getByRole('menuitem', { name: sort }));
      };

      await waitFor(() => getByTitle('Tri'));

      await sort(/les plus anciens en premier/i);
      await waitFor(() => expectComments([1, 3, 7, 8]));

      await sort(/les plus récents en premier/i);
      await waitFor(() => expectComments([8, 7, 3, 1]));

      await sort(/les plus pertinents en premier/i);
      await waitFor(() => expectComments([3, 1, 7, 8]));
    });

    it('comments list pagination', async () => {
      await seed({
        users: [user1, user2],
        commentsAreas: [
          {
            ...commentsArea2,
            comments: Array(21)
              .fill(null)
              .map((_, n) => ({ ...commentsArea2.comments[0], text: `comment ${n + 1}` })),
          },
        ],
      });

      const { getByTitle, getByText } = await visitIntegration(commentsArea2.identifier, window.location.href);

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
        getByText('1 / 3');
        getByText('comment 21');
        expectNavigationDisabled([true, true, false, false]);
      });

      click(getByTitle('Page suivante'));

      await waitFor(() => {
        getByText('2 / 3');
        getByText('comment 11');
        expectNavigationDisabled([false, false, false, false]);
      });

      click(getByTitle('Page suivante'));

      await waitFor(() => {
        getByText('3 / 3');
        getByText('comment 1');
        expectNavigationDisabled([false, false, true, true]);
      });

      click(getByTitle('Page précédente'));
      await waitFor(() => getByText('2 / 3'));

      click(getByTitle('Page précédente'));
      await waitFor(() => getByText('1 / 3'));

      click(getByTitle('Dernière page'));
      await waitFor(() => getByText('3 / 3'));

      click(getByTitle('Première page'));
      await waitFor(() => getByText('1 / 3'));
    });
  });

  describe('comment', () => {
    before(async () => {
      const commentsArea = {
        ...commentsArea2,
        comments: [
          {
            ...commentsArea2.comments[0],
            text: 'Hello!\n\n**I am strong**^42',
            reactions: { approve: ['user1', 'user3'], refute: ['user4'] },
          },
        ],
      };

      await seed({
        users: [user1, user2, user3, user4],
        commentsAreas: [commentsArea],
      });
    });

    it('display comment unauthenticated', async () => {
      const { getByText, queryByRole, getByRole, queryByTitle } = await visitIntegration(
        commentsArea2.identifier,
        window.location.href
      );

      await waitFor(() => getByText(/Hello!/), { timeout: 2000 });

      getByText('user2');
      getByText(/^Le \d+ [a-z]+ \d{4} à \d{2}:\d{2}$/);

      expect(getByText('I am strong')).to.have.tagName('strong');
      expect(getByText('42')).to.have.tagName('sup');

      // TODO: use labels
      const approve = iframe.body?.querySelector('.reaction--approve');
      expect(approve).to.have.text('2');
      expect(approve).to.have.attr('disabled');

      const refute = iframe.body?.querySelector('.reaction--refute');
      expect(refute).to.have.text('1');
      expect(refute).to.have.attr('disabled');

      const skeptic = iframe.body?.querySelector('.reaction--skeptic');
      expect(skeptic).to.have.text('0');
      expect(skeptic).to.have.attr('disabled');

      expect(getByRole('button', { name: /0 réponse/i })).to.have.attr('disabled');

      expect(queryByTitle("S'abonner")).to.be.null;
      expect(queryByRole('button', { name: /répondre/i })).to.be.null;
    });

    it('display comment authenticated', async () => {
      await login(user1);

      const { getByText, getByTitle, getByRole } = await visitIntegration(
        commentsArea2.identifier,
        window.location.href
      );

      await waitFor(() => getByText(/Hello!/), { timeout: 2000 });

      for (const reaction of ['approve', 'refute', 'skeptic']) {
        expect(iframe.body?.querySelector(`.reaction--${reaction}`)).not.to.have.attr('disabled');
      }

      expect(getByTitle(/s'abonner/i)).not.to.have.attr('disabled');
      expect(getByRole('button', { name: /répondre/i })).not.to.have.attr('disabled');
    });

    it('display comment authenticated as author', async () => {
      await login(user2);

      const { getByText, getByTitle } = await visitIntegration(commentsArea2.identifier, window.location.href);

      await waitFor(() => getByText(/Hello!/), { timeout: 2000 });

      getByTitle(/éditer votre message/i);
      getByTitle(/se désabonner/i);
    });

    it('comment replies pagination', async () => {
      await seed({
        users: [user1, user2],
        commentsAreas: [
          {
            ...commentsArea2,
            comments: [
              {
                ...commentsArea2.comments[0],
                replies: Array(21)
                  .fill(null)
                  .map((_, n) => ({ ...commentsArea2.comments[0], text: `reply ${n + 1}` })),
              },
            ],
          },
        ],
      });

      const { getByText } = await visitIntegration(commentsArea2.identifier, window.location.href);

      await waitFor(() => getByText('Hello!'), { timeout: 2000 });

      click(getByText(/21 réponses/));
      await waitFor(() => getByText('reply 1'));

      click(getByText(/11 commentaires restants/));
      await waitFor(() => getByText('reply 11'));

      click(getByText(/1 commentaire restant/));
      await waitFor(() => getByText('reply 21'));
    });

    describe('comment history', () => {
      before(async () => {
        await seed({
          users: [user1, user2],
          commentsAreas: [
            { ...commentsArea2, comments: [{ ...commentsArea2.comments[0], history: ['ding', 'dong'] }] },
          ],
        });
      });

      it('open comment history popup', async () => {
        const { getByText } = await visitIntegration(commentsArea2.identifier, window.location.href);

        await waitFor(() => getByText('dong'), { timeout: 2000 });

        const openStub = sinon.stub(iframe.contentWindow!, 'open');

        click(getByText(/^\* Le \d+ [a-z]+ \d{4} à \d{2}:\d{2}$/));

        await waitFor(() => expect(openStub.calledOnce).to.be.true);

        expect(openStub.firstCall.args).to.eql([
          '/integration/comment/1/history',
          '_blank',
          'width=600,height=800,resizable=no',
        ]);
      });

      // TODO
      it('display comment history', async () => {
        const { getByText } = await visitCommentHistory(1);
      });
    });
  });
});
