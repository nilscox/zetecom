import React, { useState } from 'react';
import Modal from 'react-modal';

type ImageProps = {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  maximize?: boolean;
};

const Image: React.FC<ImageProps> = ({ src, alt, style, maximize = false }) => {
  const [open, setOpen] = useState(false);
  const image = (
    <img
      alt={alt || 'image'}
      src={src}
      style={{ border: '1px solid #CCC', ...style }}
    />
  );

  if (!maximize)
    return image;

  return (
    <>
      <figure style={{ textAlign: 'center', color: '#999', cursor: 'pointer' }} onClick={() => setOpen(true)}>
        { image }
        <figcaption style={{ fontSize: '0.6em', lineHeight: 0 }}>
          Cliquez sur l'image pour l'afficher en grand.
        </figcaption>
      </figure>

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        closeTimeoutMS={200}
        style={{
          content: {
            top: '50%',
            right: 'initial',
            bottom: 'initial',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
          },
        }}
      >
        <img
          alt={alt || 'image'}
          src={src}
          style={{ objectFit: 'scale-down' }}
        />
      </Modal>
    </>
  );
};

export default Image;
