import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

import mockAxios, { mockAxiosResponseFor, mockAxiosError } from 'src/testing/jest-mock-axios';
import { UserProvider } from 'src/utils/UserContext';
import { User } from 'src/types/User';

import LoginForm from '../LoginForm';

const mockUser: User = { id: 1 } as User;

describe('LoginForm', () => {
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
        <UserProvider value={{ user: null, setUser }}>
          <LoginForm />
        </UserProvider>
      </Router>,
    );

    await act(async () => {
      await userEvent.type(getByLabelText('Email *'), 'user@domain.tld');
      await userEvent.type(getByLabelText('Mot de passe *'), 'secure p4ssword');
    });

    act(() => {
      fireEvent.submit(getByTestId('login-form'));
    });

    await mockAxiosResponseFor(
      { method: 'POST', url: '/api/auth/login' },
      { data: mockUser },
    );

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

  it('should not login when sending invalid credentials', async () => {
    const setUser = jest.fn();
    const { getByTestId, getByLabelText, getByText } = render(
      <Router history={history}>
        <UserProvider value={{ user: null, setUser }}>
          <LoginForm />
        </UserProvider>
      </Router>,
    );

    await act(async () => {
      await userEvent.type(getByLabelText('Email *'), 'user@domain.tld');
      await userEvent.type(getByLabelText('Mot de passe *'), 'secure p4ssword');
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

    expect(getByText('Combinaison email / mot de passe non valide')).toBeInTheDocument();
  });

});
