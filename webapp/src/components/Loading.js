import React from 'react';

import { classList } from 'Utils';

const sizes = {
  small: 24,
  default: 48,
  large: 64,
};

const Loading = ({ size = 'default' }) => (
  <div className={classList('d-flex', 'justify-content-center', size === 'default' && 'my-4', size === 'large' && 'my-5')}>
    <img src="/assets/images/loader.svg" width={sizes[size]} height={sizes[size]} />
  </div>
);

export default Loading;
