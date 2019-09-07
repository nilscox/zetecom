import React, { useEffect } from 'react';

const Tlkio: React.FC = () => {
  useEffect(() => window.postMessage({ type: 'TLKIO_READY' }, 'http://localhost:8000'), []);

  return (
    <div
      id="tlkio"
      data-channel="cdv"
      data-theme="theme--minimal"
      data-custom-css="http://localhost:8000/assets/css/tlkio.css"
      style={{ width: '100%', maxWidth: 820, height: 600, border: '2px solid #CCC' }}
    />
  );
};

export default Tlkio;
