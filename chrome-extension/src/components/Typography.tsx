import React from 'react';

type TypograhpyProps = {
  variant?: 'title' | 'text' | 'error';
  children: string;
  style?: React.CSSProperties;
};

const Typography: React.FC<TypograhpyProps> = ({ variant = 'text', children, style }) => {
  if (variant === 'title') return <h1 style={{ fontSize: '1.4rem', ...style }}>{children}</h1>;

  if (variant === 'error') return <div style={{ color: '#822', ...style }}>{children}</div>;

  return <div style={{ lineHeight: '20px', ...style }}>{children}</div>;
};

export default Typography;
