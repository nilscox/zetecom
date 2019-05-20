import React from 'react';
import { NavLink } from 'react-router-dom';

import Typography from '../components/Typography';

const ViewHeader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      margin: '10px 0',
      paddingBottom: '5px',
      borderBottom: '1px solid #ccc',
    }}
  >
    <NavLink
      to="/popup/login"
      style={{ flex: 1, padding: '0 15px', color: '#999', textDecoration: 'none' }}
      activeStyle={{ color: '#222' }}
    >
      <Typography variant="title">Connexion</Typography>
    </NavLink>

    <div style={{ borderLeft: '1px solid #CCC' }} />

    <NavLink
      to="/popup/signup"
      style={{ flex: 1, padding: '0 15px', color: '#999', textDecoration: 'none' }}
      activeStyle={{ color: '#222' }}
    >
      <Typography variant="title">Inscription</Typography>
    </NavLink>
  </div>
);

export default ViewHeader;
