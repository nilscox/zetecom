import React, { useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { useDebounce } from 'use-debounce';

import { useCurrentUser } from 'src/utils/UserContext';
import { Information } from 'src/types/Information';
import { parseSubject } from 'src/types/Subject';
import { SortType } from 'src/types/SortType';
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

import useAxios, { ResponseData } from 'src/hooks/use-axios';

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

const useSubjects = (informationId: number, sort: SortType, search?: string) => {
  const [searchDebounced] = useDebounce(search, 300);
  const qs = queryString.stringify({ sort, search: searchDebounced });
  const url = `/api/information/${informationId}/subjects` + (qs ? '?' + qs : '');
  const parse = useCallback((data: ResponseData) => data.map(parseSubject), []);

  return useAxios(url, parse);
};

type SubjectsListViewProps = RouteComponentProps & {
  information?: Information;
};

const SubjectsListView: React.FC<SubjectsListViewProps> = ({ history, information }) => {
  const user = useCurrentUser();
  const { sizes: { big } } = useTheme();
  const [sort, setSort] = useState(localStorage.getItem('sort') as SortType);
  const [search, setSearch] = useState('');

  const [displaySubjectForm, setDisplaySubjectForm] = useState(false);
  const [showSubjectForm, hideSubjectForm] = [true, false].map(v => () => setDisplaySubjectForm(v));

  const [{ data: subjects, loading }] = useSubjects(information.id, sort, search);

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
          onCreated={(subject) => history.push(`/subject/${subject.id}`)}
          onClose={hideSubjectForm}
        />
      ) }

      <Break size="big" />

      { loading ? (
        <Loader size="big" />
      ) : (
        <SubjectsListOrNotFound subjects={subjects} />
      ) }

    </>
  );
};

export default SubjectsListView;