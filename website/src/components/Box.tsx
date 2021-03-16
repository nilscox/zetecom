import React from 'react';

import './Box.scss';

type Spacing = 'small' | 'medium' | 'big';

type BoxProps = {
  className?: string;
  marginTop?: Spacing;
  marginBottom?: Spacing;
  margin?: Spacing;
};

const Box: React.FC<BoxProps> = ({
  className,
  marginTop,
  marginBottom,
  margin,
  children,
}) => {
  return (
    <div className={
      [
        'box',
        ...(marginTop ? [`margin-top-${marginTop}`] : []),
        ...(marginBottom ? [`margin-bottom-${marginBottom}`] : []),
        ...(margin ? [`margin-top-${margin}`, `margin-bottom-${margin}`] : []),
        className,
      ].join(' ')}>
      {children}
    </div>
  );
};

export default Box;
