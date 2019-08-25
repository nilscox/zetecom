import React from 'react';
import { Switch, Route, NavLink as ReactRouterNavLink, NavLinkProps } from 'react-router-dom';

import Home from './Home';
import Usage from './Usage';
import Rules from './Rules';
import Motivations from './Motivations';
import FAQ from './FAQ';
import NotFound from './NotFound';

import Header from './components/Header';

import './pages.css';

const NavLink: React.FC<NavLinkProps & { disabled?: boolean }> = ({ disabled, ...props }) => (
  <li
    style={{
      textAlign: 'right',
      fontSize: '1.4rem',
      color: disabled ? '#999' : '#666',
      marginBottom: 16,
      textTransform: 'uppercase',
      ...props.style,
    }}
  >
    { disabled ? (
      <div>
        {props.children}
      </div>
    ) : (
      <ReactRouterNavLink
        exact
        style={{ textDecoration: 'none', color: 'inherit' }}
        activeStyle={{ color: '#222', fontWeight: 'bold' }}
        {...props}
      />
    ) }
  </li>
);

const Divider: React.FC = () => (
  <div className="divider"></div>
);

const Pages: React.FC = () => (
  <div className="page" style={{ margin: '50px auto', padding: '0 10%' }}>

    <Header />

    <div className="content" style={{ minHeight: 250 }}>

      <nav style={{ position: 'relative' }}>
        <ul style={{ listStyleType: 'none', position: 'sticky', top: 30, marginTop: 30 }}>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/utilisation">Utilisation</NavLink>
          <NavLink to="/charte">La charte</NavLink>
          <NavLink to="/motivations">Motivations</NavLink>
          <NavLink to="/faq" disabled>FAQ</NavLink>
        </ul>
      </nav>

      <Divider />

      <main style={{ paddingLeft: 10 }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/utilisation" exact component={Usage} />
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
