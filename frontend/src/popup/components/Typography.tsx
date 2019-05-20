import React from 'react';

type TypograhpyProps = {
  variant?: 'title' | 'text' | 'error';
  textAlign?: React.CSSProperties['textAlign'];
  children: string | JSX.Element;
  style?: React.CSSProperties;
};

const Typography: React.FC<TypograhpyProps> = ({
  variant = 'text',
  textAlign,
  children,
  style,
}) => {
  if (variant === 'title')
    return <h1 style={{ fontSize: '1.4rem', textAlign, ...style }}>{children}</h1>;

  if (variant === 'error')
    return <div style={{ fontSize: '0.8rem', color: '#822', textAlign, ...style }}>{children}</div>;

  return <div style={{ lineHeight: '20px', textAlign, ...style }}>{children}</div>;
};

export default Typography;
