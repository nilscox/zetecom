import React from 'react';

import { css, Global } from '@emotion/react';

import { Theme } from 'src/theme/theme';

import 'react-toastify/dist/ReactToastify.min.css';

const globalStyles = (theme: Theme) => css`
  html {
    font-size: ${theme.fontSizes.html};
    line-height: 1.3;
  }

  body {
    background-color: white;
    color: ${theme.textColors.default};
    font-family: ${theme.fonts.default};
  }

  :focus {
    outline: none;
  }

  ::-moz-focus-inner {
    border: 0;
  }

  a {
    outline: none;
    color: ${theme.textColors.link};

    &:focus {
      /* color: ${theme.textColors.link}; */
      text-decoration: underline;
    }
  }
`;

export const GlobalStyles: React.FC = () => <Global styles={globalStyles} />;
