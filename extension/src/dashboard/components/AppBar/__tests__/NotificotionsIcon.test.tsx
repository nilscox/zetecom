import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { NotificationsCountProvider } from 'src/dashboard/contexts/NotificationsCountContext';
import { UserProvider } from 'src/utils/UserContext';
import { createTheme } from 'src/utils/createTheme';

import mockAxios, { mockAxiosResponseFor } from 'src/testing/jest-mock-axios';

import AppBar from '..';

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

const Test: React.FC<{ user: typeof mockUser }> = ({ user }) => (
  <BrowserRouter>
    <UserProvider value={{ user, setUser: () => {} }}>
      <NotificationsCountProvider>
        <ThemeProvider theme={createTheme()}>
          <AppBar handleDrawerToggle={() => {}} />
        </ThemeProvider>
      </NotificationsCountProvider>
    </UserProvider>
  </BrowserRouter>
);

describe('NotificationsIcon', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should refetch notification count after user authenticated', async () => {
    const { getByText, rerender } = render(<Test user={null} />);

    rerender(<Test user={mockUser} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me/count' },
      { data: { count: 1 } },
    );

    expect(getByText('1')).toBeVisible();
  });

  it('should not display badge if no notifications', async () => {
    const { getByText } = render(<Test user={mockUser} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me/count' },
      { data: { count: 0 } },
    );

    // Material-ui uses 'MuiBadge-invisible' class to hide badge with scale: 0
    expect(getByText('0')).toHaveClass('MuiBadge-invisible');
  });

  it('should display 1 in the badge if 1 notification', async () => {
    const { getByText } = render(<Test user={mockUser} />);

    await mockAxiosResponseFor(
      { url: '/api/notification/me/count' },
      { data: { count: 1 } },
    );

    expect(getByText('1')).toBeVisible();
  });

});
