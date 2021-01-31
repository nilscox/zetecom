import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { login, seed, User } from '../../api';
import { click, visitIntegration } from '../../utils';

import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';

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

    const { getByText, getByTitle, getByRole } = await visitIntegration(commentsArea2.identifier, window.location.href);

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
});
