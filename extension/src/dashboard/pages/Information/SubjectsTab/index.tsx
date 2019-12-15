import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SubjectsList from './SubjectsList';
import Subject from './Subject';

const SubjectsTab = () => {
  return (
    <Switch>
      <Route exact path="/information/:id/thematiques" component={SubjectsList} />
      <Route path="/information/:id/thematiques/:subjectId" component={Subject} />
    </Switch>
  );
};

export default SubjectsTab;
