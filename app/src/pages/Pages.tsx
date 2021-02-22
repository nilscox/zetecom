import React from 'react';

import styled from '@emotion/styled';
import { Route, Switch } from 'react-router';

import Footer from 'src/components/domain/Footer/Footer';
import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import UserMenuContainer from 'src/containers/UserMenuContainer/UserMenuContainer';
import { NotificationsProvider } from 'src/contexts/notificationsContext';
import NotificationsPage from 'src/pages/NotificationsPage/NotificationsPage';
import { size, spacing } from 'src/theme';

import AuthenticationPage from './AuthenticationPage/AuthenticationPage';
import CommentsAreaPage from './CommentsAreaPage/CommentsAreaPage';
import CommentsAreasListPage from './CommentsAreasListPage/CommentsAreasListPage';

const Page = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: ${spacing(4)};

  @media (max-width: 1280px) {
    max-width: 720px;
  }

  @media (max-width: 768px) {
    max-width: 600px;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    margin-left: ${spacing(4)};
    margin-right: ${spacing(4)};
  }
`;

const Main = styled.main`
  min-height: ${size('xlarge')};
`;

const Pages: React.FC = () => (
  <NotificationsProvider>
    <Page>
      <HeaderLogo right={<UserMenuContainer />} />

      <Main>
        <Switch>
          <Route path="/" exact component={CommentsAreasListPage} />
          <Route path="/commentaires/:commentsAreaId" component={CommentsAreaPage} />
          <Route path="/(connexion|inscription|connexion-par-email)" component={AuthenticationPage} />
          <Route path="/notifications" component={NotificationsPage} />
        </Switch>
      </Main>

      <Footer />
    </Page>
  </NotificationsProvider>
);

export default Pages;
