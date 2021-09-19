import React from 'react';

import { setAuthenticatedUser, setUser } from '@zetecom/app-core/modules/authentication/actions';
import { Route } from 'react-router-dom';

import { Demo } from '~/demos';
import { dougForcett } from '~/fixtures';

import { ExtensionPopupView } from './ExtensionPopupView';

export const extensionPopup: Demo = {
  prepare: ({ history }) => {
    history.push('/popup');
  },
  render: () => (
    <Route path="/popup">
      <ExtensionPopupView />
    </Route>
  ),
};

export const extensionPopupAuthenticated: Demo = {
  description: 'For an authenticated user',
  prepare: ({ history, store }) => {
    history.push('/popup');
    store.dispatch(setUser(dougForcett));
    store.dispatch(setAuthenticatedUser(dougForcett));
  },
  render: () => (
    <Route path="/popup">
      <ExtensionPopupView />
    </Route>
  ),
};
