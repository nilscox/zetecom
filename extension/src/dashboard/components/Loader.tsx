import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loader: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </div>
  );
};


export default Loader;
