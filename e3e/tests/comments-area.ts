import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { as } from './api/as';
import { login } from './api/auth';
import { seed, User } from './api/seed';
import { click, expectEvent, type, visitApp, visitIntegration, within } from './utils';

import users from './fixtures/users.json';
import commentsAreas from './fixtures/comments-areas.json';
import { getCommentsAreas } from './api/comments-area';

mocha.timeout(5000);
mocha.slow(8000);

const [, moderator, , user1, user2] = users as User[];
const [commentsArea1, commentsArea2] = commentsAreas;

const asModerator = as(moderator);
const asUser1 = as(user1);

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
      return iframe.body!.querySelectorAll<HTMLElement>('.comments-area');
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
        getByText('18 juin 2015 - 1 commentaire');
      });

      within(getCommentsAreaAt(1), ({ getByText }) => {
        getByText('Information title 1');
        getByText('Anyone');
        getByText('10 février 2020 - 0 commentaires');
      });

      click(getByText('Information title 1'));
      expect(iframe.location?.pathname).to.eql('/commentaires/1');
    });

    it('should search for a comments area', async () => {
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

    it('should request to open a new comments area', async () => {
      const inputs = {
        informationTitle: 'Some great news that must be spread around the world',
        informationUrl: 'https://informations.website/articles/2020/01/01/some-great-news-425169.html',
      };

      const { getByRole, getByPlaceholderText, getByText } = await visitApp();

      await waitFor(() => click(getByRole('button', { name: 'Ouvrir une zone de commentaires' })));

      await type(getByPlaceholderText("Titre de l'information"), inputs.informationTitle);
      await type(getByPlaceholderText("URL de l'information *"), inputs.informationUrl);

      click(getByRole('button', { name: "Demander l'ouverture" }));

      await waitFor(() => {
        getByText("L'ouverture a bien été prise en compte, les modérateurs vont traiter votre demande.");
      });

      await expectEvent({
        category: 'CommentsArea',
        action: 'Request',
        name: 'Request Comments Area From App',
      });

      const { items } = await asModerator.getCommentsAreaRequests();
      const item = items[items.length - 1];

      expect(item).to.have.property('identifier', null);
      expect(item).to.have.property('imageUrl', null);
      expect(item).to.have.property('informationAuthor', null);
      expect(item).to.have.property('informationPublicationDate', null);
      expect(item).to.have.property('informationTitle', inputs.informationTitle);
      expect(item).to.have.property('informationUrl', inputs.informationUrl);
      expect(item).to.have.property('status', 'PENDING');
    });

    it('should request to open a new comments area from the integration', async () => {
      const identifier = 'test:1';
      const pageUrl = 'https://page.url';

      const { getByRole, getByText } = await visitIntegration(identifier, pageUrl);

      await waitFor(() => click(getByRole('button', { name: "Demander l'ouverture" })));

      await waitFor(() => {
        getByText("L'ouverture a bien été prise en compte !");
        getByText('Les modérateurs traiteront votre demande au plus vite.');
      });

      await expectEvent({
        category: 'CommentsArea',
        action: 'Request',
        name: 'Request Comments Area From Integration',
      });

      const { items } = await asModerator.getCommentsAreaRequests();
      const item = items[items.length - 1];

      expect(item).to.have.property('identifier', identifier);
      expect(item).to.have.property('informationUrl', pageUrl);
    });
  });

  describe('Comments area request moderation', () => {
    before(async () => {
      await seed({ users: [moderator, user1] });
    });

    beforeEach(async () => {
      await login(moderator);
    });

    it('should create a new comments area', async () => {
      const informationUrl = 'https://information.url';
      const informationAuthor = 'Someone cool';
      const informationPublicationDate = '2020-05-07T00:00:00.000Z';

      await asUser1.createCommentsAreaRequest({ informationUrl, informationAuthor, informationPublicationDate });

      const { getByRole, getByPlaceholderText, getByText } = await visitApp('/moderation/ouvertures');

      await waitFor(() => {
        expect(getByPlaceholderText("URL de l'information *")).to.have.property('value', informationUrl);
      });
      expect(getByPlaceholderText('Date de publication *')).to.have.property('value', '07 / 05 / 2020');
      expect(getByPlaceholderText("Auteur de l'information *")).to.have.property('value', 'Someone cool');

      await type(getByPlaceholderText("Titre de l'information *"), 'Information title');
      await type(getByPlaceholderText("URL de l'image *"), 'https://image.url');

      click(getByRole('button', { name: 'Ouvrir' }));

      await waitFor(() => getByText('La nouvelle zone de commentaires a bien été créé.'));
      click(getByText('Voir'));

      expect(iframe.location?.pathname).to.eql('/commentaires/1');

      await expectEvent({
        category: 'CommentsArea',
        action: 'Create',
      });

      const { items } = await getCommentsAreas();
      const item = items[items.length - 1];

      expect(item).to.have.property('commentsCount', 0);
      expect(item).to.have.property('id', 1);
      expect(item).to.have.property('imageUrl', 'https://image.url');
      expect(item).to.have.property('informationAuthor', 'Someone cool');
      expect(item).to.have.property('informationPublicationDate', '2020-05-07');
      expect(item).to.have.property('informationTitle', 'Information title');
      expect(item).to.have.property('informationUrl', 'https://information.url');
    });

    it('should reject a comments area request', async () => {
      await asUser1.createCommentsAreaRequest({ informationUrl: 'https://info.url' });

      const { getByRole, getByText } = await visitApp('/moderation/ouvertures');

      await waitFor(() => click(getByRole('button', { name: "Refuser l'ouverture" })));

      await waitFor(() => getByText("La demande d'ouverture a bien été refusée."));

      await expectEvent({
        category: 'CommentsArea',
        action: 'Request Rejected',
      });
    });
  });
});
