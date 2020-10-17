import React from 'react';

import Link from 'src/components/Link';

import Logo from './logo.png';

import './PageHeader.scss';

const PageHeader: React.FC = () => (
  <div className="page-header">

    <img className="logo" src={Logo} alt="Logo de Zétécom" />

    <h1 className="title">
      <Link href="/">Zétécom</Link>
      <Link href="/beta.html" className="beta" title="Rejoignez les bêta-testeurs !">BÊTA</Link>
    </h1>

    <div className="subtitle-container">
      <div className="subtitle subtitle-top">L'information</div>
      <div className="subtitle">avec esprit critique</div>
    </div>

  </div>
);

export default PageHeader;
