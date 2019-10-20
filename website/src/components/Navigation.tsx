import React from 'react';

import { usePage } from 'src/index';
import pages from 'src/pages';
import Link from 'src/components/Link';

import './Navgation.scss';

const useActivePage = () => {
  const page = usePage();

  return (path: string) => page.path === path;
}

const Navigation = () => {
  const active = useActivePage();

  return (
    <nav className="navigation">

      <div className="navigation-burger">≡</div>

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
