import React from 'react';

import Link from 'src/components/Link';

import './Image.scss';

type ImageProps = {
  src: string;
  alt: string;
};

const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <figure className="image-container">

    <Link openInNewTab href={src}>
      <img alt={alt} src={src} />
    </Link>

    <figcaption>
      Cliquez sur l'image pour l'agrandir.
    </figcaption>

  </figure>
);

export default Image;
