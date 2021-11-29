import { CSSProperties } from 'react';

import { Theme } from './theme';

type Props = { theme: Theme };

const createMediaQuery = (query: 'min-width' | 'max-width') => (breakpoint: keyof Theme['breakpoints']) => {
  return ({ theme }: Props) => `@media screen and (${query}: ${theme.breakpoints[breakpoint]}px)`;
};

export const breakpoints = {
  down: createMediaQuery('max-width'),
  up: createMediaQuery('min-width'),
};

const createGetter =
  <T extends keyof Theme>(prop: T, defaultValue: keyof Theme[T], unit = '') =>
  (value: keyof Theme[T] = defaultValue) =>
  (props: Props) => {
    return String(props.theme[prop][value]) + unit;
  };

export const color = createGetter('colors', 'primary');
export const font = createGetter('fonts', 'body');
export const fontSize = createGetter('fontSizes', 1, 'px');
export const fontWeight = createGetter('fontWeights', 'body');
export const lineHeight = createGetter('lineHeights', 'body');
export const border = createGetter('borders', 'default');
export const radius = createGetter('radii', 'default', 'px');

export const spacing =
  (...args: Array<number | string>) =>
  (props: Props) => {
    return args
      .map((arg) => {
        if (typeof arg === 'number') {
          return String(props.theme.space[arg]) + 'px';
        }

        return arg;
      })
      .join(' ');
  };

type TransitionProperty = CSSProperties['transitionProperty'] | string;

export const transition =
  (properties: TransitionProperty | Array<TransitionProperty>, value: keyof Theme['transitions'] = 'default') =>
  (props: Props) => {
    const [duration, timingFunction] = props.theme.transitions[value];

    return (Array.isArray(properties) ? properties : [properties])
      .map((property) => {
        return `${String(property)} ${duration}ms ${timingFunction}`;
      })
      .join(', ');
  };

export const domain = <T extends keyof Theme['domain']>(part: T, prop: keyof Theme['domain'][T]) => {
  return (props: Props) => props.theme.domain[part][prop];
};
