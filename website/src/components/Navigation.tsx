import React, { useState } from 'react';

import { matchPath, useLocation } from 'react-router-dom';

import pages from 'src/pages';
import Link from 'src/components/Link';

import './Navgation.scss';

const useActivePage = () => {
  const location = useLocation();

  return (path: string) => matchPath(location.pathname, { path, exact: true }) !== null;
}

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const active = useActivePage();

  return (
    <nav className={`navigation${open ? ' open' : ''}`}>

      <div className="navigation-burger" onClick={() => setOpen(open => !open)}>≡</div>

      <div className="navigation-links">
        { pages.map(({ id, label, path }) => (
          <Link key={id} className={'navigation-link' + (active(path) ? ' active' : '')} href={path}>
            { label }
          </Link>
        )) }
      </div>

    </nav>
  );
};

export default Navigation;
