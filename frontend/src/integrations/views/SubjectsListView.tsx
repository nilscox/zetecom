import React, { useEffect, useState } from 'react';

import { useCurrentUser } from 'src/utils/UserContext';
import { Information } from 'src/types/Information';
import { Subject } from 'src/types/Subject';
import { SortType } from 'src/types/SortType';
import { fetchSubjects } from 'src/api/subjects';
import { useTheme } from 'src/utils/Theme';

import Break from 'src/components/common/Break';
import Button from 'src/components/common/Button';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';
import Loader from 'src/components/common/Loader';
import SortSelect from 'src/components/common/SortSelect';
import SubjectsList from 'src/components/subject/SubjectsList';
import SubjectForm from 'src/components/subject/SubjectForm';

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
  const user = useCurrentUser();
  const [sort, setSort] = useState(localStorage.getItem('sort') as SortType);
  const [displaySubjectForm, setDisplaySubjectForm] = useState(false);
  const { sizes: { big } } = useTheme();
  const { fetchingSubjects, subjects } = useSubjects(information, sort);
  const [showSubjectForm, hideSubjectForm] = [true, false].map(v => () => setDisplaySubjectForm(v));

  const onSort = (newSort: SortType) => {
    if (newSort === sort)
      return;

    localStorage.setItem('sort', newSort);
    setSort(newSort);

    // TODO: do sort
  };

  return (
    <>

      <Flex m={big} flexDirection="row" alignItems="center">

        <Text>Tri :</Text>
        <Box ml={big}>
          <SortSelect disabled={!subjects} onChange={onSort} />
        </Box>

        <Flex flex={1} />

        { user && <Button onClick={showSubjectForm}>Nouveau sujet</Button> }

      </Flex>

      { displaySubjectForm && (
        <SubjectForm
          informationId={information.id}
          onCreated={setSubject}
          onClose={hideSubjectForm}
        />
      ) }

      <Break size="big" />

      { fetchingSubjects ? <Loader size="big" /> : <SubjectsList subjects={subjects} setSubject={setSubject} /> }

    </>
  );
};

export default SubjectsListView;
