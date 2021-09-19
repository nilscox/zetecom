import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { seed, User, as, login, getComment, getCommentsAreaByIdentifier, getNotifications } from '../../api';
import { click, expectEvent, visitIntegration, within } from '../../utils';

import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';

import { getCommentAt, getCommentId } from './index';

const [, , me, user1, user2] = users as User[];
const [, commentsArea2] = commentsAreas;

describe('Subscription', () => {
  let iframe: IFrame;

  before('get iframe', function () {
    iframe = this.iframe;
  });

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
    console.log(comment);
    await within(comment, async ({ getByRole, getByTestId }) => {
      click(getByRole('button', { name: 'Voir les réponses' }));
      await waitFor(() => getByTestId('comment'));
    });
  };

  it('subscribe', async () => {
    const { id: commentsAreaId } = await getCommentsAreaByIdentifier('test:subscribe');

    await login(me1);
    await visitIntegration('test:subscribe', window.location.href);

    await waitFor(() => expect(getCommentAt(0)).to.be.visible);

    const comment = getCommentAt(0);
    const commentId = getCommentId(comment);

    await within(comment, async ({ getByTitle }) => {
      click(getByTitle("S'abonner aux réponses"));
      await waitFor(() => getByTitle('Se désabonner'));
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

    const [notification] = notifications.items;
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

    await within(comment, async ({ getByTitle }) => {
      click(getByTitle('Se désabonner'));
      await waitFor(() => getByTitle("S'abonner aux réponses"));
    });

    expectEvent({ category: 'Comment', action: 'Unsubscribe' });

    await waitFor(async () => {
      expect(await getComment(commentId)).to.have.property('subscribed', false);
    });

    await asUser1.createComment(commentsAreaId, commentId, 'reply');

    expect(await getNotifications()).to.have.property('total', 0);
  });
});
