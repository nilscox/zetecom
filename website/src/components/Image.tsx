import React from 'react';

import Link from 'src/components/Link';

import './Image.scss';

type ImageProps = {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  border?: boolean;
  openOnClick?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const Image: React.FC<ImageProps> = ({ width, height, border, openOnClick, style, ...props }) => {
  if (!openOnClick) {
    return <img className={'image' + (border ? ' image-border' : '')} {...props} style={{ width, height, ...style }} />;
  }

  return (
    <figure className="image image-container">

      <Link openInNewTab href={props.src}>
        <img className={border ? 'image-border' : ''} {...props} style={{ width, height, ...style }} />
      </Link>

      <figcaption>
        Cliquez sur l'image pour l'agrandir.
      </figcaption>

    </figure>
  );
};

export default Image;
