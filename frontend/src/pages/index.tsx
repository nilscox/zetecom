import React from 'react';
import { Switch, Route, NavLink as ReactRouterNavLink, NavLinkProps } from 'react-router-dom';

import Home from './Home';
import Rules from './Rules';
import Motivations from './Motivations';
import FAQ from './FAQ';
import NotFound from './NotFound';

import './pages.css';

const Header: React.FC = () => (
  <div style={{ borderBottom: '1px solid #CCC', paddingBottom: 15 }}>
    <h1 style={{ fontSize: '3rem', lineHeight: '3rem' }}>Chercheurs de vérité</h1>
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

const Divider: React.FC = () => (
  <div className="divider"></div>
);

const Pages: React.FC = () => (
  <div className="page" style={{ margin: '50px auto' }}>

    <Header />

    <div className="content" style={{ minHeight: 250 }}>

      <nav>
        <ul style={{ listStyleType: 'none' }}>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/charte">La charte</NavLink>
          <NavLink to="/motivations">Motivations</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </ul>
      </nav>

      <Divider />

      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/charte" exact component={Rules} />
          <Route path="/motivations" exact component={Motivations} />
          <Route path="/faq" exact component={FAQ} />
          <Route component={NotFound} />
        </Switch>
      </main>

    </div>

  </div>
);

export default Pages;
