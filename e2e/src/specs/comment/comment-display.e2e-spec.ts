import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { login, seed, User } from '../../api';
import { click, visitIntegration } from '../../utils';

import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';
import { reactionTitle } from '../../utils/reactions';

const [, , , user1, user2, user3, user4] = users as User[];
const [, commentsArea2] = commentsAreas;

describe('Comment display', () => {
  let iframe: IFrame;

  before('get iframe', function () {
    iframe = this.iframe;
  });

  before('seed', async () => {
    const commentsArea = {
      ...commentsArea2,
      comments: [
        {
          ...commentsArea2.comments[0],
          text: 'Hello!\n\n**I am strong**^42',
          reactions: { like: ['user1', 'user3'], approve: ['user4'] },
        },
      ],
    };

    await seed({
      users: [user1, user2, user3, user4],
      commentsAreas: [commentsArea],
    });
  });

  it('display comment unauthenticated', async () => {
    const { getByText, getByTitle, queryByRole, queryByTitle } = await visitIntegration(
      commentsArea2.identifier,
      window.location.href
    );

    await waitFor(() => getByText('Hello!'));

    getByText('user2');
    getByText(/^Le \d+ [a-z]+ \d{4} à \d{2}h\d{2}$/);

    expect(getByText('I am strong')).to.have.tagName('strong');
    expect(getByText('42')).to.have.tagName('sup');

    const like = getByTitle(reactionTitle.like);
    expect(like).to.have.text('❤️2');
    expect(like).to.have.attr('disabled');

    const approve = getByTitle(reactionTitle.approve);
    expect(approve).to.have.text('👍1');
    expect(approve).to.have.attr('disabled');

    const think = getByTitle(reactionTitle.think);
    expect(think).to.have.text('🧠0');
    expect(think).to.have.attr('disabled');

    const disagree = getByTitle(reactionTitle.disagree);
    expect(disagree).to.have.text('🤨0');
    expect(disagree).to.have.attr('disabled');

    const dontUnderstand = getByTitle(reactionTitle.dontUnderstand);
    expect(dontUnderstand).to.have.text('❓0');
    expect(dontUnderstand).to.have.attr('disabled');

    expect(getByText(/0 réponse/)).to.have.attr('disabled');

    expect(queryByTitle("S'abonner")).to.be.null;
    expect(queryByRole('button', { name: /répondre/ })).to.be.null;
  });

  it('display comment authenticated', async () => {
    await login(user1);

    const { getByText, getByTitle, getByRole } = await visitIntegration(commentsArea2.identifier, window.location.href);

    await waitFor(() => getByText(/Hello!/));

    for (const title of Object.values(reactionTitle)) {
      expect(getByTitle(title)).not.to.have.attr('disabled');
    }

    expect(getByTitle(/s'abonner/i)).not.to.have.attr('disabled');
    expect(getByRole('button', { name: /répondre/i })).not.to.have.attr('disabled');
  });

  it('display comment authenticated as author', async () => {
    await login(user2);

    const { getByText, getByTitle } = await visitIntegration(commentsArea2.identifier, window.location.href);

    await waitFor(() => getByText(/Hello!/));

    getByTitle('Éditer votre message');
    getByTitle('Se désabonner');
  });

  it.skip('comment replies pagination', async () => {
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
});
