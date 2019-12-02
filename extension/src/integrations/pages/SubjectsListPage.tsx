import React, { useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { useDebounce } from 'use-debounce';

import { parseSubject } from 'src/types/Subject';
import { SortType } from 'src/types/SortType';
import { useCurrentUser } from 'src/utils/UserContext';
import { useInformation } from 'src/utils/InformationContext';
import useAxios, { ResponseData } from 'src/hooks/use-axios';

import Break from 'src/components/common/Break';
import Button from 'src/components/common/Button';
import Flex from 'src/components/common/Flex';
import Loader from 'src/components/common/Loader';
import Text from 'src/components/common/Text';
import SubjectsList, { SubjectsListProps } from 'src/components/subject/SubjectsList';
import SubjectForm from 'src/components/subject/SubjectForm';
import FilterBar from 'src/components/common/FilterBar';

const SubjectsListOrNotFound: React.FC<SubjectsListProps> = (props) => {
  if (!props.subjects.length) {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: 200 }}>
        <Text uppercase color="textLight">Aucun sujet n'a été publié pour le moment.</Text>
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

const SubjectsListPage: React.FC<RouteComponentProps> = ({ history }) => {
  const user = useCurrentUser();
  const information = useInformation();

  const [sort, setSort] = useState(SortType.DATE_ASC);
  const [search, setSearch] = useState('');

  const [displaySubjectForm, setDisplaySubjectForm] = useState(false);
  const [showSubjectForm, hideSubjectForm] = [true, false].map(v => () => setDisplaySubjectForm(v));

  const [{ data: subjects, loading }] = useSubjects(information.id, sort, search);

  return (
    <>

      <FilterBar
        disabled={false}
        searchable={false}
        onSearch={setSearch}
        onSort={setSort}
        after={user && <Button onClick={showSubjectForm}>Nouveau sujet</Button>}
      />

      { displaySubjectForm && (
        <SubjectForm
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

export default SubjectsListPage;
