import React from 'react';

import { User } from './types/User';
import { UserProvider } from './utils/UserContext';
import { useUserLogin } from './hooks/useUserLogin';

import './App.css';

type AppProps = {
  youtubeId: string,
};

const App = ({ youtubeId }: AppProps) => {
  const user: User = useUserLogin(localStorage.getItem('token'));

  return (
    <UserProvider value={user}>

    </UserProvider>
  );
};

const mapStateToProps = (state: any) => ({
  information: state.information,
});

export { App };
