import React, { useEffect } from 'react';

import { useEnvironment } from 'src/index';

import './Tlkio.scss';

const Tlkio: React.FC = () => (
  <div
    id="tlkio"
    data-channel="reagir-information"
    data-theme="theme--minimal"
    data-custom-css={useEnvironment('BASE_URL') + '/assets/css/tlkio.css'}
  />
);

export default Tlkio;
