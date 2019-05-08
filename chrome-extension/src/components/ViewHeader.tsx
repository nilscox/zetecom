import React from 'react';

import Typography from '../components/Typography';

type ViewHeaderProps = {
  active: 'login' | 'signup';
};

const ViewHeader: React.FC<ViewHeaderProps> = ({ active }) => (
  <div
    style={{
      display: 'flex',
      margin: '10px 0',
      paddingBottom: '5px',
      borderBottom: '1px solid #ccc'
    }}
  >
    <div style={{ flex: 1, padding: '5px 10px' }}>
      <Typography variant="title" style={{ color: active === 'login' ? '#222' : '#999' }}>
        Connexion
      </Typography>
    </div>
    <div style={{ height: '100$', borderLeft: '1px solid #CCC' }} />
    <div style={{ flex: 1, padding: '5px 10px' }}>
      <Typography variant="title" style={{ color: active === 'signup' ? '#222' : '#999' }}>
        Inscription
      </Typography>
    </div>
  </div>
);

export default ViewHeader;
