import { Theme } from './theme';

type Callback = (value: string) => string;

const themeGetter = (get: (theme: Theme) => string, cb?: Callback) => (props: { theme: Theme }) => {
  const result = get(props.theme);

  return cb?.(result) ?? result;
};

export const borderRadius = (radius: keyof Theme['borderRadius']) => {
  return themeGetter(theme => theme.borderRadius[radius]);
};

export const color = (color: keyof Theme['colors'], cb?: Callback) => {
  return themeGetter(theme => theme.colors[color], cb);
};

export const textColor = (color: keyof Theme['textColors'], cb?: Callback) => {
  return themeGetter(theme => theme.textColors[color], cb);
};

export const spacing = (...spacings: Array<keyof Theme['spacings']>) => {
  return themeGetter(theme => spacings.map(spacing => theme.spacings[spacing]).join(' '));
};

export const fontSize = (fontSize: keyof Theme['fontSizes'], cb?: Callback) => {
  return themeGetter(theme => theme.fontSizes[fontSize], cb);
};

export const fontWeight = (fontWeight: keyof Theme['fontWeights'], cb?: Callback) => {
  return themeGetter(theme => theme.fontWeights[fontWeight], cb);
};

export const transition = (speed: keyof Theme['transitions'], property = 'all', timingFunction = 'ease-in-out') => {
  return themeGetter(theme => {
    const get = (property: string) => `${property} ${theme.transitions[speed]} ${timingFunction}`;

    if (Array.isArray(property)) {
      return property.map(get).join(', ');
    }

    return get(property);
  });
};
