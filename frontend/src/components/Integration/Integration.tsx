import React, { useEffect, useState } from 'react';

import { Information } from 'src/types/Information';
import { Subject } from 'src/types/Subject';
import { SortType } from 'src/types/SortType';
import { fetchSubjects } from 'src/api/subjects';
import { useTheme } from 'src/utils/Theme';

import Box from 'src/components/Box';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import Loader from 'src/components/Loader';

import SubjectsListView from './views/SubjectsListView';
import SubjectView from './views/SubjectView';

type IntegrationProps = {
  information: Information;
};

const Integration: React.FC<IntegrationProps> = ({ information }) => {
  const [currentSubject, setCurrentSubject] = useState<Subject | undefined>();

  if (currentSubject)
    return <SubjectView subject={currentSubject} backToSubjectsList={() => setCurrentSubject(undefined)} />

  return <SubjectsListView information={information} setSubject={setCurrentSubject} />;
};

export default Integration;
