import React, { useEffect, useState } from 'react';

type DisabledOverlayProps = {
  disabled?: boolean;
};

const DisabledOverlay: React.FC<DisabledOverlayProps> = ({ disabled }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (disabled) {
      setOpacity(0.5);
    }
  }, [disabled]);

  if (!disabled) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        background: 'white',
        opacity,
        transition: 'opacity 260ms ease-in-out',
      }}
    />
  );
};

export default DisabledOverlay;
