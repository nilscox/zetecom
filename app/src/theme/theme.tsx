import { lighten } from 'polished';

import 'fontsource-montserrat';
import 'fontsource-noticia-text';

const primary = '#ff9000';
const secondary = '#446';

const theme = {
  colors: {
    primary,
    secondary,
    border: lighten(0.5, secondary),
    disabled: '#EEE',
  },
  textColors: {
    default: '#333',
    link: lighten(0.15, secondary),
    linkFocused: primary,
    disabled: '#999',
    error: '#e36a62',
  },
  spacings: {
    0: 0,
    0.5: '3px',
    1: '6px',
    2: '12px',
    3: '18px',
    4: '24px',
  },
  typographies: {
    default: ['Montserrat', 'sans-serif'].join(', '),
  },
  fontSizes: {
    html: '14px',
    default: '1rem',
    small: '0.8rem',
    large: '1.2rem',
  },
  fontWeights: {
    bold: 'bold',
  },
  borderRadius: {
    1: '3px',
    2: '4px',
  },
  transitions: {
    fast: '160ms',
    slow: '300ms',
  },
};

export default theme;

export type Theme = typeof theme;
