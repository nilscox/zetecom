/** @jsx jsx */
import React, { CSSProperties } from 'react';

import { jsx } from '@emotion/react';

import { Theme } from 'src/theme';

type Spacing = keyof Theme['spacings'];

type BoxProps = {
  m?: Spacing;
  mx?: Spacing;
  my?: Spacing;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  p?: Spacing;
  px?: Spacing;
  py?: Spacing;
  flex?: boolean;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
};

const Box: React.FC<BoxProps> = ({
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  p,
  px,
  py,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  children,
}) => {
  const margin: Array<Spacing> = [mt ?? 0, ml ?? 0, mb ?? 0, mr ?? 0];
  const padding: Array<Spacing> = [0, 0, 0, 0];

  if (mx !== undefined) {
    margin[1] = margin[3] = mx;
  }

  if (my !== undefined) {
    margin[0] = margin[2] = my;
  }

  if (m !== undefined) {
    margin[0] = margin[1] = margin[2] = margin[3] = m;
  }

  if (px !== undefined) {
    padding[1] = padding[3] = px;
  }

  if (py !== undefined) {
    padding[0] = padding[2] = py;
  }

  if (p !== undefined) {
    padding[0] = padding[1] = padding[2] = padding[3] = p;
  }

  return (
    <div
      css={theme => ({
        margin: margin.map(n => theme.spacings[n]).join(' '),
        padding: padding.map(n => theme.spacings[n]).join(' '),
        display: flex ? 'flex' : undefined,
        flexDirection,
        justifyContent,
        alignItems,
      })}
    >
      {children}
    </div>
  );
};

export default Box;
