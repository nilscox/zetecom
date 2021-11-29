import { css, Global } from '@emotion/react';

import { breakpoints } from './index';

export const GlobalStyles: React.FC = () => (
  <Global
    styles={(theme) => css`
      html {
        font-size: ${theme.domain.html.fontSize};

        ${breakpoints.down('small')({ theme })} {
          font-size: ${theme.domain.html.fontSizeSmall};
        }
      }

      body {
        font-family: ${theme.fonts.body};
        font-weight: ${theme.fontWeights.body};
        line-height: ${theme.lineHeights.body};
        color: ${theme.colors.text};
        background-color: ${theme.colors.background};
      }

      strong {
        color: ${theme.colors.textLight};
      }
    `}
  />
);
