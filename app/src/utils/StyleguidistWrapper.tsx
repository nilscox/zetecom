import React from 'react';

import { ThemeProvider } from '@emotion/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { MemoryRouter } from 'react-router-dom';

import { GlobalStyles } from '../theme/GlobalStyles';
import theme from '../theme/theme';

import 'dayjs/locale/fr';

dayjs.extend(utc);
dayjs.locale('fr');

const StyleguidistWrapper: React.FC = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </MemoryRouter>
);

export default StyleguidistWrapper;
