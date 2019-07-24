import { createContext, useContext } from 'react';

export type Theme = {
  colors: {
    backgroundLight: string,
    border: string,
    borderLight: string,
    borderImage: string,
    text: string,
    textLight: string,
  },
  sizes: {
    small: number,
    medium: number,
    big: number,
  },
  borderRadius: number,
};

const defaultTheme: Theme = {
  colors: {
    backgroundLight: '#f9f9f9',
    border: '#cccccc',
    borderLight: '#eeeeee',
    borderImage: '#999999',
    text: '#333333',
    textLight: '#666666',
  },
  sizes: {
    small: 2,
    medium: 5,
    big: 10,
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
