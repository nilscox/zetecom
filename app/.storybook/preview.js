import React, { useEffect } from 'react';

import { ThemeProvider } from '@material-ui/core';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';

import createTheme from 'src/theme/createTheme';
import { AppContextProvider, useUser } from 'src/contexts/AppContext';

import '../src/App.css';

addDecorator(withKnobs);

addDecorator(storyFn => <div id="app">{storyFn()}</div>);
addDecorator(storyFn => <ThemeProvider theme={createTheme()}>{storyFn()}</ThemeProvider>);
addDecorator(storyFn => <AppContextProvider>{storyFn()}</AppContextProvider>);

const user = parseUser({
  id: 42,
  nick: 'Doug Forcett',
  avatar: null,
  created: new Date(),
  updated: new Date(),
});

addDecorator(storyFn => {
  const fetching = boolean('Fetching user', false);

  const loggedIn = boolean('Logged in', true);

  const { setUser } = useUser();

  useEffect(() => {
    setUser(() => {
      if (fetching) {
        return undefined;
      } else if (!loggedIn) {
        return null;
      } else {
        return user;
      }
    });
  }, [fetching, loggedIn]);

  return storyFn();
});
