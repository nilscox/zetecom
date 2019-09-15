import React from 'react';

type ImageProps = {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
};

const Image: React.FC<ImageProps> = ({ src, alt, style }) => (
  <img
    alt={alt || 'image'}
    src={src}
    style={{ border: '1px solid #CCC', ...style }}
  />
);

export default Image;
