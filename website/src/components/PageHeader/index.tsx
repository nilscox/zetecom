import React from 'react';

import Logo from './logo.png';

import './PageHeader.scss';

const PageHeader: React.FC = () => (
  <div className="page-header">

    <img className="logo" src={Logo} alt="Logo de Zétécom" />

    <h1 className="title">
      Zétécom
      <div className="beta" title="Le projet est en phase de test, lancement officiel bientôt !">BETA</div>
    </h1>

    <div className="subtitle-container">
      <div className="subtitle subtitle-top">L'information</div>
      <div className="subtitle">avec esprit critique</div>
    </div>

  </div>
);

export default PageHeader;
