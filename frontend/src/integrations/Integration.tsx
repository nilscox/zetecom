import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { Information } from 'src/types/Information';
import { useTheme } from 'src/utils/Theme';

import SubjectsListView from './views/SubjectsListView';
import SubjectView from './views/SubjectView';

type IntegrationProps = {
  information: Information;
};

const Integration: React.FC<IntegrationProps> = ({ information }) => {
  const { colors: { border } } = useTheme();

  return (
    <div style={{ minHeight: 480, backgroundColor: 'white', padding: 10, border: `1px solid ${border}` }}>
      <Router>
        <Route path="/" exact render={(props) => <SubjectsListView information={information} {...props} />} />
        <Route path="/subject/:id" exact component={SubjectView} />
      </Router>
    </div>
  );
};

export default Integration;
