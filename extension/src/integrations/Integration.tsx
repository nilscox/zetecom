import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { Information } from 'src/types/Information';
import { useTheme } from 'src/utils/Theme';

import SubjectsListPage from './pages/SubjectsListPage';
import SubjectPage from './pages/SubjectPage';

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
          Décryptons les médias !
        </div>
      </div>

    </div>
  );
};

const Navigation: React.FC = () => {
  const { colors, fontSizes, sizes } = useTheme();

  const tabStyle: React.CSSProperties = {
    width: 120,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: fontSizes.small,
    color: colors.textLight,
    cursor: 'pointer',
  };

  const activeStyle: React.CSSProperties = {
    borderBottom: `3px solid ${colors.border}`,
    paddingBottom: 0,
    color: colors.text,
    cursor: 'initial',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: sizes.big, borderBottom:
        `1px solid ${colors.borderLight}`,
      }}
    >
      <div style={{ ...tabStyle }}>Réactions</div>
      <div style={{ ...tabStyle, ...activeStyle }}>Sujets</div>
    </div>
  );
};

type IntegrationProps = {
  information: Information;
};

const Integration: React.FC<IntegrationProps> = ({ information }) => {
  const { colors: { border } } = useTheme();

  return (
    <div style={{ minHeight: 480, backgroundColor: 'white', padding: 10, border: `1px solid ${border}` }}>
      <Router>
        <Header />
        <Navigation />
        <Route path="/" exact render={(props) => <SubjectsListPage information={information} {...props} />} />
        <Route path="/subject/:id" exact component={SubjectPage} />
      </Router>
    </div>
  );
};

export default Integration;
