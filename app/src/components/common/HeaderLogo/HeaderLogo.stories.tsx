import React, { ReactNode } from 'react';

import createTheme from 'src/utils/createDefaultTheme';

import HeaderLogo from './index';

import { ThemeProvider } from '@material-ui/core';

export default {
  title: 'Header',
  decorators: [
    (storyFn: () => ReactNode) => <ThemeProvider theme={createTheme()}>{ storyFn() }</ThemeProvider>,
  ],
};

export const headerLogo = () => <HeaderLogo />;
