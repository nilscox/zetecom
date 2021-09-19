import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';

// prettier-ignore
import { as, login, createComment, getComment, getCommentHistory, getCommentsAreaByIdentifier, seed, User } from '../../api';
import { clear, click, expectEvent, type, visitIntegration, wait, within } from '../../utils';

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

    const { getByText, getByPlaceholderText, getByRole } = await visitIntegration(commentsArea1.identifier);

    await waitFor(() => expect(getByText(me.nick)));

    await type(getByPlaceholderText('Rédiger un commentaire...'), 'Hello!');

    click(getByRole('tab', { name: 'Aperçu' }));
    expect(getByText('Hello!'));

    click(getByRole('tab', { name: 'Éditer' }));
    expect(getByPlaceholderText('Rédiger un commentaire...')).to.have.value('Hello!');

    click(getByRole('button', { name: 'Envoyer' }));

    // await expectEvent({ category: 'Comment', action: 'Create' });

    await waitFor(() => expect(getCommentAt(0)).to.exist);

    within(getCommentAt(0), ({ getByText }) => {
      getByText('Hello!');
    });

    expect(getByPlaceholderText('Rédiger un commentaire...')).to.have.value('');

    await type(getByPlaceholderText('Rédiger un commentaire...'), 'I am **strong**\n\n- one\n- two');

    click(getByRole('button', { name: 'Envoyer' }));

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

    const { getByRole, getByText } = await visitIntegration(commentsArea1.identifier);

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
      const date = getByText(/^\* Le \d+ [a-z]+ \d{4} à \d{2}h\d{2}$/);

      expect(date).to.have.attribute('title', "Voir l'historique d'édition");
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
    const { getByText } = await visitIntegration(commentsArea1.identifier);

    await waitFor(() => getByText('What is the question?'));

    await within(getCommentAt(0), async ({ getByTitle, getByPlaceholderText }) => {
      click(getByText('Répondre'));

      click(getByTitle('Fermer le formulaire de réponse'));

      await waitFor(() =>
        expect(getComputedStyle(getByPlaceholderText(`Répondez à ${user1.nick}...`))).to.have.property(
          'visibility',
          'hidden'
        )
      );
    });

    await within(getCommentAt(0), async ({ getByRole, getByPlaceholderText }) => {
      click(getByText('Répondre'));
      await wait(500);

      const textArea = getByPlaceholderText(`Répondez à ${user1.nick}...`);

      await type(textArea, 'This is the answer.');
      click(getByRole('button', { name: 'Envoyer' }));

      // TODO: name Reply
      await expectEvent({ category: 'Comment', action: 'Create' });

      await waitFor(() => expect(getComputedStyle(textArea)).to.have.property('visibility', 'hidden'));
      expect(getComputedStyle(getByText('This is the answer.'))).to.have.property('visibility', 'visible');
    });
  });
});
