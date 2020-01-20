import React from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import mockAxios, { mockAxiosResponse } from 'src/testing/jest-mock-axios';

import { UserProvider } from 'src/utils/UserContext';

import AppBar from '../AppBar';

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

describe('AppBar', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe('Notifications', () => {
    it('should not display badge if no notifications', async () => {
      const { getByText } = render(
        <BrowserRouter>
          <UserProvider value={{ user: mockUser, setUser: () => {} }}>
            <AppBar handleDrawerToggle={() => {}} />
          </UserProvider>
        </BrowserRouter>,
      );

      await mockAxiosResponse(
        { data: { count: 0 } },
      );

      expect(getByText('0')).toHaveClass('MuiBadge-invisible');
    });

    it('should display 1 in the badge if 1 notification', async () => {
      const { getByText } = render(
        <BrowserRouter>
          <UserProvider value={{ user: mockUser, setUser: () => {} }}>
            <AppBar handleDrawerToggle={() => {}} />
          </UserProvider>
        </BrowserRouter>,
      );

      await mockAxiosResponse(
        { data: { count: 1 } },
      );

      expect(getByText('1')).toBeVisible();
    });
  });
});
