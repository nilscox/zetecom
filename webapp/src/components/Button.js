import * as React from 'react';

import { Loading } from 'Components';

const Button = ({ loading, children, ...props }) => (
  <button
    {...props}
  >
    { loading
      ? <Loading size="small" />
      : children
    }
  </button>
);

export default Button;
