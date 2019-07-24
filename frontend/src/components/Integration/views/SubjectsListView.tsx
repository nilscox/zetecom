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
import SortSelect from 'src/components/SortSelect';
import SubjectsList from 'src/components/SubjectsList';

const useSubjects = (information: Information, sort: SortType) => {
  const [subjects, setSubjects] = useState<Subject[] | undefined>();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);

    fetchSubjects(information.id, sort)
      .then(subjects => {
        if (subjects)
          setSubjects(subjects);

        setFetching(false);
      });
  }, [information, sort]);

  return {
    fetchingSubjects: fetching,
    subjects,
  };
};

type SubjectsListViewProps = {
  information?: Information;
  setSubject: (subject: Subject) => void;
};

const SubjectsListView: React.FC<SubjectsListViewProps> = ({ information, setSubject }) => {
  const [sort, setSort] = useState(localStorage.getItem('sort') as SortType);
  const { sizes: { big } } = useTheme();
  const { fetchingSubjects, subjects } = useSubjects(information, sort);

  const onSort = (newSort: SortType) => {
    if (newSort === sort)
      return;

    localStorage.setItem('sort', newSort);
    setSort(newSort);
  };

  return (
    <>

      <Flex m={big} flexDirection="row" alignItems="center">
        <Text>Tri :</Text>
        <Box ml={big}>
          <SortSelect disabled={!subjects} onChange={(sort) => setSort(sort)} />
        </Box>
      </Flex>

      { !subjects ? <Loader size="big" /> : <SubjectsList subjects={subjects} setSubject={setSubject} /> }

    </>
  );
};

export default SubjectsListView;
