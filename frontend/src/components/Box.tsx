import React from 'react';

type BoxProps = {
  children: React.ReactNode,
  m?: number,
  ml?: number, mt?: number, mr?: number, mb?: number,
  mx?: number, my?: number,
  p?: number,
  pl?: number, pt?: number, pr?: number, pb?: number,
  px?: number, py?: number,
  border?: string,
  borderRadius?: number,
};

const Box: React.FC<BoxProps> = ({ children, ...props }) => {
  const { m, mt, mr, mb, mx, my, ml } = props;
  const { p, pt, pr, pb, px, py, pl } = props;
  const { border, borderRadius } = props;

  const margin: number[] = [mt || 0, mr || 0, mb || 0, ml || 0];
  const padding: number[] = [pt || 0, pr || 0, pb || 0, pl || 0];

  if (mx) margin[0] = margin[2] = mx;
  if (my) margin[1] = margin[3] = my;

  if (px) padding[0] = padding[2] = px;
  if (py) padding[1] = padding[3] = py;

  return (
    <div
      style={{
        margin: m || margin.map(m => `${m}px`).join(' '),
        padding: p || padding.map(p => `${p}px`).join(' '),
        border,
        borderRadius,
      }}
    >
      { children }
    </div>
  );
};

export default Box;
