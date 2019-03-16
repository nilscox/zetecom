import React from 'react';

import { User } from './types/User';
import { UserProvider } from './utils/UserContext';
import { fetchUser } from './hooks/fetchUser';

import './App.css';

type AppProps = {
  youtubeId: string,
};

const App = ({ youtubeId }: AppProps) => {
  const user: User = fetchUser(localStorage.getItem('token'));

  return (
    <UserProvider value={user}>

    </UserProvider>
  );
};

const mapStateToProps = (state: any) => ({
  information: state.information,
});

export { App };
