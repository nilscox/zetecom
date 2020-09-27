import React from 'react';

type DisabledOverlayProps = {
  disabled?: boolean;
};

const DisabledOverlay: React.FC<DisabledOverlayProps> = ({ disabled }) => {
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
        opacity: 0.5,
      }}
    />
  );
};

export default DisabledOverlay;
