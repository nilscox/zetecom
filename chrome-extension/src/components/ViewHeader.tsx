import React from 'react';

import Typography from '../components/Typography';

type ViewHeaderProps = {
  active: 'login' | 'signup' | string;
  onChangeView: (view: 'login' | 'signup') => void;
};

const ViewHeader: React.FC<ViewHeaderProps> = ({ active, onChangeView }) => (
  <div
    style={{
      display: 'flex',
      margin: '10px 0',
      paddingBottom: '5px',
      borderBottom: '1px solid #ccc'
    }}
  >
    <div onClick={() => onChangeView('login')} style={{ flex: 1, padding: '5px 10px', cursor: 'pointer' }}>
      <Typography variant="title" style={{ color: active === 'login' ? '#222' : '#999' }}>
        Connexion
      </Typography>
    </div>
    <div style={{ borderLeft: '1px solid #CCC' }} />
    <div onClick={() => onChangeView('signup')} style={{ flex: 1, padding: '5px 10px', cursor: 'pointer' }}>
      <Typography variant="title" style={{ color: active === 'signup' ? '#222' : '#999' }}>
        Inscription
      </Typography>
    </div>
  </div>
);

export default ViewHeader;
