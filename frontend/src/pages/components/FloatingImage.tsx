import React from 'react';

type Float = 'left' | 'right';

type FlotingImageProps = {
  src: string;
  float: Float;
  width: number;
};

const FlotingImage: React.FC<FlotingImageProps> = ({ src, float, width }) => (
  <img
    style={{
      width,
      float,
      border: '1px solid #CCC',
      marginBottom: 10,
      ...{
        left: { marginRight: 20 },
        right: { marginLeft: 20 },
      }[float],
    }}
    src={src}
  />
);

export default FlotingImage;

export const ClearFix: React.FC = () => (
  <div style={{ clear: 'both' }} />
);
