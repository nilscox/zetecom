import React from 'react';

import styled from '@emotion/styled';
import { Route, Switch } from 'react-router-dom';

import { Footer } from '~/components/domain/Footer/Footer';
import { Header } from '~/components/domain/Header/Header';
import { UserMenu } from '~/components/domain/UserMenu/UserMenu';
import { Box } from '~/components/layout/Box/Box';
import { Fallback } from '~/components/layout/Fallback/Fallback';
import { domain, spacing } from '~/theme';

import { AuthenticationView } from './AuthenticationView/AuthenticationView';
import { CommentHistoryView } from './CommentHistoryView/CommentHistoryView';
import { CommentsAreasListView } from './CommentsAreasListView/CommentsAreasListView';
import { CommentsAreaView } from './CommentsAreaView/CommentsAreaView';
import { ExtensionPopupView } from './ExtensionPopupView/ExtensionPopupView';
import { IntegrationView } from './IntegrationView/IntegrationView';
import { NotificationsView } from './NotificationsView/NotificationsView';
import { ReportCommentView } from './ReportCommentView/ReportCommentView';

export const Views: React.FC = () => (
  <Switch>
    <Route path="/popup" component={ExtensionPopupView} />
    <Route path="/integration/:identifier" component={IntegrationView} />
    <Route path="/commentaire/:commentId/historique" component={CommentHistoryView} />
    <Route path="/commentaire/:commentId/signaler" component={ReportCommentView} />
    <Route>
      <Pages />
    </Route>
  </Switch>
);

const Pages: React.FC = () => (
  <Container marginTop={4}>
    <Header right={<UserMenu />} />

    <Main>
      <Switch>
        <Route path="/" exact component={CommentsAreasListView} />
        <Route path="/commentaires/:commentsAreaId" component={CommentsAreaView} />
        <Route path="/(connexion|inscription|lien-de-connexion)" component={AuthenticationView} />
        <Route path="/notifications" component={NotificationsView} />
        <Route>
          <Fallback>Cette page n'existe pas.</Fallback>
        </Route>
      </Switch>
    </Main>

    <Footer />
  </Container>
);

const Container = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;

  @media (max-width: 1280px) {
    max-width: 720px;
  }

  @media (max-width: 768px) {
    max-width: 600px;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    margin: ${spacing(4)};
  }
`;

const Main = styled.main`
  min-height: ${domain('page', 'minHeight')};
`;
