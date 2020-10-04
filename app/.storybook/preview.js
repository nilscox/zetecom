import React from 'react';

import centered from '@storybook/addon-centered/react';
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

addDecorator(centered);
addDecorator(withKnobs);
addDecorator(withTheme);
