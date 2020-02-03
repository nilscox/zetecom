/* eslint-disable max-lines */
import React from 'react';

import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { createMemoryHistory, MemoryHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';

import { UserProvider } from 'src/utils/UserContext';
import { NotificationsCountProvider } from 'src/dashboard/contexts/NotificationsCountContext';
import mockAxios, { mockAxiosResponseFor } from 'src/testing/jest-mock-axios';
import { User } from 'src/types/User';

import Notifications from '../index';

import mockedNotifications from './mock.json';

const mockUser: User = { id: 1 } as User;

const Test: React.FC<{ history: MemoryHistory }> = ({ history }) => (
  <Router history={history}>
    <UserProvider value={{ user: mockUser, setUser: () => {} }}>
      <NotificationsCountProvider>
        <Notifications />
      </NotificationsCountProvider>
    </UserProvider>
  </Router>
);

describe('Notifications', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/notifications');
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should display the title', () => {
    const { getByText } = render(<Test history={history} />);

    expect(getByText('Notifications')).toBeVisible();
  });

  it('should render the list of unseen notifications', async () => {
    const { getByText } = render(<Test history={history} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me' },
      { data: mockedNotifications },
    );

    expect(getByText('bopzor'));
    expect(getByText('a répondu à une réaction sur l\'information'));
    expect(getByText('FAKE new'));
  });

  it('should render the list of seen notifications', async () => {
    history.push('/notifications/lues');

    const { getByText } = render(<Test history={history} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me/seen' },
      { data: mockedNotifications },
    );

    expect(getByText('bopzor'));
    expect(getByText('a répondu à une réaction sur l\'information'));
    expect(getByText('FAKE new'));
  });

  it('should display fallback message if no unseen notification', async () => {
    const { getByText } = render(<Test history={history} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me' },
      { data: { items: [], total: 0 } },
    );

    expect(getByText('Aucunes nouvelles notifications'));
  });

  it('should display fallback message if no seen notification', async () => {
    history.push('/notifications/lues');

    const { getByText } = render(<Test history={history} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me/seen' },
      { data: { items: [], total: 0 } },
    );

    expect(getByText('Aucunes notifications'));
  });

  it('should be on unseen notifications tab', async () => {
    const { getByText } = render(<Test history={history} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me' },
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
              <Route path="/information" render={({ location }) => <>{ location.state.notificationId }</>} />
            </Switch>
          </NotificationsCountProvider>
        </UserProvider>
      </Router>,
    );

    await mockAxiosResponseFor(
      { url: '/api/notification/me' },
      { data: mockedNotifications },
    );

    act(() => {
      userEvent.click(getByText('a répondu à une réaction sur l\'information'));
    });

    expect(getByText('1')).toBeVisible();
  });

  it('should set notification as seen and remove it from the list on seen icon click', async () => {
    const { getByTestId, queryByText } = render(<Test history={history} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me/count' },
      { data: { count: 1 } },
    );

    await mockAxiosResponseFor(
      { url: '/api/notification/me' },
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
