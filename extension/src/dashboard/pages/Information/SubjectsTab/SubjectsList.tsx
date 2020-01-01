import React, { useState, useRef } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Loader from 'src/dashboard/components/Loader';
import AddButton from 'src/dashboard/components/AddButton';

import { Subject, parseSubject } from 'src/types/Subject';
import SubjectForm from 'src/components/subject/SubjectForm';

import SubjectsListItem from './SubjectsListItem';
import { useCurrentUser } from 'src/hooks/use-user';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles, Theme } from '@material-ui/core';
import PaginatedList from 'src/dashboard/components/PaginatedList';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';

const useStyles = makeStyles((theme: Theme) => ({
  subjectForm: {
    margin: theme.spacing(2, 0, 3),
  },
}));

const SubjectsList: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const informationId = Number(match.params.id);
  const user = useCurrentUser();

  const [
    { loading, data: subjects, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated(`/api/information/${match.params.id}/subjects`, parseSubject);

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

      <PaginatedList
        onSearch={setSearch}
        page={page}
        pageSize={10}
        totalPages={totalPages}
        onPageChange={setPage}
      >

        <Collapse in={showSubjectForm}>
          <SubjectForm
            onCreated={(subject) => history.push(`/information/${informationId}/thematiques/${subject.id}`)}
            onClose={() => setShowSubjectForm(false)}
            className={classes.subjectForm}
          />
        </Collapse>

        { loading
          ? <Loader />
          : subjects.map(renderSubject)
        }

      </PaginatedList>

    </div>
  );
};

export default SubjectsList;
