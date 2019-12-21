import React, { useState, useRef } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';

import SearchField from 'src/dashboard/components/SearchField';
import Pagination from 'src/dashboard/components/Pagination';
import Loader from 'src/dashboard/components/Loader';
import Flex from 'src/components/common/Flex';

import useUpdateEffect from 'src/hooks/use-update-effect';
import useAxios from 'src/hooks/use-axios';
import { Paginated, usePaginatedResults } from 'src/utils/parse-paginated';
import { Subject, parseSubject } from 'src/types/Subject';
import SubjectForm from 'src/components/subject/SubjectForm';

import AddButton from '../../../components/AddButton';
import SubjectsListItem from './SubjectsListItem';
import { useCurrentUser } from 'src/hooks/use-user';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles, Theme } from '@material-ui/core';

const useSubjects = (informationId: number, search: string, page: number) => {
  const [result, refetch] = useAxios<Paginated<Subject>>(
    `/api/information/${informationId}/subjects`,
    usePaginatedResults(parseSubject),
  );

  useUpdateEffect(() => {
    const opts: AxiosRequestConfig = { params: {} };

    if (search)
      opts.params.search = search;

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [page, search]);

  return result;
};

const useStyles = makeStyles((theme: Theme) => ({
  subjectForm: {
    margin: theme.spacing(2, 0, 3),
  },
}));

const SubjectsList: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const informationId = Number(match.params.id);
  const user = useCurrentUser();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { loading, data } = useSubjects(informationId, search, page);

  const [expanded, setExpanded] = useState<number | false>(false);

  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>();

  const classes = useStyles({});

  const handleChange = (subjectId: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? subjectId : false);
  };

  const handleShowSubjectForm = () => {
    if (containerRef.current)
      containerRef.current.scrollIntoView();

    setShowSubjectForm(true);
  };

  const renderSubject = (subject: Subject) => (
    <SubjectsListItem
      key={subject.id}
      subject={subject}
      expanded={expanded === subject.id}
      link={`/information/${informationId}/thematiques/${subject.id}`}
      onChange={handleChange(subject.id)}
    />
  );

  return (
    <div ref={containerRef}>
      <AddButton show={user && !showSubjectForm} onClick={handleShowSubjectForm} />
      <Flex flexDirection="row">
        <SearchField onSearch={setSearch} />
        <Pagination page={page} pageSize={10} total={data ? data.total : undefined} onPageChange={setPage} />
      </Flex>
      <Collapse in={showSubjectForm}>
        <SubjectForm
          onCreated={(subject) => history.push(`/information/${informationId}/thematiques/${subject.id}`)}
          onClose={() => setShowSubjectForm(false)}
          className={classes.subjectForm}
        />
      </Collapse>
      { loading
        ? <Loader />
        : data.items.map(renderSubject)
      }
    </div>
  );
};

export default SubjectsList;
