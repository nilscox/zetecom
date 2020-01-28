import React from 'react';

import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { createMemoryHistory } from 'history';

import { Router, Switch, Route } from 'react-router-dom';

import { UserProvider } from 'src/utils/UserContext';
import Notifications from '../index';

import { NotificationsCountProvider } from 'src/dashboard/contexts/NotificationsCountContext';
import mockAxios, { mockAxiosResponse, mockAxiosResponseFor } from 'src/testing/jest-mock-axios';

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
  let history: any;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/notifications');
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should display the title', () => {
    const { getByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <NotificationsCountProvider>
            <Notifications />
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    expect(getByText('Notifications')).toBeVisible();
  });

  it('should render the list of unseen notifications', async () => {
    const { getByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <NotificationsCountProvider>
            <Notifications />
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    await mockAxiosResponse(
      { data: mockedNotifications },
    );

    expect(getByText('bopzor'));
    expect(getByText('a répondu à une réaction sur l\'information'));
    expect(getByText('FAKE new'));
  });

  it('should render the list of seen notifications', async () => {
    history.push('/notifications/lues');

    const { getByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <NotificationsCountProvider>
            <Notifications />
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    await mockAxiosResponse(
      { data: mockedNotifications },
    );

    expect(getByText('bopzor'));
    expect(getByText('a répondu à une réaction sur l\'information'));
    expect(getByText('FAKE new'));
  });

  it('should display fallback message if no unseen notification', async () => {
    const { getByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <NotificationsCountProvider>
            <Notifications />
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    await mockAxiosResponse(
      { data: { items: [], total: 0 } },
    );

    expect(getByText('Aucunes nouvelles notifications'));
  });

  it('should display fallback message if no seen notification', async () => {
    history.push('/notifications/lues');

    const { getByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <NotificationsCountProvider>
            <Notifications />
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    await mockAxiosResponse(
      { data: { items: [], total: 0 } },
    );

    expect(getByText('Aucunes notifications'));
  });

  it('should be on unseen notifications tab', async () => {
    const { getByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <NotificationsCountProvider>
            <Notifications />
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    await mockAxiosResponse(
      { data: { items: [], total: 0 } },
    );

    expect(getByText('Non lues').parentElement).toHaveAttribute('aria-selected', 'true');
  });

  it('should set notification as seen on notification item click', async () => {
    const { getByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <NotificationsCountProvider>
            <Switch>
              <Route path="/notifications" component={Notifications} />
              <Route path="/information" render={({ location }) => <>{ location.search }</>} />
            </Switch>
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    await mockAxiosResponse(
      { data: mockedNotifications },
    );

    act(() => {
      userEvent.click(getByText('a répondu à une réaction sur l\'information'));
    });

    expect(getByText('?notificationId=1')).toBeVisible();
  });

  it('should set notification as seen and remove it from the list on seen icon click', async () => {
    const { getByTestId, queryByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: mockUser, setUser: () => {} }}>
          <NotificationsCountProvider>
            <Notifications />
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    await mockAxiosResponseFor(
      { url: '/api/notification/me/count' },
      { data: { count: 1 } },
    );

    await mockAxiosResponse(
      { data: mockedNotifications },
    );

    act(() => {
      userEvent.click(getByTestId('set-seen-icon'));
    });

    await mockAxiosResponseFor(
      { method: 'POST', url: '/api/notification/1/seen' },
      { data: undefined, status: 204 },
    );

    expect(queryByText('a répondu à une réaction sur l\'information')).toBeNull();
  });
});
