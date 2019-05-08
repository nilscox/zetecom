import React from 'react';

type TypograhpyProps = {
  variant?: 'title' | 'subtitle' | 'text';
  children: string;
  style?: React.CSSProperties;
};

const Typography: React.FC<TypograhpyProps> = ({ variant = 'text', children, style }) => {
  if (variant === 'title')
    return <h1 style={{ fontSize: '2rem', color: '#111', ...style }}>{ children }</h1>;

  if (variant === 'subtitle')
    return <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#444', ...style }}>{ children }</h2>;

  return <div style={style}>{ children }</div>;
};

export default Typography;
