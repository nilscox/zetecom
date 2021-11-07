import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { as } from '../api/as';
import { login } from '../api/auth';
import { seed, User } from '../api/seed';
import { click, expectEvent, type, visitApp, visitIntegration, within } from '../utils';

import users from '../fixtures/users.json';
import commentsAreas from '../fixtures/comments-areas.json';

const [, moderator, , user1, user2] = users as User[];
const [commentsArea1, commentsArea2] = commentsAreas;

const asModerator = as(moderator);

describe('Comments area', () => {
  let iframe: IFrame;

  beforeEach(async function () {
    iframe = this.iframe;
    await iframe.clearCookies();
  });

  describe('list', () => {
    before(async () => {
      await seed({ users: [user1, user2], commentsAreas: [commentsArea1, commentsArea2] });
    });

    const getCommentsAreas = () => {
      return within(iframe.body!).getAllByTestId('comments-area');
    };

    const getCommentsAreaAt = (place: number) => {
      return getCommentsAreas()[place];
    };

    it('should list the comments areas', async () => {
      const { getByText } = await visitApp();

      await waitFor(() => getByText('Information title 1'));

      expect(getCommentsAreas()).to.have.length(2);

      within(getCommentsAreaAt(0), ({ getByText }) => {
        getByText('Information title 2');
        getByText('Someone');
        getByText('18 juin 2015');
        getByText('1 commentaire');
      });

      within(getCommentsAreaAt(1), ({ getByText }) => {
        getByText('Information title 1');
        getByText('Anyone');
        getByText('10 février 2020');
        getByText('0 commentaires');
      });

      click(getByText('Information title 1'));
      expect(iframe.location?.pathname).to.eql('/commentaires/1');
    });

    it.skip('should search for a comments area', async () => {
      const { getByPlaceholderText, getByText } = await visitApp();

      await waitFor(() => type(getByPlaceholderText('Rechercher...'), 'title 2'));
      await waitFor(() => expect(getCommentsAreas()).to.have.length(1));
      getByText('Information title 2');
    });
  });

  describe('Comments area request', () => {
    before(async () => {
      await seed({ users: [moderator, user1] });
    });

    beforeEach(async () => {
      await login(user1);
    });

    it('should request to open a new comments area from the integration', async () => {
      const identifier = 'test:1';
      const pageUrl = 'https://page.url';

      const { getByRole, getByText } = await visitIntegration(identifier, pageUrl);

      await waitFor(() => click(getByRole('button', { name: "Demander l'ouverture" })));

      await waitFor(() => {
        getByText(/La demande d'ouverture a bien été prise en compte/);
      });

      await expectEvent({
        category: 'comments-area',
        action: 'comments area requested',
      });

      const { items } = await asModerator.getCommentsAreaRequests();
      const item = items[items.length - 1];

      expect(item).to.have.property('identifier', identifier);
      expect(item).to.have.property('informationUrl', pageUrl);
    });
  });
});
