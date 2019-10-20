import React from 'react';

import './Image.scss';

type ImageProps = {
  src: string;
  alt: string;
};

const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <a href={src} target="_blank" className="image-container">

    <figure>

      <img alt={alt} src={src} />

      <figcaption>
        Cliquez sur l'image pour l'agrandir.
      </figcaption>

    </figure>

  </a>
);

export default Image;
