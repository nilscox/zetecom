import React from 'react';

import styled from '@emotion/styled';
import { Route, Switch } from 'react-router';

import Footer from 'src/components/domain/Footer/Footer';
import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import UserMenu from 'src/components/domain/UserMenu/UserMenu';
import { useUser } from 'src/contexts/user';
import useAxios from 'src/hooks/useAxios';
import { size, spacing } from 'src/theme';

import AuthenticationPage from './AuthenticationPage/AuthenticationPage';

const Page = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: ${spacing(4)};
`;

const Main = styled.main`
  min-height: ${size('xlarge')};
`;

const Pages: React.FC = () => {
  const [, , logout] = useAxios({ method: 'POST', url: '/api/auth/logout' }, { manual: true });

  return (
    <Page>
      <HeaderLogo right={<UserMenu user={useUser()} onLogout={logout} />} />

      <Main>
        <Switch>
          <Route path="/(connexion|inscription|connexion-par-email)" component={AuthenticationPage} />
        </Switch>
      </Main>

      <Footer />
    </Page>
  );
};

export default Pages;
