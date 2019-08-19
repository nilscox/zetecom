import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import { Information } from 'src/types/Information';

import SubjectsListView from './views/SubjectsListView';
import SubjectView from './views/SubjectView';

type IntegrationProps = {
  information: Information;
};

const Integration: React.FC<IntegrationProps> = ({ information }) => {
  return (
    <Router>
      <Route path="/" exact render={(props) => <SubjectsListView information={information} {...props} />} />
      <Route path="/subject/:id" exact component={SubjectView} />
    </Router>
  );
};

export default Integration;
