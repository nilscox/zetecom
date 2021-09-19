import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createAuthenticatedUser, selectAuthenticatedUser, Store } from '@zetecom/app-core';
import { MockUserGateway } from '@zetecom/app-core/shared/mocks';
import { expect } from 'earljs';
import { createMemoryHistory, History } from 'history';

import { ReactRouterGateway } from '~/gateways/ReactRouterGateway';
import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';
import { waitFor, within } from '~/utils/tests';

import { AuthenticationForm } from './AuthenticationForm';

describe('AuthenticationForm', function () {
  this.slow(250);
  this.timeout(500);

  let store: Store;

  let userGateway: MockUserGateway;
  let routerGateway: ReactRouterGateway;

  let history: History;

  beforeEach(() => {
    history = createMemoryHistory();

    userGateway = new MockUserGateway();
    routerGateway = new ReactRouterGateway(history);

    store = configureStore({ userGateway, routerGateway });
  });

  const setup = (route: string) => {
    history.push(route);

    render(
      <Test store={store} history={history}>
        <AuthenticationForm />
      </Test>,
    );

    return history;
  };

  describe('authentication forms navigation', () => {
    const expectFields = ({ email, password, nick }: { email: boolean; password: boolean; nick: boolean }) => {
      const expectField = (element: HTMLElement, expectVisible: boolean) => {
        if (expectVisible) expect(element).toBeVisible();
        else expect(element).not.toBeVisible();
      };

      expectField(screen.getByPlaceholderText('Adresse email'), email);
      expectField(screen.getByPlaceholderText('Mot de passe'), password);
      expectField(screen.getByPlaceholderText('Pseudo'), nick);
    };

    const expectLinks = (...links: string[]) => {
      within(screen.getByTestId('navigation'), ({ getByText }) => {
        links.forEach(getByText);
      });
    };

    it('navigates between the authentication forms', () => {
      const history = setup('/connexion');

      expectFields({ email: true, password: true, nick: false });
      expectLinks('Créer un compte', 'Mot de passe oublié');

      userEvent.click(screen.getByText('Créer un compte'));

      expect(history.location.pathname).toEqual('/inscription');
      expectFields({ email: true, password: true, nick: true });
      expectLinks('Connexion', 'Mot de passe oublié');

      userEvent.click(screen.getByText('Mot de passe oublié'));

      expect(history.location.pathname).toEqual('/lien-de-connexion');
      expectFields({ email: true, password: false, nick: false });
      expectLinks('Connexion');

      userEvent.click(screen.getByText('Connexion'));

      expect(history.location.pathname).toEqual('/connexion');
    });
  });

  it('requests a link to authenticate without a password', async () => {
    userGateway.requestAuthenticationLink.resolvesTo(undefined);

    setup('/lien-de-connexion');

    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText('Adresse email'), 'email@domain.tld');

    expect(screen.getByRole('button', { name: 'Envoyer' })).not.toBeDisabled();

    act(() => {
      fireEvent.submit(screen.getByText('Envoyer'));
    });

    await waitFor(() => {
      expect(userGateway.requestAuthenticationLink).toHaveBeenCalledWith(['email@domain.tld']);
    });
  });

  it('logs in', async () => {
    const user = createAuthenticatedUser();

    userGateway.login.resolvesTo(user);

    setup('/connexion');

    userEvent.type(screen.getByPlaceholderText('Adresse email'), 'email@domain.tld');
    userEvent.type(screen.getByPlaceholderText('Mot de passe'), 'password');

    expect(screen.getByRole('button', { name: 'Connexion' })).not.toBeDisabled();

    act(() => {
      fireEvent.submit(screen.getByText('Connexion'));
    });

    await waitFor(() => {
      expect(selectAuthenticatedUser(store.getState())).toEqual(user);
    });
  });

  it('signs up', async () => {
    const user = createAuthenticatedUser();

    userGateway.signup.resolvesTo({ ...user, requiresEmailValidation: false });

    setup('/inscription');

    userEvent.type(screen.getByPlaceholderText('Adresse email'), 'email@domain.tld');
    userEvent.type(screen.getByPlaceholderText('Mot de passe'), 'password');
    userEvent.type(screen.getByPlaceholderText('Pseudo'), 'nick');

    const warningText = /Il est important que chaque membre ait pris connaissance de la charte\./;

    expect(screen.getByText(warningText)).not.toBeVisible();

    userEvent.click(screen.getByLabelText("J'accepte la charte."));

    expect(screen.getByText(warningText)).toBeVisible();

    userEvent.click(screen.getByLabelText("J'accepte la charte."));

    expect(screen.getByRole('button', { name: 'Inscription' })).not.toBeDisabled();

    act(() => {
      fireEvent.submit(screen.getByText('Inscription'));
    });

    await waitFor(() => {
      expect(selectAuthenticatedUser(store.getState())).toEqual(user);
    });
  });
});
