import React, { useState, useEffect } from 'react';

import { matchPath, useLocation } from 'react-router-dom';

import pages from 'src/pages';
import RouterLink from 'src/components/Link/RouterLink';

import './Navgation.scss';

const useActivePage = () => {
  const location = useLocation();

  return (path: string) => matchPath(location.pathname, { path, exact: true }) !== null;
}

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const active = useActivePage();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navigation${open ? ' open' : ''}`}>

      <div className="navigation-burger" onClick={() => setOpen(open => !open)}>≡</div>

      <div className="navigation-links">
        { pages.map(({ id, label, path }) => label !== null && (
          <RouterLink key={id} to={path} className={'navigation-link' + (active(path) ? ' active' : '')}>
            { label }
          </RouterLink>
        )) }
      </div>

    </nav>
  );
};

export default Navigation;
