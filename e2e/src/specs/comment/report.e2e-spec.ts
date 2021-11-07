import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { IFrame } from 'testea';

import { as, login, seed, User } from '../../api';
import { click, expectEvent, type, visitCommentReport, visitIntegration } from '../../utils';

import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';

import { getCommentAt } from './index';

const [, moderator, me, user1, user2] = users as User[];
const [, commentsArea2] = commentsAreas;

describe('Report', () => {
  let iframe: IFrame;

  before('get iframe', function () {
    iframe = this.iframe;
  });

  const asModerator = as(moderator);

  before('seed', async () => {
    await seed({ users: [moderator, me, user1, user2], commentsAreas: [commentsArea2] });
  });

  it('open the report popup', async () => {
    await login(me);
    const { getByText } = await visitIntegration(commentsArea2.identifier, window.location.href);

    await waitFor(() => expect(getCommentAt(0)).to.exist);

    expect(getComputedStyle(getByText('Signaler'))).to.have.property('opacity', '0');

    await userEvent.hover(getByText(/^Le \d+ [a-z]+ \d{4} à \d{2}h\d{2}$/));
    await waitFor(() => {
      expect(getComputedStyle(getByText('Signaler'))).to.have.property('opacity', '1');
    });

    const openStub = sinon.stub(iframe.contentWindow!, 'open');

    click(getByText('Signaler'));

    expect(openStub.calledOnce).to.be.true;
    expect(openStub.firstCall.args).to.eql(['/commentaire/1/signaler', '_blank', 'width=1000,height=800,resizable=no']);
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

    await expectEvent({ category: 'comment', action: 'comment reported' });

    await waitFor(() => expect(getByText('Le commentaire a bien été signalé, merci pour votre contribution ! 💪')));
    await waitFor(() => expect(closeStub.calledOnce).to.be.true, { timeout: 5000 });

    const reports = await asModerator.getReports();

    expect(reports).to.have.property('total', 1);
    expect(reports).to.have.nested.property('items.[0].id', 1);
    expect(reports).to.have.nested.property('items.[0].reports').that.have.length(1);
    expect(reports).to.have.nested.property('items.[0].reports.[0].message', message);
    expect(reports).to.have.nested.property('items.[0].reports.[0].reportedBy.nick', me.nick);
  });
});
