import { createContext, useContext } from 'react';

export type Theme = {
  colors: {
    backgroundLight: string;
    backgroundHeavy: string;
    border: string;
    borderLight: string;
    borderImage: string;
    text: string;
    textLight: string;
    disabled: string;
  };
  sizes: {
    small: number;
    medium: number;
    big: number;
  };
  fontSizes: {
    note: number;
    small: number;
    medium: number;
    big: number;
  };
  animation: {
    fast: number;
    medium: number;
    slow: number;
  };
  borderRadius: number;
};

const defaultTheme: Theme = {
  colors: {
    backgroundLight: '#f9f9f9',
    backgroundHeavy: '#eeeeee',
    border: '#cccccc',
    borderLight: '#eeeeee',
    borderImage: '#999999',
    text: '#333333',
    textLight: '#666666',
    disabled: '#999999',
  },
  sizes: {
    small: 2,
    medium: 5,
    big: 10,
  },
  fontSizes: {
    note: 12,
    small: 14,
    medium: 16,
    big: 18,
  },
  animation: {
    fast: 90,
    medium: 200,
    slow: 340,
  },
  borderRadius: 4,
};

/**
 * The ThemeContext provides a customizable theme. It should bring more consistency in the
 * colors, lengths and spacings used over the app.
 *
 * @type {Theme} the theme
 */
const ThemeContext = createContext<Theme>(defaultTheme);

export default ThemeContext;
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

export const useTheme = () => useContext(ThemeContext);
