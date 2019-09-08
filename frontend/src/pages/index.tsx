import React from 'react';
import { Switch, Route, NavLink as ReactRouterNavLink, NavLinkProps } from 'react-router-dom';

import Flex from 'src/components/common/Flex';

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
  <div style={{ borderRight: '1px solid #CCC', margin: '0 10px' }}/>
);

const Pages: React.FC = () => (
  <div className="page" style={{ margin: 'auto', padding: '0 10%', color: '#222' }}>

    <Header />

    <Flex style={{ minHeight: 250 }}>

      <nav style={{ flex: 1, position: 'relative' }}>
        <ul style={{ listStyleType: 'none', position: 'sticky', top: 30, marginTop: 30 }}>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/utilisation">Utilisation</NavLink>
          <NavLink to="/charte">La charte</NavLink>
          <NavLink to="/motivations">Motivations</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </ul>
      </nav>

      <Divider />

      <main style={{ flex: 4, minWidth: 1000, paddingLeft: 10 }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/utilisation" exact component={Usage} />
          <Route path="/charte" exact component={Rules} />
          <Route path="/motivations" exact component={Motivations} />
          <Route path="/faq" exact component={FAQ} />
          <Route component={NotFound} />
        </Switch>
      </main>

    </Flex>

  </div>
);

export default Pages;
