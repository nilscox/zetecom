import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@material-ui/core';

import createTheme from 'src/theme/createTheme';
import 'src/utils/zetecom-global';

import '../src/App.css';

const theme = createTheme();

const withTheme = (Story) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);

addDecorator(withKnobs);
addDecorator(withTheme);
