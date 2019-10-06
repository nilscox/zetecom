import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import Flex from 'src/components/common/Flex';

import Home from './Home';
import Usage from './Usage';
import Rules from './Rules';
import Motivations from './Motivations';
import FAQ from './FAQ';
import NotFound from './NotFound';

import Navigation from './components/Navigation';
import Header from './components/Header';
import useResponsive from './hooks/useResponsive';

import './pages.css';

/* eslint-disable key-spacing, no-multi-spaces */
export const routes = [
  { id: 'home',         path: '/',            label: 'Accueil',     Component: Home },
  { id: 'usage',        path: '/utilisation', label: 'Utilisation', Component: Usage },
  { id: 'rules',        path: '/charte',      label: 'La charte',   Component: Rules },
  { id: 'motivations',  path: '/motivations', label: 'Motivations', Component: Motivations },
  { id: 'faq',          path: '/faq',         label: 'FAQ',         Component: FAQ },
];
/* eslint-enable key-spacing, no-multi-spaces */

const DividerDesktop: React.FC = () => <div style={{ borderRight: '1px solid #CCC', margin: '0 10px' }}/>;
const DividerMobile: React.FC = () => <div style={{ width: '100%', borderTop: '1px solid #CCC' }}/>;

const Pages: React.FC<RouteComponentProps> = ({ location }) => {
  const { choose, Choose } = useResponsive();
  const page = routes.find(r => r.path === location.pathname);

  return (
    <div
      data-e2e={page ? `page-${page.id}` : undefined}
      className="page"
      style={{
        margin: 'auto',
        padding: '0 10%',
        color: '#222',
      }}
    >

      <Header />

      <Flex flexDirection={choose({ mobile: 'column', desktop: 'row' })} style={{ minHeight: 250 }}>

        <Navigation location={location} />
        <Choose mobile={<DividerMobile />} desktop={<DividerDesktop />} />

        <main style={{ flex: 4, paddingLeft: 10 }}>
          <Switch>

            { routes.map(({ id, path, Component }) => (
              <Route key={id} path={path} exact component={Component} />
            )) }

            <Route component={NotFound} />

          </Switch>
        </main>

      </Flex>

    </div>
  );
};

export default Pages;
