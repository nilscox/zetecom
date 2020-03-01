import React from 'react';

import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';
import { Information } from 'src/types/Information';
import { InformationProvider } from 'src/utils/InformationContext';
import { useTheme } from 'src/utils/Theme';

import StandaloneReactionsPage from './pages/StandaloneReactionsPage';

const Header: React.FC = () => {
  const { fontSizes, colors, sizes } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <img
        src="/assets/images/logo.png"
        alt="Logo de Réagir à l'information"
        style={{ width: 36, height: 36, opacity: 0.8, marginRight: sizes.big }}
      />

      <div>
        <h1 style={{ fontFamily: 'Domine', fontSize: fontSizes.title }}>Réagir à l'information</h1>
        <div style={{ color: colors.textLight, fontSize: fontSizes.small, letterSpacing: 4 }}>
          Avec esprit critique !
        </div>
      </div>

    </div>
  );
};

const IntegrationRouter = () => (
  <Router>

    <Header />

    <Route path="/" exact render={() => <Redirect to="/reaction" />} />
    <Route path="/reaction" exact component={StandaloneReactionsPage} />

  </Router>
);

type IntegrationProps = {
  information: Information;
};

const Integration: React.FC<IntegrationProps> = ({ information }) => {
  const { colors: { border } } = useTheme();

  if (!information) {
    return (
      <div style={{ minHeight: 300, backgroundColor: 'white', padding: 10, border: `1px solid ${border}` }}>

        <Header />

        <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: 200 }}>
          <Text uppercase color="textLight">
            L'espace de commentaires n'est pas activé sur cette page.
          </Text>
        </Flex>

      </div>
    );
  }

  return (
    <InformationProvider value={information}>
      <div style={{ minHeight: 400, backgroundColor: 'white', padding: 10, border: `1px solid ${border}` }}>
        <IntegrationRouter />
      </div>
    </InformationProvider>
  );
};

export default Integration;
