import React from 'react';

import { ThemeProvider } from '@material-ui/core';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/react';

import createTheme from 'src/theme/createTheme';

import '../src/App.css';

addDecorator(withKnobs);
addDecorator(storyFn => <div id="app">{storyFn()}</div>);
addDecorator(storyFn => <ThemeProvider theme={createTheme()}>{storyFn()}</ThemeProvider>);
