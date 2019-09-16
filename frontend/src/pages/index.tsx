import React, { useState } from 'react';
import { Switch, Route, NavLink as ReactRouterNavLink, NavLinkProps, RouteComponentProps } from 'react-router-dom';

import Flex from 'src/components/common/Flex';

import Home from './Home';
import Usage from './Usage';
import Rules from './Rules';
import Motivations from './Motivations';
import FAQ from './FAQ';
import NotFound from './NotFound';

import useResponsive from './hooks/useResponsive';
import Header from './components/Header';

import './pages.css';

const NavLink: React.FC<NavLinkProps & { disabled?: boolean }> = ({ disabled, ...props }) => {
  const { choose } = useResponsive();

  return (
    <li
      style={{
        textAlign: choose({ desktop: 'right', mobile: 'left' }),
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
};

const DividerDesktop: React.FC = () => <div style={{ borderRight: '1px solid #CCC', margin: '0 10px' }}/>;
const DividerMobile: React.FC = () => <div style={{ width: '100%', borderTop: '1px solid #CCC' }}/>;

const NavigationDesktop: React.FC = () => (
  <nav style={{ flex: 1, position: 'relative' }}>
    <ul style={{ listStyleType: 'none', position: 'sticky', top: 30, marginTop: 30 }}>
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/utilisation">Utilisation</NavLink>
      <NavLink to="/charte">La charte</NavLink>
      <NavLink to="/motivations">Motivations</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
    </ul>
  </nav>
);

const NavigationMobile: React.FC<{ location: RouteComponentProps['location'] }> = ({ location }) => {
  const [dropdown, showDropdown] = useState(false);
  const routes = {
    '/': 'Accueil',
    '/utilisation': 'Utilisation',
    '/charte': 'La charte',
    '/motivations': 'Motivations',
    '/faq': 'FAQ',
  };

  if (dropdown) {
    return (
      <nav style={{ position: 'relative', height: 40, zIndex: 1 }} onClick={() => showDropdown(false)}>
        <ul
          style={{
            listStyleType: 'none',
            position: 'absolute',
            padding: 0,
            paddingLeft: 22,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderBottom: '1px solid #CCC',
          }}
        >
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/utilisation">Utilisation</NavLink>
          <NavLink to="/charte">La charte</NavLink>
          <NavLink to="/motivations">Motivations</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
        </ul>
      </nav>
    );
  }

  if (!Object.keys(routes).includes(location.pathname))
    return null;

  return (
    <nav>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        style={{ height: 40 }}
      >
        <span
          style={{
            fontSize: '1.4rem',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
          onClick={() => showDropdown(!dropdown)}
        >
          ≡ { (routes as any)[location.pathname] }
        </span>
      </Flex>
    </nav>
  );
};

const Pages: React.FC<RouteComponentProps> = ({ location }) => {
  const { choose, Choose } = useResponsive();

  return (
    <div className="page" style={{ margin: 'auto', padding: '0 10%', color: '#222' }}>

      <Header />

      <Flex flexDirection={choose({ mobile: 'column', desktop: 'row' })} style={{ minHeight: 250 }}>

        <Choose mobile={<NavigationMobile location={location} />} desktop={<NavigationDesktop />} />
        <Choose mobile={<DividerMobile />} desktop={<DividerDesktop />} />

        <main style={{ flex: 4, paddingLeft: 10 }}>
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
};

export default Pages;
