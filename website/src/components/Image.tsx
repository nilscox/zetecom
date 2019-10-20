import React from 'react';

import './Image.scss';

type ImageProps = {
  src: string;
  alt: string;
};

const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <figure className="image-container">

    <a href={src} target="_blank">
      <img alt={alt} src={src} />
    </a>

    <figcaption>
      Cliquez sur l'image pour l'agrandir.
    </figcaption>

  </figure>
);

export default Image;
