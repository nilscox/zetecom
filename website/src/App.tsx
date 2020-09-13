import React, { useEffect } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';

import pages from './pages';
import EmailValidatedAlert from './components/EmailValidatedAlert';
import PageHeader from './components/PageHeader';
import Navigation from './components/Navigation';
import PageFooter from './components/PageFooter';
import usePageViewTracking from './utils/usePageViewTracking';

import '@openfonts/noticia-text_all/index.css';
import '@openfonts/nunito-sans_all/index.css';

import 'reset-css';
import './styles.scss';

const Routes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Switch>
      { pages.map(({ id, path, Component }) => (
        <Route key={id} exact path={path} component={Component} />
      )) }
    </Switch>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const page = pages.find(({ path }) => path === location.pathname);

  usePageViewTracking();

  return (
    <div className="page" id={`page-${page ? page.id : ''}`}>

      <EmailValidatedAlert />
      <PageHeader />

      <div className="page-content">

        <Navigation />

        <main>
          <Routes />
        </main>

      </div>

      <PageFooter />

    </div>
  );
};

export default App;
