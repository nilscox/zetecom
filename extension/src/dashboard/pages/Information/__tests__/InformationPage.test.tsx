import React from 'react';

import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createMemoryHistory } from 'history';

import { Router, Switch, Route } from 'react-router-dom';

import { UserProvider } from 'src/utils/UserContext';

import { NotificationsCountProvider } from 'src/dashboard/contexts/NotificationsCountContext';
import mockAxios, { mockAxiosResponseFor } from 'src/testing/jest-mock-axios';

import InformationPage from '../index';

jest.mock('src/dashboard/components/Authenticated', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}));

jest.mock('src/dashboard/pages/Information/ReactionTab/index', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name
  default: () => <></>,
}));

const mockUser: any = {
  id: 1,
  nick: 'nick',
  avatar: null,
  email: 'email@domain.tld',
  created: new Date().toString(),
  updated: new Date().toString(),
};

const mockInformation: any = {
  id: 1,
  title: 'FAKE new',
  url: 'http://fakenew.fake',
  image: null,
  creator: {
    id: 1,
    nick: 'nick',
    avatar: null,
  },
  reactionsCount: 0,
  subjectsCount: 0,
};

describe('InformationPage', () => {
  describe('Notifications count', () => {
    const history: any = createMemoryHistory();

    afterEach(() => {
      mockAxios.reset();
    });

    it('should set notification as seen and refetch notifications count', async () => {
      history.push('/information/1/reactions?notificationId=1');

      const { getByText } = render(
        <Router history={history}>
          <UserProvider value={{ user: mockUser, setUser: () => {} }}>
            <NotificationsCountProvider>
              <Route path="/information/:id" component={InformationPage} />
            </NotificationsCountProvider>
          </UserProvider>
        </Router>,
      );

      await mockAxiosResponseFor(
        { url: '/api/information/1' },
        { data: mockInformation },
      );

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: '/api/notification/1/seen',
        }),
      );

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/notification/me/count',
        }),
      );

      expect(getByText('FAKE new')).toBeVisible();
    });
  });
});
