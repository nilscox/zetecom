import { lighten } from 'polished';

import 'normalize.css';
import 'fontsource-montserrat/index.css';
import 'fontsource-noticia-text/index.css';

const primary = '#ff9000';
const secondary = '#446';

const success = '#349b37';
const error = '#cc574f';
const warning = '#be6600';
const info = '#0c51b8';

const theme = {
  colors: {
    primary,
    secondary,
    disabled: '#EEE',
    light: '#EEE',
    border: lighten(0.5, secondary),
    icon: lighten(0.2, secondary),
    iconDisabled: lighten(0.5, secondary),
    success: lighten(0.3, success),
    error: lighten(0.3, error),
    warning: lighten(0.4, warning),
    info: lighten(0.4, info),
  },

  textColors: {
    default: '#444',
    light: '#666',
    button: '#555',
    link: lighten(0.15, secondary),
    disabled: '#999',
    success,
    error,
    warning,
    info,
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
    xlarge: '1.6rem',
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
    authenticationFormWidth: '440px',
    authenticationFormMargin: '80px',
    commentsAreaTitleFontSize: '1.4rem',
    mediaImageWidth: '160px',
    mediaImageHeight: '100px',
    reactionFontSize: '20px',
    commentLightBackground: '#fafafa',
    userReactionColor: '#ffeca6',
    searchHighlightBackground: '#ffe15b',
  },
};

export default theme;

export type Theme = typeof theme;
