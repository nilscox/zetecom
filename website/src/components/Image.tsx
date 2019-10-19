import React from 'react';

import './Image.scss';

type ImageProps = {
  src: string;
  alt?: string;
  containerClassName?: string;
  figureClassName?: string;
  maximize?: boolean;
};

const Image: React.FC<ImageProps> = ({ src, alt, containerClassName, figureClassName, maximize = false }) => {
  const image = (
    <img
      alt={alt || 'image'}
      src={src}
      className="image-border"
    />
  );

  if (!maximize)
    return image;

  return (
    <a href={src} target="_blank" className={`image-container ${containerClassName}`}>
      <figure className={`image-figure ${figureClassName}`}>
        { image }
        <figcaption className="image-figcaption">
          Cliquez sur l'image pour l'agrandir.
        </figcaption>
      </figure>
    </a>
  );
};

export default Image;
