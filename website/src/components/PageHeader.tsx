import React from 'react';

import './PageHeader.scss';

const PageHeader: React.FC = () => (
  <div className="page-header">

    <img className="logo" src="/assets/images/logo.png" alt="Logo Réagir à l'information" />

    <div className="header-title">
      <h1 className="title">Réagir à l'information</h1>
      <div className="subtitle">Décryptons les médias !</div>
    </div>

  </div>
);

export default PageHeader;
