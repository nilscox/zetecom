import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';
import { seed, User } from './api/seed';

import { clear, click, expectEvent, type, visitPopup, within } from './utils';

import users from './fixtures/users.json';
import { flushEmails, getEmails, viewEmail } from './utils/emails';

const [, , me, user1] = users as User[];

mocha.timeout(10000);
mocha.slow(8000);

describe('authentication', () => {
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

  it('naviagtion', async () => {
    const { getByRole } = await visitPopup();

    expect(iframe.location?.pathname).to.eql('/popup/connexion');

    click(getByRole('link', { name: 'Créer un compte' }));
    expect(iframe.location?.pathname).to.eql('/popup/inscription');

    click(getByRole('link', { name: 'Mot de passe oublié' }));
    expect(iframe.location?.pathname).to.eql('/popup/connexion-par-email');

    click(getByRole('link', { name: 'Connexion' }));
    expect(iframe.location?.pathname).to.eql('/popup/connexion');
  });

  it('login', async () => {
    const { getByPlaceholderText, getByRole, findByText } = await visitPopup();

    const emailField = getByPlaceholderText('Adresse email');
    const passwordField = getByPlaceholderText('Mot de passe');
    const loginButton = getByRole('button', { name: 'Connexion' });

    expect(loginButton).to.have.attr('disabled');

    await type(emailField, me.email);
    await type(passwordField, 'invalid');

    expect(loginButton).not.to.have.attr('disabled');
    click(loginButton);

    findByText('Combinaison email / mot de passe non valide');

    await clear(passwordField);
    await type(passwordField, me.password);

    click(loginButton);

    expectEvent({ category: 'Authentication', action: 'Login', name: 'Login From Popup' });

    await waitFor(() => expect(iframe.location?.pathname).to.eql('/popup'));
  });

  it('signup', async () => {
    const { getByRole, getByPlaceholderText, getByText } = await visitPopup();

    click(getByRole('link', { name: 'Créer un compte' }));

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
    // expect(acceptRulesCheckbox).to.have.attr('checked');

    expect(signupButton).not.to.have.attr('disabled');
    click(signupButton);

    await expectEvent({ category: 'Authentication', action: 'Signup', name: 'Signup From Popup' });

    const emails = await getEmails();

    expect(emails).to.have.lengthOf(1);

    await viewEmail(emails[0].id);

    await within(iframe.document!.body!, async ({ findAllByText, getByRole }) => {
      findAllByText('Bienvenue sur Zétécom !');
      const link = getByRole('link', { name: 'Valider mon adresse email' });
      await iframe.navigate(link.getAttribute('href') as string);
    });

    await within(iframe.document!.body!).findByText('Votre adresse email a été validée ! 🎉');
  });
});
