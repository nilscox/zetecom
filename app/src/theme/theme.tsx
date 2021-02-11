import { lighten } from 'polished';

import 'normalize.css';

import 'fontsource-montserrat';
import 'fontsource-noticia-text';

const primary = '#ff9000';
const secondary = '#446';

const success = '#9fd6a1';
const error = '#ffa39d';
const warning = '#ffcd83';
const info = '#92b0de';

const theme = {
  colors: {
    primary,
    secondary,
    disabled: '#EEE',
    light: '#EEE',
    border: lighten(0.5, secondary),
    icon: lighten(0.2, secondary),
    iconDisabled: lighten(0.5, secondary),
    success,
    error,
    warning,
    info,
  },

  textColors: {
    default: '#333',
    button: '#555',
    link: lighten(0.15, secondary),
    linkFocused: primary,
    disabled: '#999',
  },

  spacings: {
    0: 0,
    0.5: '3px',
    1: '6px',
    2: '12px',
    3: '18px',
    4: '24px',
    5: '32px',
  },

  sizes: {
    xsmall: '90px',
    small: '140px',
    medium: '220px',
    large: '340px',
    xlarge: '530px',
  },

  fonts: {
    default: ['Montserrat', 'sans-serif'].join(', '),
    headerTitle: ['"Noticia text"', 'serif'].join(', '),
    monospace: ['monospace'].join(', '),
  },

  fontSizes: {
    html: '14px',
    default: '1rem',
    small: '0.8rem',
    large: '1.2rem',
  },

  fontWeights: {
    default: 'normal',
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

  domain: {
    reactionFontSize: '20px',
    userReactionColor: '#ffeca6',
  },
};

export default theme;

export type Theme = typeof theme;
