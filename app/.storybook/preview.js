import React, { useEffect, useState } from 'react';

import { ThemeProvider } from '@material-ui/core';
import centered from '@storybook/addon-centered/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';
import {muiTheme} from 'storybook-addon-material-ui';

import createTheme from 'src/theme/createTheme';
import { AppContextProviderTesting } from 'src/contexts/AppContext';
import { parseUser } from 'src/types/User';
import '../src/App.css';

const mockUser = parseUser({
  id: 42,
  nick: 'Doug Forcett',
  avatar: null,
  created: new Date(),
  updated: new Date(),
});

const AppContextKnobs = ({ children }) => {
  const fetching = boolean('Fetching user', false);
  const loggedIn = boolean('Logged in', true);

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(() => {
      if (fetching) {
        return undefined;
      } else if (!loggedIn) {
        return null;
      } else {
        return mockUser;
      }
    });
  }, [fetching, loggedIn]);

  return (
    <AppContextProviderTesting user={{ user, setUser }}>
      { children }
    </AppContextProviderTesting>
  );
};

const theme = createTheme();

addDecorator(centered);
addDecorator(withKnobs);
addDecorator(muiTheme([theme]));

addDecorator(storyFn => <div id="app">{storyFn()}</div>);

// https://github.com/storybookjs/storybook/issues/8531#issuecomment-568947201
addDecorator(StoryFn => <AppContextKnobs><StoryFn /></AppContextKnobs>);
