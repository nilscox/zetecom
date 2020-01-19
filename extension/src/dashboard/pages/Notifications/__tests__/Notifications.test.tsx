import React from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import mockAxios, { mockAxiosResponse } from 'src/testing/jest-mock-axios';

import { UserProvider } from 'src/utils/UserContext';

import Notifications from '../index';

import mockedNotifications from './mock.json';

jest.mock('src/dashboard/components/Authenticated', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}));

const mockUser: any = {
  id: 1,
  nick: 'nick',
  avatar: null,
  email: 'email@domain.tld',
  created: new Date().toString(),
  updated: new Date().toString(),
};

describe('Notifications', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should display the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <Notifications />
        </UserProvider>
      </BrowserRouter>,
    );

    expect(getByText('Notifications')).toBeVisible();
  });

  it('should render the list of notifications', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <Notifications />
        </UserProvider>
      </BrowserRouter>,
    );

    await mockAxiosResponse(
      { data: mockedNotifications },
    );

    expect(getByText('bopzor'));
    expect(getByText('a répondu à une réaction sur l\'information'));
    expect(getByText('FAKE new'));
  });

  it('should display fallback message if no notification', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <Notifications />
        </UserProvider>
      </BrowserRouter>,
    );

    await mockAxiosResponse(
      { data: { items: [], total: 0 } },
    );

    expect(getByText('Vous n\'avez pas de nouvelles notifications'));
  });
});
