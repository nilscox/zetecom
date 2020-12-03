import React from 'react';

import './Image.scss';

type ImageProps = {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  border?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const Image: React.FC<ImageProps> = ({ width, height, border, style, ...props }) => {
  return <img className={'image' + (border ? ' image-border' : '')} {...props} style={{ width, height, ...style }} />;
};

export default Image;
