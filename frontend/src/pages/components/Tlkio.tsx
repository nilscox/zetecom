import React, { useEffect } from 'react';
import env from 'src/utils/env';

const { BASE_URL } = env;

const Tlkio: React.FC = () => {
  useEffect(() => window.postMessage({ type: 'TLKIO_READY' }, BASE_URL), []);

  return (
    <div
      id="tlkio"
      data-channel="reagir-information"
      data-theme="theme--minimal"
      data-custom-css={`${BASE_URL}/assets/css/tlkio.css`}
      style={{ width: '100%', maxWidth: 820, height: 600, border: '2px solid #EEE' }}
    />
  );
};

export default Tlkio;
