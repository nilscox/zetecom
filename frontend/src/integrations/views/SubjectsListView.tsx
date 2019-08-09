import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

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
import Input from 'src/components/common/Input';
import Loader from 'src/components/common/Loader';
import Text from 'src/components/common/Text';
import SortSelect from 'src/components/common/SortSelect';
import SubjectsList, { SubjectsListProps } from 'src/components/subject/SubjectsList';
import SubjectForm from 'src/components/subject/SubjectForm';

const SubjectsListOrNotFound: React.FC<SubjectsListProps> = (props) => {
  if (!props.subjects.length) {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: 60 }}>
        <Text uppercase color="textLight">Pas de sujet trouvé.</Text>
      </Flex>
    );
  }

  return <SubjectsList {...props} />;
};

const useSubjects = (information: Information, sort: SortType, search: string) => {
  const [subjects, setSubjects] = useState<Subject[] | undefined>();
  const [fetching, setFetching] = useState(true);
  const [searchDebounced] = useDebounce(search, 300);

  useEffect(() => {
    setFetching(true);

    fetchSubjects(information.id, sort, searchDebounced)
      .then(subjects => {
        if (subjects)
          setSubjects(subjects);

        setFetching(false);
      });
  }, [information, sort, searchDebounced]);

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
  const [search, setSearch] = useState('');
  const [displaySubjectForm, setDisplaySubjectForm] = useState(false);
  const { sizes: { big } } = useTheme();
  const { fetchingSubjects, subjects } = useSubjects(information, sort, search);
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

      <Flex my={big} flexDirection="row" alignItems="center">

        <Input
          type="text"
          placeholder="Rechercher..."
          style={{ flex: 1, marginRight: big }}
          onChange={e => setSearch(e.currentTarget.value)}
        />

        <Box mr={big}>
          <SortSelect disabled={!subjects || true} onChange={onSort} />
        </Box>

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

      { fetchingSubjects ? (
        <Loader size="big" />
      ) : (
        <SubjectsListOrNotFound subjects={subjects} setSubject={setSubject} />
      ) }

    </>
  );
};

export default SubjectsListView;
