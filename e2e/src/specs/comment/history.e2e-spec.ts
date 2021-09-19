import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { IFrame } from 'testea';

import { seed, User } from '../../api';
import { click, visitIntegration, visitCommentHistory } from '../../utils';

import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';
import { getCommentAt, getCommentId } from './index';
import { within } from '../../utils/index';

const [, , , user1, user2] = users as User[];
const [, commentsArea2] = commentsAreas;

const lorem = `Tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad ask for petting. Play with twist ties.
Bring your owner a dead bird eat a rug and furry furry hairs everywhere oh no human coming lie on counter don't get off counter for morning beauty routine of licking self.`;

const history = [
  {
    date: '2020-02-10T12:05:00.000Z',
    text: `Hello!

This is the initial text.

It looks pretty good already, but there is a miskate riht there.
So I'll have to edit it later.

${lorem}

> Note for later: I need to buy some milk...`,
  },
  {
    date: '2020-02-10T12:10:00.000Z',
    text: `Hello!

This is the second edition.

It looks great, but there is a miskate riht there.
So I'll have to edit it later.
This line was added.

${lorem}

> Note for later: I need to buy some milk...`,
  },
  {
    date: '2020-02-10T14:23:00.000Z',
    text: `Hello!

This is the third edition.

It looks amazing, becasue there is no mistake right there.
This line was added.

${lorem}

> Note: I went to buy some milk, but couldn't find any
> I'll have to go back, I guess...`,
  },
  {
    date: '2020-02-12T17:56:00.000Z',
    text: `Hello!

This is the fourth, and last edition.

It looks very amazing.
This line was added.

${lorem}

> Note: I went to buy some milk, but couldn't find any
> I'll have to go back, I guess...`,
  },
];

describe('History', () => {
  let iframe: IFrame;

  before('get iframe', function () {
    iframe = this.iframe;
  });

  before('seed', async () => {
    const message = history[0];

    await seed({
      users: [user1, user2],
      commentsAreas: [
        {
          ...commentsArea2,
          comments: [
            {
              ...commentsArea2.comments[0],
              text: message.text,
              created: message.date,
              history: history.slice(1),
            },
          ],
        },
      ],
    });
  });

  it('open comment history popup', async () => {
    const { getByText } = await visitIntegration(commentsArea2.identifier, window.location.href);

    await waitFor(() => getByText('user2'));

    const comment = await getCommentAt(0);
    const commentId = getCommentId(comment);

    const openStub = sinon.stub(iframe.contentWindow!, 'open');

    within(comment).getByText(/This is the fourth, and last edition\./);

    const editionDate = within(comment).getByText('* Le 12 février 2020 à 17h56');

    expect(editionDate).to.have.attribute('title', "Voir l'historique d'édition");
    click(editionDate);

    await waitFor(() => expect(openStub.calledOnce).to.be.true);

    expect(openStub.firstCall.args).to.eql([
      `/commentaire/${commentId}/historique`,
      '_blank',
      'width=1000,height=800,resizable=no',
    ]);
  });

  it('display comment history', async () => {
    const { getByText, getByLabelText, getByTitle } = await visitCommentHistory(1);

    await waitFor(() => getByText("Historique d'éditions"));

    const versionSelect = getByLabelText('Version');

    getByText(user2.nick);

    getByText('Le 10 février 2020 à 14h23');
    getByText('Le 12 février 2020 à 17h56');

    expect(getByText('third')).to.have.tagName('del');
    expect(getByText('fourth, and last')).to.have.tagName('ins');

    expect(versionSelect).to.have.value('4');

    click(getByTitle('Version précédente'));

    getByText('Le 10 février 2020 à 12h10');
    getByText('Le 10 février 2020 à 14h23');

    expect(getByText('second')).to.have.tagName('del');
    expect(getByText('third')).to.have.tagName('ins');

    expect(versionSelect).to.have.value('3');

    userEvent.selectOptions(versionSelect, '2');
    expect(versionSelect).to.have.value('2');

    click(getByTitle('Version suivante'));
    expect(versionSelect).to.have.value('3');
  });
});
