import React, { useState } from 'react';
import { NavLink as ReactRouterNavLink, NavLinkProps, RouteComponentProps } from 'react-router-dom';

import Flex from 'src/components/common/Flex';
import useResponsive from '../hooks/useResponsive';

import { routes } from '../index';

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

const NavigationDesktop: React.FC = () => (
  <nav data-e2e="navigation" style={{ flex: 1, position: 'relative' }}>
    <ul style={{ listStyleType: 'none', position: 'sticky', top: 30, marginTop: 30 }}>
      { routes.map(({ id, path, label }) => (
        <NavLink key={id} to={path}>{ label }</NavLink>
      )) }
    </ul>
  </nav>
);

const NavigationMobile: React.FC<{ location: RouteComponentProps['location'] }> = ({ location }) => {
  const [dropdown, showDropdown] = useState(false);
  const currentRoute = routes.find(({ path }) => path === location.pathname);

  if (!currentRoute)
    return null;

  if (dropdown) {
    return (
      <nav
        data-e2e="navigation"
        style={{
          position: 'relative',
          height: 40,
          zIndex: 1,
        }}
        onClick={() => showDropdown(false)}
      >
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
          { routes.map(({ id, path, label }) => (
            <NavLink key={id} to={path}>{ label }</NavLink>
          )) }
        </ul>
      </nav>
    );
  }

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
          ≡ { currentRoute.label }
        </span>
      </Flex>
    </nav>
  );
};

const Navigation: React.FC<{ location: RouteComponentProps['location'] }> = ({ location }) => {
  const { Choose } = useResponsive();

  return (
    <Choose
      mobile={<NavigationMobile location={location} />}
      desktop={<NavigationDesktop />}
    />
  );
};

export default Navigation;
