import React from 'react';

import { usePage } from 'src/index';
import routes from 'src/pages';

import './Navgation.scss';

const Navigation = () => {
  const page = usePage();
  const active = (path: string) => page.path === path;

  return (
    <nav className="navigation">

      <div className="navigation-burger">≡</div>

      <div className="navigation-links">
        { routes.map(({ id, label, path }) => (
          <a key={id} className={'navigation-link' + (active(path) ? ' active' : '')} href={path}>
            { label }
          </a>
        )) }
      </div>

    </nav>
  );
};

export default Navigation;
