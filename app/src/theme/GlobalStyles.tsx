import React from 'react';

import { css, Global } from '@emotion/react';

import 'react-toastify/dist/ReactToastify.min.css';

export const GlobalStyles: React.FC = () => (
  <Global
    styles={theme => css`
      html {
        font-size: ${theme.fontSizes.html};
        line-height: 1.3;
      }
      body {
        font-family: ${theme.fonts.default};
        color: ${theme.textColors.default};
      }
    `}
  />
);
