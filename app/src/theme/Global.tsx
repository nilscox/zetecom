import React from 'react';

import { css, Global } from '@emotion/react';

export const GlobalStyles: React.FC = () => (
  <Global
    styles={theme => css`
      html {
        font-size: ${theme.fontSizes.html};
      }
      body {
        font-family: ${theme.typographies.default};
        color: ${theme.textColors.default};
      }
    `}
  />
);
