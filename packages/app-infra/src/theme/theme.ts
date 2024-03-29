import { lighten } from 'polished';

import '@fontsource/montserrat/latin.css';
import '@fontsource/noticia-text/latin.css';
import 'normalize.css';

const primary = '#ff9000';
const secondary = '#446';
const text = '#444';

const success = '#51b053';
const error = '#cc574f';
const warning = '#db7b0b';
const info = '#4f77b3';

export const theme = {
  breakpoints: {
    small: 650,
  },

  space: [0, 3, 6, 12, 18, 24, 38].map((n) => n / 16),

  colors: {
    primary,
    secondary,

    text,
    textLight: lighten(0.1, text),
    textDisabled: lighten(0.3, text),

    background: 'white',
    backgroundLight: '#FAFAFA',

    muted: '#EEE',

    border: lighten(0.5, secondary),

    link: lighten(0.2, secondary),
    linkUnderline: lighten(0.4, secondary),

    icon: lighten(0.2, secondary),
    iconHover: lighten(0.3, secondary),
    iconDisabled: lighten(0.5, secondary),

    success,
    error,
    warning,
    info,
  },

  fonts: {
    body: ['Montserrat', 'sans-serif'].join(', '),
    logo: ['"Noticia text"', 'serif'].join(', '),
    monospace: ['monospace'].join(', '),
  },

  fontSizes: [12, 14, 16, 18, 20].map((n) => n / 16),

  fontWeights: {
    body: 400,
    medium: 500,
    bold: 600,
  },

  lineHeights: {
    body: 1.3,
  },

  borders: {
    default: '1px solid #CCC',
    light: '1px solid #EEE',
  },

  radii: {
    none: 0,
    default: 3,
  },

  transitions: {
    default: [300, 'ease-in-out'] as const,
    fast: [135, 'ease-in-out'] as const,
  },

  domain: {
    html: {
      fontSize: '16px',
      fontSizeSmall: '14px',
    },

    logo: {
      width: '3.5rem',
    },

    mainTitle: {
      fontSize: '2rem',
      letterSpacing: '3px',
    },

    subTitle: {
      letterSpacing: '1px',
    },

    page: {
      minHeight: '340px',
    },

    comment: {
      textColor: '#333333',
      reactionFontSize: '1.3rem',
      reactionFontSizeSmall: '1.2rem',
    },

    authentication: {
      maxWidth: '440px',
      verticalSpace: '80px',
    },
  },
};

export type Theme = typeof theme;
