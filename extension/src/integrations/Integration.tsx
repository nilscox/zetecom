import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { Information } from 'src/types/Information';
import { useTheme } from 'src/utils/Theme';

import SubjectsListView from './views/SubjectsListView';
import SubjectView from './views/SubjectView';

const Header: React.FC = () => {
  const { fontSizes, colors } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <img src="/assets/images/logo.png" alt="Logo de Réagir à l'information" style={{ width: 36, height: 36, opacity: 0.8, marginRight: 10 }} />

      <div>
        <h1 style={{ fontFamily: 'Domine', fontSize: fontSizes.title }}>Réagir à l'information</h1>
        <div style={{ color: colors.textLight, fontSize: fontSizes.small, letterSpacing: 4 }}>Décryptons les médias !</div>
      </div>

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
        <Route path="/" exact render={(props) => <SubjectsListView information={information} {...props} />} />
        <Route path="/subject/:id" exact component={SubjectView} />
      </Router>
    </div>
  );
};

export default Integration;
