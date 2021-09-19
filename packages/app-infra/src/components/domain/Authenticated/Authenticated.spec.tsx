import { render, screen } from '@testing-library/react';
import { AuthenticatedUser, createAuthenticatedUser, Store } from '@zetecom/app-core';
import {
  setAuthenticatedUser,
  setIsFetchingAuthenticatedUser,
  setUser,
} from '@zetecom/app-core/modules/authentication/actions';
import { expect } from 'earljs';
import { createMemoryHistory, History } from 'history';

import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';

import { Authenticated } from './Authenticated';

describe('Authenticated', () => {
  let store: Store;
  let history: History;

  const setup = (user?: AuthenticatedUser) => {
    store = configureStore({});
    history = createMemoryHistory();

    if (user) {
      store.dispatch(setUser(user));
    }

    if (user) {
      store.dispatch(setAuthenticatedUser(user));
    }

    render(
      <Test store={store} history={history}>
        <Authenticated>ok</Authenticated>
      </Test>,
    );
  };

  it('redirects to the authentication view when the user is not authenticated', () => {
    setup();

    expect(history.location.pathname).toEqual('/connexion');
    expect(screen.queryByText('ok')).toEqual(null);
  });

  it('renders the underlying component when the user is authenticated', () => {
    setup(createAuthenticatedUser());

    expect(history.location.pathname).toEqual('/');
    screen.getByText('ok');
  });

  it('renders a loader while the authenticated user is being fetched', () => {
    setup();

    store.dispatch(setIsFetchingAuthenticatedUser(true));

    screen.getByTestId('loader');
  });
});
