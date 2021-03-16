import React from 'react';

import RouterLink from 'src/components/Link/RouterLink';
import AppLink from 'src/components/Link/AppLink';

import Logo from '../../images/logo.png';

import './PageHeader.scss';

const PageHeader: React.FC = () => (
  <div className="page-header">
    <img className="logo" src={Logo} alt="Logo de Zétécom" />

    <h1 className="title">
      <RouterLink to="/">Zétécom</RouterLink>
      <RouterLink to="/beta.html" className="beta" title="Rejoignez les bêta-testeurs !">
        BÊTA
      </RouterLink>
    </h1>

    <div className="subtitle-container">
      <div className="subtitle subtitle-top">L'information</div>
      <div className="subtitle">avec esprit critique</div>
    </div>

    <div style={{ flex: 1 }}></div>

    <AppLink className="app-link">Voir les zones de commentaires</AppLink>
  </div>
);

export default PageHeader;
