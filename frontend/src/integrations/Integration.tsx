import React, { useState } from 'react';

import { Information } from 'src/types/Information';
import { Subject } from 'src/types/Subject';

import SubjectsListView from './views/SubjectsListView';
import SubjectView from './views/SubjectView';

type IntegrationProps = {
  information: Information;
};

const Integration: React.FC<IntegrationProps> = ({ information }) => {
  const [currentSubject, setCurrentSubject] = useState<Subject | undefined>();

  if (currentSubject)
    return <SubjectView subject={currentSubject} backToSubjectsList={() => setCurrentSubject(undefined)} />;

  return <SubjectsListView information={information} setSubject={setCurrentSubject} />;
};

export default Integration;
