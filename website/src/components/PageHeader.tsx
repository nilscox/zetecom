import React from 'react';

import Logo from 'src/images/logo.png';

import './PageHeader.scss';

const PageHeader: React.FC = () => (
  <div className="page-header">

    <img className="logo" src={Logo} alt="Logo de Réagir à l'information" />

    <div className="header-title">
      <h1 className="title">Réagir à l'information</h1>
      <div className="subtitle">Décryptons les médias !</div>
    </div>

    <div className="beta" title="Le projet est en phase de test, lancement officiel bientôt !">BETA</div>

  </div>
);

export default PageHeader;
