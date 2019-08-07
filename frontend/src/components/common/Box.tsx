import React from 'react';

export type BoxProps = React.HTMLProps<HTMLDivElement> & {
  m?: number;
  ml?: number; mt?: number; mr?: number; mb?: number;
  mx?: number; my?: number;
  p?: number;
  pl?: number; pt?: number; pr?: number; pb?: number;
  px?: number; py?: number;
  border?: string;
  borderRadius?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const Box: React.FC<BoxProps> = ({ children, ...props }) => {
  const {
    m, mt, mr, mb, mx, my, ml,
    p, pt, pr, pb, px, py, pl,
    border, borderRadius,
    style,
    ...other
  } = props;

  const margin: number[] = [mt || 0, mr || 0, mb || 0, ml || 0];
  const padding: number[] = [pt || 0, pr || 0, pb || 0, pl || 0];

  if (mx)
    margin[1] = margin[3] = mx;
  if (my)
    margin[0] = margin[2] = my;

  if (px)
    padding[1] = padding[3] = px;
  if (py)
    padding[0] = padding[2] = py;

  return (
    <div
      style={{
        margin: m || margin.map(m => `${m}px`).join(' '),
        padding: p || padding.map(p => `${p}px`).join(' '),
        border,
        borderRadius,
        ...style,
      }}
      {...other}
    >
      { children }
    </div>
  );
};

export default Box;
