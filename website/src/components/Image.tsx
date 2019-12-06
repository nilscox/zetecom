import React from 'react';

import Link from 'src/components/Link';

import './Image.scss';

type ImageProps = {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  border?: boolean;
  openOnClick?: boolean;
  style?: React.CSSProperties;
};

const Image: React.FC<ImageProps> = ({ width, border, openOnClick, style, ...props }) => {
  if (!openOnClick) {
    return <img className={'image' + (border ? ' image-border' : '')} {...props} style={{ width, ...style }} />;
  }

  return (
    <figure className="image image-container">

      <Link openInNewTab href={props.src}>
        <img className={border ? 'image-border' : ''} {...props} style={{ width, ...style }} />
      </Link>

      <figcaption>
        Cliquez sur l'image pour l'agrandir.
      </figcaption>

    </figure>
  );
};

export default Image;
