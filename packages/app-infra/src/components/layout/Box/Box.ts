import styled from '@emotion/styled';

import { Theme } from '~/theme';

export type BoxOwnProps = {
  margin?: number | string | true;
  marginX?: number | string | true;
  marginY?: number | string | true;
  marginTop?: number | string | true;
  marginRight?: number | string | true;
  marginBottom?: number | string | true;
  marginLeft?: number | string | true;
  padding?: number | string | true;
  paddingX?: number | string | true;
  paddingY?: number | string | true;
  paddingTop?: number | string | true;
  paddingRight?: number | string | true;
  paddingBottom?: number | string | true;
  paddingLeft?: number | string | true;
  border?: string | true;
  borderX?: string | true;
  borderY?: string | true;
  borderTop?: string | true;
  borderRight?: string | true;
  borderBottom?: string | true;
  borderLeft?: string | true;
  borderRadius?: keyof Theme['radii'] | true;
};

type Props = BoxOwnProps & { theme: Theme };

const makeValues = <T, R>(
  getValue: (t?: T) => R,
  all?: T,
  x?: T,
  y?: T,
  top?: T,
  right?: T,
  bottom?: T,
  left?: T,
): R[] => {
  const result = Array<R>(4).fill(getValue(all));

  if (y) result[0] = result[2] = getValue(y);
  if (x) result[1] = result[3] = getValue(x);

  if (top) result[0] = getValue(top);
  if (right) result[1] = getValue(right);
  if (bottom) result[2] = getValue(bottom);
  if (left) result[3] = getValue(left);

  return result;
};

const getMarginOrPaddingValue = (theme: Theme, defaultValue: number) => (value?: number | string | true) => {
  if (value === true) {
    return `${theme.space[defaultValue]}px`;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value) {
    return `${theme.space[value]}px`;
  }

  return 0;
};

const margin = (props: Props) => {
  const values = [
    props.margin,
    props.marginX,
    props.marginY,
    props.marginTop,
    props.marginRight,
    props.marginBottom,
    props.marginLeft,
  ];

  if (values.every((value) => value === undefined)) {
    return values;
  }

  return makeValues(getMarginOrPaddingValue(props.theme, 2), ...values).join(' ');
};

const padding = (props: Props) => {
  const values = [
    props.padding,
    props.paddingX,
    props.paddingY,
    props.paddingTop,
    props.paddingRight,
    props.paddingBottom,
    props.paddingLeft,
  ];

  if (values.every((value) => value === undefined)) {
    return values;
  }

  return makeValues(getMarginOrPaddingValue(props.theme, 2), ...values).join(' ');
};

const border = (props: Props) => {
  const values = [
    props.border,
    props.borderX,
    props.borderY,
    props.borderTop,
    props.borderRight,
    props.borderBottom,
    props.borderLeft,
  ];

  if (values.every((value) => value === undefined)) {
    return values;
  }

  const getValue = (v?: string | true) => {
    if (v === true) {
      return `1px solid ${props.theme.colors.border}`;
    }

    return v ?? 'none';
  };

  return {
    borderTop: getValue(props.border ?? props.borderY ?? props.borderTop),
    borderBottom: getValue(props.border ?? props.borderY ?? props.borderBottom),
    borderLeft: getValue(props.border ?? props.borderX ?? props.borderLeft),
    borderRight: getValue(props.border ?? props.borderX ?? props.borderRight),
  };
};

const borderRadius = (props: Props) => {
  const { borderRadius } = props;

  if (borderRadius === undefined) {
    return;
  }

  if (borderRadius === true) {
    return { borderRadius: `${props.theme.radii.default}px` };
  }

  return { borderRadius: `${props.theme.radii[borderRadius]}px` };
};

export type BoxProps = React.ComponentProps<typeof Box>;

export const Box = styled.div<BoxOwnProps>`
  margin: ${margin};
  padding: ${padding};
  ${borderRadius};
  ${border}
`;
