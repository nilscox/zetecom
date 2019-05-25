import React from 'react';
import { Route, NavLink as ReactRouterNavLink, NavLinkProps } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Home from './Home';
import Rules from './Rules';
import Motivations from './Motivations';
import FAQ from './FAQ';
import NotFound from './NotFound';

const Header: React.FC = () => (
  <div style={{ borderBottom: '1px solid #CCC', paddingBottom: 15, marginBottom: 15 }}>
    <h1 style={{ fontSize: '3rem' }}>Chercheurs de vérité</h1>
  </div>
);

const NavLink: React.FC<NavLinkProps> = (props) => (
  <li
    style={{
      textAlign: 'right',
      fontSize: '1.4rem',
      color: '#666',
      marginBottom: 16,
      textTransform: 'uppercase',
    }}
  >
    <ReactRouterNavLink
      exact
      style={{ textDecoration: 'none', color: 'inherit' }}
      activeStyle={{ color: '#222', fontWeight: 'bold' }}
      {...props}
    />
  </li>
);

const Nav: React.FC = () => (
  <nav>
    <ul style={{ listStyleType: 'none' }}>
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/charte">La charte</NavLink>
      <NavLink to="/motivations">Motivations</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
    </ul>
  </nav>
);

const Divider: React.FC = () => (
  <div style={{ borderRight: '1px solid #CCC', margin: '0 10px' }}></div>
);

const transition = {
  atActive: {
    opacity: 1,
  },
  atEnter: {
    opacity: 0,
  },
  atLeave: {
    opacity: 0,
  },
};

const Pages: React.FC = () => (
  <div className="page" style={{ margin: '50px auto' }}>

    <Header />

    <div style={{ display: 'flex', minHeight: 250 }}>

      <div style={{ flex: 1 }}>
        <Nav />
      </div>

      <Divider />

      <main style={{ flex: 4 }}>
        <AnimatedSwitch
          {...transition}
          className="switch-wrapper"
        >
          <Route path="/" exact component={Home} />
          <Route path="/charte" exact component={Rules} />
          <Route path="/motivations" exact component={Motivations} />
          <Route path="/faq" exact component={FAQ} />
          <Route component={NotFound} />
        </AnimatedSwitch>
      </main>

    </div>

  </div>
);

export default Pages;
