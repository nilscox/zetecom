import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';

import { GlobalStyles } from '../theme/Global';
import theme from '../theme/theme';

let rendered = false;

const GlobalOnce = () => {
  if (rendered) {
    return null;
  }

  rendered = true;

  return <GlobalStyles />;
};

const StyleguidistWrapper: React.FC = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <GlobalOnce />
      {children}
    </ThemeProvider>
  </MemoryRouter>
);

export default StyleguidistWrapper;
