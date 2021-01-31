import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';

// prettier-ignore
import { as, login, createComment, getComment, getCommentHistory, getCommentsAreaByIdentifier, seed, User } from '../../api';
import { clear, click, expectEvent, type, visitIntegration, within } from '../../utils';

import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';

import { getCommentAt, getCommentId } from './index';

const [, , me, user1] = users as User[];
const [commentsArea1] = commentsAreas;

describe('Comment mutations', () => {
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
