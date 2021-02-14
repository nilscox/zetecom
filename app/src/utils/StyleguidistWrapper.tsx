// eslint-disable-next-line simple-import-sort/imports
import 'reflect-metadata';

import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

import { GlobalStyles } from '../theme/GlobalStyles';
import theme from '../theme/theme';

const StyleguidistWrapper: React.FC = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </MemoryRouter>
);

export default StyleguidistWrapper;
