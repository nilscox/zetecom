import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';
import { seed, User } from '../api/seed';

import { clear, click, expectEvent, type, visitPopup, wait, within } from '../utils';

import users from '../fixtures/users.json';
import { flushEmails, getEmails, viewEmail } from '../utils/emails';
import { login, logout } from '../api/auth';

const [, , me, user1, user2] = users as User[];

describe('Authentication', () => {
  let iframe: IFrame;

  before(function () {
    iframe = this.iframe;
  });

  before('seed', async () => {
    await seed({ users: [me] });
  });

  beforeEach('flush emails', async () => {
    await flushEmails();
  });

  beforeEach(() => {
    window.addEventListener('message', message => {
      if (message.data?.type === 'getIntegrationState') {
        iframe.contentWindow?.postMessage(
          { type: 'integrationState', available: false, loaded: false },
          iframe.contentWindow.origin
        );
      }

      if (message.data?.type === 'getExtensionConfig') {
        iframe.contentWindow?.postMessage(
          { type: 'extensionConfig', mediaIntegrations: {} },
          iframe.contentWindow.origin
        );
      }
    });
  });

  it('naviagtion', async () => {
    const { getByRole } = await visitPopup();

    click(getByRole('tab', { name: 'Connexion' }));
    expect(iframe.location?.pathname).to.eql('/popup/connexion');

    click(getByRole('link', { name: 'Créer un compte' }));
    expect(iframe.location?.pathname).to.eql('/popup/inscription');

    click(getByRole('link', { name: 'Mot de passe oublié' }));
    expect(iframe.location?.pathname).to.eql('/popup/lien-de-connexion');

    click(getByRole('link', { name: 'Connexion' }));
    expect(iframe.location?.pathname).to.eql('/popup/connexion');
  });

  it('login', async () => {
    const { getByPlaceholderText, getByRole, getByText } = await visitPopup('/connexion');

    const emailField = getByPlaceholderText('Adresse email');
    const passwordField = getByPlaceholderText('Mot de passe');
    const loginButton = getByRole('button', { name: 'Connexion' });

    expect(loginButton).to.have.attr('disabled');

    await type(emailField, me.email);
    await type(passwordField, 'invalid');

    expect(loginButton).not.to.have.attr('disabled');
    click(loginButton);

    await waitFor(() => getByText('Combinaison email / mot de passe non valide'));

    await clear(passwordField);
    await type(passwordField, me.password);

    click(loginButton);

    await expectEvent({ category: 'authentication', action: 'login', name: 'login from popup' });

    await waitFor(() => expect(iframe.location?.pathname).to.eql('/popup/compte'));
  });

  it('signup', async () => {
    const { getByRole, getByPlaceholderText, getByText, findByText } = await visitPopup('/inscription');

    const emailField = getByPlaceholderText('Adresse email');
    const passwordField = getByPlaceholderText('Mot de passe');
    const nickField = getByPlaceholderText('Pseudo');
    const acceptRulesCheckbox = getByRole('checkbox', { name: /J'accepte la charte/ });
    const signupButton = getByRole('button', { name: 'Inscription' });

    expect(signupButton).to.have.attr('disabled');

    await type(emailField, user1.email);
    await type(passwordField, user1.password);
    await type(nickField, user1.nick);

    click(acceptRulesCheckbox);
    getByText(/Il est important que chaque membre ait pris connaissance de la charte\./);

    click(acceptRulesCheckbox);

    expect(signupButton).not.to.have.attr('disabled');
    click(signupButton);

    // emails can take a while to be sent in CI
    await wait(500);
    await expectEvent({ category: 'authentication', action: 'signup', name: 'signup from popup' });

    await findByText('Pour finaliser votre inscription, un email vous a été envoyé à ' + user1.email);

    const emails = await getEmails();

    expect(emails).to.have.lengthOf(1);
    await viewEmail(emails[0].id);

    const link = await within(iframe.body!, async ({ findAllByText, getByRole }) => {
      await findAllByText(`Bienvenue sur Zétécom, ${user1.nick} !`);

      const anchor = getByRole('link', { name: 'Valider mon adresse email' });

      return anchor.getAttribute('href') as string;
    });

    await iframe.navigate(link);

    await within(iframe.body!, async ({ getByText }) => {
      await waitFor(() => {
        getByText(user1.nick);
        getByText('Votre adresse email a bien été validée ! Bienvenue 🎉');
      });
    });
  });

  it('logout', async () => {
    await login(me);
    const { getByRole, findByText } = await visitPopup('/compte');

    await findByText(me.nick);

    click(getByRole('button', { name: 'Déconnexion' }));

    await expectEvent({ category: 'authentication', action: 'logout', name: 'logout from popup' });

    await waitFor(() => {
      expect(iframe.location?.pathname).to.eql('/popup/connexion');
    });

    await iframe.reload();
    await waitFor(() => expect(iframe.location?.pathname).to.eql('/popup/connexion'));
  });

  it('request authentication link', async () => {
    const { getByRole, getByPlaceholderText, findByText } = await visitPopup('/lien-de-connexion');

    const emailField = getByPlaceholderText('Adresse email');

    await type(emailField, me.email);
    click(getByRole('button', { name: 'Envoyer' }));

    await findByText("Un email contenant un lien de connexion vient d'être envoyé à l'adresse me@domain.tld.");

    await expectEvent({
      category: 'authentication',
      action: 'request authentication link',
      name: 'request authentication link from popup',
    });

    // login email are sent asynchronously
    await wait(500);

    const emails = await getEmails();

    expect(emails).to.have.lengthOf(1);
    await viewEmail(emails[0].id);

    await within(iframe.document!.body!, async ({ findAllByText, getByRole }) => {
      findAllByText('Connexion par email');
      const link = getByRole('link', { name: 'Je me connecte' });
      await iframe.navigate(link.getAttribute('href') as string);
    });

    await within(iframe.document!.body!).findByText(me.nick);
    await within(iframe.document!.body!).findByText(/Vous êtes maintenant connecté\.e/);
  });

  it('change password', async () => {
    await login(me);
    const { getByRole, getByPlaceholderText, findByText } = await visitPopup('/compte');

    click(getByRole('link', { name: 'Changer de mot de passe' }));
    await wait(100);

    const passwordField = getByPlaceholderText('Nouveau mot de passe');

    await type(passwordField, 'yo{enter}');
    await findByText('Ce mot de passe est trop court');

    await clear(passwordField);
    await type(passwordField, new Array(100).fill('a').join('') + '{enter}');
    await findByText('Ce mot de passe est trop long :o');

    await clear(passwordField);
    await type(passwordField, 'newpassword42{enter}');
    await findByText('Votre mot de passe a bien été mis à jour.');

    await expectEvent({ category: 'authentication', action: 'password changed' });

    await logout();
    await login({ email: me.email, password: 'newpassword42' });
  });

  it('signup conflicts', async () => {
    const { getByPlaceholderText, getByRole, findByText } = await visitPopup('/inscription');

    const emailField = getByPlaceholderText('Adresse email');
    const passwordField = getByPlaceholderText('Mot de passe');
    const nickField = getByPlaceholderText('Pseudo');
    const acceptRulesCheckbox = getByRole('checkbox', { name: /J'accepte la charte/ });
    const signupButton = getByRole('button', { name: 'Inscription' });

    await type(emailField, me.email);
    await type(passwordField, user2.password);
    await type(nickField, user2.nick);
    await click(acceptRulesCheckbox);
    await click(acceptRulesCheckbox);
    await click(signupButton);

    await findByText('Cette adresse est déjà utilisée');

    clear(emailField);
    clear(nickField);
    await type(emailField, user2.email);
    await type(passwordField, user2.password);
    await type(nickField, me.nick);
    await click(signupButton);

    await findByText('Ce pseudo est déjà utilisé');
  });
});
