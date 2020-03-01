import React from 'react';

import { NotificationsCountProvider } from 'src/dashboard/contexts/NotificationsCountContext';
import mockAxios, { mockAxiosResponseFor } from 'src/testing/jest-mock-axios';
import { User } from 'src/types/User';
import { createTheme } from 'src/utils/createTheme';
import { UserProvider } from 'src/utils/UserContext';

import NotificationsIcon from '../NotificationsIcon';

import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from '@material-ui/core/styles';
import { render } from '@testing-library/react';

const mockUser: User = { id: 1 } as User;

const Test: React.FC<{ user: typeof mockUser }> = ({ user }) => (
  <UserProvider value={{ user, setUser: () => {} }}>
    <NotificationsCountProvider>
      <ThemeProvider theme={createTheme()}>
        <NotificationsIcon />
      </ThemeProvider>
    </NotificationsCountProvider>
  </UserProvider>
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
