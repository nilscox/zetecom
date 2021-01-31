import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { UserContext } from 'src/contexts/UserContext';
import mockAxios, { mockAxiosError, mockAxiosResponseFor } from 'src/testing/jest-mock-axios';
import { User } from 'src/types/User';

import AuthenticationForm from '../index';

const mockUser: User = { id: 1 } as User;

const UserProvider = UserContext.Provider;

describe.skip('AuthenticationForm', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should login', async () => {
    const setUser = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <Router history={history}>
        <UserProvider value={[null, setUser]}>
          <AuthenticationForm />
        </UserProvider>
      </Router>,
    );

    act(() => {
      userEvent.type(getByLabelText('Email *'), 'user@domain.tld');
      userEvent.type(getByLabelText('Mot de passe *'), 'secure p4ssword');
    });

    act(() => {
      fireEvent.submit(getByTestId('login-form'));
    });

    await mockAxiosResponseFor({ method: 'POST', url: '/api/auth/login' }, { data: mockUser });

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          email: 'user@domain.tld',
          password: 'secure p4ssword',
        },
      }),
    );

    expect(setUser).toHaveBeenCalledWith(expect.objectContaining(mockUser));
  });

  it.skip('should not login when sending invalid credentials', async () => {
    const setUser = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <Router history={history}>
        <UserProvider value={[null, setUser]}>
          <AuthenticationForm />
        </UserProvider>
      </Router>,
    );

    act(() => {
      userEvent.type(getByLabelText('Email *'), 'user@domain.tld');
      userEvent.type(getByLabelText('Mot de passe *'), 'secure p4ssword');
    });

    act(() => {
      fireEvent.submit(getByTestId('login-form'));
    });

    await mockAxiosError({
      response: {
        status: 401,
        data: { message: 'INVALID_CREDENTIALS' },
      },
    });

    // expect(getByText('Combinaison email / mot de passe non valide')).toBeInTheDocument();
  });
});
