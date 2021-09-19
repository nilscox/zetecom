import { css, Global } from '@emotion/react';

export const GlobalStyles: React.FC = () => (
  <Global
    styles={(theme) => css`
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
