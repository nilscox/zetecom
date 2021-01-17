import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import sinon from 'sinon';
import { IFrame } from 'testea';

import commentsAreas from './fixtures/comments-areas.json';
import users from './fixtures/users.json';

import { as } from './api/as';
import { seed, User } from './api/seed';

import {
  clear,
  click,
  expectEvent,
  getQueriesForIframe,
  type,
  visitCommentHistory,
  visitCommentReport,
  visitIntegration,
  wait,
  within,
} from './utils';
import { login, logout } from './api/auth';
import { createComment, getComment, getCommentHistory } from './api/comment';
import { getCommentsAreaByIdentifier } from './api/comments-area';
import { getNotifications } from './api/notification';

mocha.timeout(10000);
mocha.slow(8000);

const [, moderator, me, user1, user2, user3, user4] = users as User[];

const [commentsArea1, commentsArea2, commentsArea3] = commentsAreas;

describe('Comment', () => {
  let iframe: IFrame;

  before('get iframe', function () {
    iframe = this.iframe;
  });

  const getComments = () => {
    return getQueriesForIframe().queryAllByTestId('comment');
  };

  const getCommentAt = (index: number) => {
    return getComments()[index];
  };

  const getCommentId = (element: HTMLElement) => {
    return Number(element.getAttribute('id')?.replace('comment-', ''));
  };

  describe('list comments', () => {
    before('seed', async () => {
      await seed({ users: [user1, user2, user3], commentsAreas: [commentsArea3] });
    });

    const expectComments = (ids: number[]) => {
      const comments = getComments();

      expect(comments).to.have.length(ids.length);

      for (const [n, id] of ids.entries()) {
        expect(comments[n]).to.have.id(`comment-${id}`);
      }
    };

    it('comments list', async () => {
      const { getByText } = await visitIntegration(commentsArea3.identifier, window.location.href);

      await waitFor(() => getByText(/2 text/i));

      within(getCommentAt(2), ({ getByRole }) => {
        click(getByRole('button', { name: /2 réponses/i }));
      });

      await waitFor(() => getByText(/2\.1 text/i));

      await within(getCommentAt(4), async ({ getByRole }) => {
        await waitFor(() => getByRole('button', { name: /1 réponse/i }));
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

  describe('display comment', () => {
    before('seed', async () => {
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

      await waitFor(() => getByText(/Hello!/));

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

      await waitFor(() => getByText(/Hello!/));

      for (const reaction of ['approve', 'refute', 'skeptic']) {
        expect(iframe.body?.querySelector(`.reaction--${reaction}`)).not.to.have.attr('disabled');
      }

      expect(getByTitle(/s'abonner/i)).not.to.have.attr('disabled');
      expect(getByRole('button', { name: /répondre/i })).not.to.have.attr('disabled');
    });

    it('display comment authenticated as author', async () => {
      await login(user2);

      const { getByText, getByTitle } = await visitIntegration(commentsArea2.identifier, window.location.href);

      await waitFor(() => getByText(/Hello!/));

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

      await waitFor(() => getByText('Hello!'));

      click(getByText(/21 réponses/));
      await waitFor(() => getByText('reply 1'));

      click(getByText(/11 commentaires restants/));
      await waitFor(() => getByText('reply 11'));

      click(getByText(/1 commentaire restant/));
      await waitFor(() => getByText('reply 21'));
    });

    describe('comment history', () => {
      before('seed', async () => {
        await seed({
          users: [user1, user2],
          commentsAreas: [
            { ...commentsArea2, comments: [{ ...commentsArea2.comments[0], history: ['ding', 'dong'] }] },
          ],
        });
      });

      it('open comment history popup', async () => {
        const { getByText } = await visitIntegration(commentsArea2.identifier, window.location.href);

        await waitFor(() => getByText('dong'));

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

  describe('create / update comment', () => {
    const asUser1 = as(user1);

    beforeEach('seed', async () => {
      await seed({ users: [user1, me], commentsAreas: [commentsArea1] });
    });

    it('post comment', async () => {
      await login(me);

      const { getByText, getByPlaceholderText, getByRole } = await visitIntegration(
        commentsArea1.identifier,
        window.location.href
      );

      await waitFor(() => expect(getByText(me.nick)));

      await type(getByPlaceholderText('Composez votre message...'), 'Hello!');

      click(getByRole('button', { name: /aperçu/i }));
      expect(getByText('Hello!'));

      click(getByRole('button', { name: /editer/i }));
      expect(getByPlaceholderText('Composez votre message...')).to.have.value('Hello!');

      click(getByRole('button', { name: /envoyer/i }));

      await expectEvent({ category: 'Comment', action: 'Create' });

      await waitFor(() => expect(getCommentAt(0)).to.exist);

      within(getCommentAt(0), ({ getByText }) => {
        getByText('Hello!');
      });

      expect(getByPlaceholderText('Composez votre message...')).to.have.value('');

      await type(getByPlaceholderText('Composez votre message...'), 'I am **strong**\n\n- one\n- two');

      click(getByRole('button', { name: /envoyer/i }));

      await waitFor(() => expect(getCommentAt(1)).to.exist);

      within(getCommentAt(0), ({ getByText, queryAllByRole }) => {
        expect(getByText('strong')).to.have.tagName('strong');
        expect(queryAllByRole('listitem')).to.have.length(2);
      });
    });

    it('edit comment', async () => {
      const { id: commentsAreaId } = await getCommentsAreaByIdentifier(commentsArea1.identifier);

      await login(me);
      await createComment(commentsAreaId, null, 'initial text');

      const { getByRole, getByText } = await visitIntegration(commentsArea1.identifier, window.location.href);

      await waitFor(() => getByText('initial text'));

      click(getByRole('button', { name: 'Éditer votre message' }));

      await within(getCommentAt(0), async ({ getByPlaceholderText, getByRole }) => {
        const input = getByPlaceholderText('Éditez votre message...');

        expect(input).to.have.value('initial text');

        clear(input);
        await type(input, 'edited text');

        click(getByRole('button', { name: 'Envoyer' }));
      });

      await expectEvent({ category: 'Comment', action: 'Edit' });

      await waitFor(() => expect(getByText('edited text')).not.to.have.tagName('textarea'));

      await within(getCommentAt(0), async ({ getByText }) => {
        const date = getByText(/^\* Le \d+ [a-z]+ \d{4} à \d{2}:\d{2}$/);

        expect(date).to.have.attribute('title', 'Édité');
        expect(getComputedStyle(date)).to.have.property('font-style', 'italic');
      });

      const commentId = getCommentId(getCommentAt(0));
      const comment = await getComment(commentId);

      expect(comment).to.have.property('edited').that.is.a('string');

      const history = await getCommentHistory(commentId);

      expect(history).to.have.length(2);
      expect(history[0]).to.have.property('text', 'edited text');
      expect(history[1]).to.have.property('text', 'initial text');
    });

    it('post reply', async () => {
      const { id: commentsAreaId } = await getCommentsAreaByIdentifier(commentsArea1.identifier);

      await asUser1.createComment(commentsAreaId, null, 'What is the question?');

      await login(me);
      const { getByText } = await visitIntegration(commentsArea1.identifier, window.location.href);

      await waitFor(() => getByText('What is the question?'));

      await within(getCommentAt(0), async ({ getByRole, getByTestId }) => {
        click(getByRole('button', { name: 'Répondre' }));

        // TODO
        click(getByRole('Fermer'));
        await waitFor(() =>
          expect(getComputedStyle(getByTestId('comment-form'))).to.have.property('visibility', 'hidden')
        );
      });

      await within(getCommentAt(0), async ({ getByRole, getByPlaceholderText }) => {
        click(getByRole('button', { name: 'Répondre' }));

        const textArea = getByPlaceholderText('Répondez à ' + user1.nick);
        await type(textArea, 'This is the answer.');

        click(getByRole('button', { name: 'Envoyer' }));

        // TODO: name Reply
        await expectEvent({ category: 'Comment', action: 'Create' });

        await waitFor(() => expect(getComputedStyle(textArea)).to.have.property('visibility', 'hidden'));
        getByText('This is the answer.');
      });
    });
  });

  describe('reaction', () => {
    before('seed', async () => {
      await seed({ users: [user1, user2, user3, me], commentsAreas: [commentsArea3] });
    });

    it('unauthenticated', async () => {
      await visitIntegration(commentsArea3.identifier, window.location.href);

      await waitFor(() => expect(getCommentAt(0)).to.be.visible);

      expect(iframe.body?.querySelectorAll('.reaction--approve')[0]).to.have.attr('disabled');
    });

    it('authenticated as author', async () => {
      await login(user3);
      await visitIntegration(commentsArea3.identifier, window.location.href);

      await waitFor(() => expect(getCommentAt(0)).to.be.visible);

      expect(iframe.body?.querySelectorAll('.reaction--approve')[0]).to.have.attr('disabled');

      await logout();
    });

    it('add / update / unset reaction', async () => {
      await login(me);
      await visitIntegration(commentsArea3.identifier, window.location.href);

      await waitFor(() => expect(getCommentAt(0)).to.be.visible);

      const comment = getCommentAt(1);
      const commentId = getCommentId(comment);

      // TODO: use labels
      const approve = iframe.body?.querySelectorAll('.reaction--approve')[1];
      const refute = iframe.body?.querySelectorAll('.reaction--refute')[1];
      const skeptic = iframe.body?.querySelectorAll('.reaction--skeptic')[1];

      const mapReactions = { approve, refute, skeptic };

      const reactions = ['approve', 'refute', 'skeptic'] as const;
      type Reaction = typeof reactions[number];

      const expectReactions = async (userReaction: Reaction | null, expected: { [key in Reaction]: number }) => {
        for (const reaction of reactions) {
          const reactionElement = mapReactions[reaction];

          expect(reactionElement).to.have.text(String(expected[reaction]));

          if (reaction === userReaction) {
            expect(reactionElement).to.have.class('user-reaction');
          } else {
            expect(reactionElement).not.to.have.class('user-reaction');
          }
        }

        await waitFor(async () => {
          const comment = await getComment(commentId);

          for (const reaction of reactions) {
            expect(comment).to.have.nested.property(`reactionsCount.${reaction}`, expected[reaction]);
          }
        });
      };

      click(approve!);

      await expectEvent({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "approve"' });
      await expectReactions('approve', { approve: 3, refute: 0, skeptic: 0 });

      click(skeptic!);

      await expectEvent({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "skeptic"' });
      await expectReactions('skeptic', { approve: 2, refute: 0, skeptic: 1 });

      click(skeptic!);

      // TODO: Uset Reaction
      await expectEvent({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "null"' });
      await expectReactions(null, { approve: 2, refute: 0, skeptic: 0 });
    });
  });

  describe('subscription', () => {
    const me1 = { ...me, nick: 'me1', email: 'me1@domain.tld' };
    const me2 = { ...me, nick: 'me2', email: 'me2@domain.tld' };

    const asUser1 = as(user1);

    before('seed', async () => {
      await seed({
        users: [me1, me2, user1, user2],
        commentsAreas: [
          { ...commentsArea2, identifier: 'test:subscribe' },
          { ...commentsArea2, identifier: 'test:unsubscribe', comments: [{ author: me2.nick, text: 'text' }] },
        ],
      });
    });

    const openReplies = async (comment: HTMLElement) => {
      await within(comment, async ({ getByRole, getByTestId }) => {
        click(getByRole('button', { name: /\d réponses?/ }));
        await waitFor(() => expect(getByTestId('comment')));
      });
    };

    it('subscribe', async () => {
      const { id: commentsAreaId } = await getCommentsAreaByIdentifier('test:subscribe');

      await login(me1);
      await visitIntegration('test:subscribe', window.location.href);

      await waitFor(() => expect(getCommentAt(0)).to.be.visible);

      const comment = getCommentAt(0);
      const commentId = getCommentId(comment);

      within(comment, ({ getByTitle }) => {
        click(getByTitle("S'abonner"));
        getByTitle('Se désabonner');
      });

      expectEvent({ category: 'Comment', action: 'Subscribe' });

      await waitFor(async () => {
        expect(await getComment(commentId)).to.have.property('subscribed', true);
      });

      await asUser1.createComment(commentsAreaId, commentId, 'reply');

      await iframe.reload();
      await waitFor(() => expect(getCommentAt(0)).to.be.visible);

      await openReplies(getCommentAt(0));

      const reply = getCommentAt(1);
      const replyId = getCommentId(reply);

      const notifications = await getNotifications();
      expect(notifications).to.have.property('total', 1);
      expect(notifications).to.have.property('items').that.have.length(1);

      const notification = notifications.items[0];
      expect(notification).to.have.property('seen', false);
      expect(notification).to.have.property('type', 'subscriptionReply');
      expect(notification).to.have.nested.property('payload.commentsAreaId', commentsAreaId);
      expect(notification).to.have.nested.property('payload.commentId', commentId);
      expect(notification).to.have.nested.property('payload.replyId', replyId);
      expect(notification).to.have.nested.property('payload.author.nick', user1.nick);
      expect(notification).to.have.nested.property('payload.text', 'reply');
    });

    it('unsubscribe', async () => {
      const { id: commentsAreaId } = await getCommentsAreaByIdentifier('test:unsubscribe');

      await login(me2);
      await visitIntegration('test:unsubscribe', window.location.href);

      await waitFor(() => expect(getCommentAt(0)).to.be.visible);

      const comment = getCommentAt(0);
      const commentId = getCommentId(comment);

      within(comment, ({ getByTitle }) => {
        click(getByTitle('Se désabonner'));
        getByTitle("S'abonner");
      });

      expectEvent({ category: 'Comment', action: 'Unsubscribe' });

      await waitFor(async () => {
        expect(await getComment(commentId)).to.have.property('subscribed', false);
      });

      await asUser1.createComment(commentsAreaId, commentId, 'reply');

      expect(await getNotifications()).to.have.property('total', 0);
    });
  });

  describe('report', () => {
    const asModerator = as(moderator);

    before('seed', async () => {
      await seed({ users: [moderator, me, user1, user2], commentsAreas: [commentsArea2] });
    });

    it('open the report popup', async () => {
      await login(me);
      const { getByText } = await visitIntegration(commentsArea2.identifier, window.location.href);

      await waitFor(() => expect(getCommentAt(0)).to.exist);

      expect(getComputedStyle(getByText('Signaler'))).to.have.property('opacity', '0');

      await userEvent.hover(getByText(/^Le \d+ [a-z]+ \d{4} à \d{2}:\d{2}$/));
      await waitFor(() => {
        expect(getComputedStyle(getByText('Signaler'))).to.have.property('opacity', '1');
      });

      const openStub = sinon.stub(iframe.contentWindow!, 'open');

      click(getByText('Signaler'));

      expect(openStub.calledOnce).to.be.true;
      expect(openStub.firstCall.args).to.eql([
        '/integration/comment/1/report',
        '_blank',
        'width=600,height=800,resizable=no',
      ]);
    });

    it('report a comment', async () => {
      const message = 'The bullshit is strong with this one';

      await login(me);
      const { getByText, getByPlaceholderText, getByRole } = await visitCommentReport(1);

      await waitFor(() => expect(getByText('Signaler le commentaire de ' + user2.nick)));

      expect(getByText(commentsArea2.comments[0].text));

      await type(getByPlaceholderText('Précisez en quelques mots le motif du signalement si nécessaire'), message);

      const closeStub = sinon.stub(iframe.contentWindow!, 'close');

      click(getByRole('button', { name: 'Signaler' }));

      expectEvent({ category: 'Comment', action: 'Report' });
      await waitFor(() => expect(getByText('Le commentaire a été signalé, merci pour votre contribution ! 💪')));
      await waitFor(() => expect(closeStub.calledOnce).to.be.true, { timeout: 5000 });

      const reports = await asModerator.getReports();

      expect(reports).to.have.property('total', 1);
      expect(reports).to.have.nested.property('items.[0].id', 1);
      expect(reports).to.have.nested.property('items.[0].reports').that.have.length(1);
      expect(reports).to.have.nested.property('items.[0].reports.[0].message', message);
      expect(reports).to.have.nested.property('items.[0].reports.[0].reportedBy.nick', me.nick);
    });
  });
});
