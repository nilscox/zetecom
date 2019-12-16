import React, { useState, useRef } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Loader from 'src/dashboard/components/Loader';
import Flex from 'src/components/common/Flex';
import SearchField from 'src/dashboard/components/SearchField';
import SortMenu from 'src/dashboard/components/SortMenu';
import Pagination from 'src/dashboard/components/Pagination';
import ReactionsList from 'src/components/reaction/ReactionsList';

import useAxios from 'src/hooks/use-axios';
import useUpdateEffect from 'src/hooks/use-update-effect';
import { paginatedResults, Paginated } from 'src/utils/parse-paginated';
import { parseSubject, Subject as SubjectType } from 'src/types/Subject';
import { parseReaction, Reaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';

import SubjectComponent from './SubjectComponent';
import AddButton from 'src/dashboard/components/AddButton';
import Collapse from '@material-ui/core/Collapse';
import ReactionCreationForm from 'src/components/reaction/ReactionForm';
import useEditableDataset from 'src/hooks/use-editable-dataset';

const useSubject = (subjectId: number) => {
  return useAxios<SubjectType>(
    `/api/subject/${subjectId}`,
    parseSubject,
  );
};

const useSubjectReactions = (subjectId: number, search: string, sort: SortType | undefined, page: number) => {
  const [result, refetch] = useAxios<Paginated<Reaction>>(
    `/api/subject/${subjectId}/reactions`,
    paginatedResults(parseReaction),
  );

  useUpdateEffect(() => {
    const opts: any = { params: {} };

    if (sort)
      opts.params.sort = sort;

    if (search)
      opts.params.search = search;

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [page, search, sort]);

  return result;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  reactionForm: {
    margin: theme.spacing(2, 0, 3),
  },
}));

const Subject: React.FC<RouteComponentProps<{ subjectId: string }>> = ({ match }) => {
  const subjectId = Number(match.params.subjectId);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType | undefined>(undefined);
  const [page, setPage] = useState(1);
  const classes = useStyles({});

  const [{ data: subject, loading }] = useSubject(subjectId);
  const { data, loading: loadingReaction } = useSubjectReactions(subjectId, search, sort, page);

  const [showReactionForm, setShowReactionForm] = useState(false);
  const [reactions, { prepend, replace }] = useEditableDataset(data && data.items);
  const containerRef = useRef<HTMLDivElement>();

  const handleShowReactionForm = () => {
    if (containerRef.current)
      containerRef.current.scrollIntoView();

    setShowReactionForm(true);
  };

  const handleonReactionCreated = (reaction: Reaction) => {
    prepend(reaction);
    setShowReactionForm(false);
  };

  return (
    <div ref={containerRef}>
      <AddButton show={!showReactionForm} onClick={handleShowReactionForm} />
      <Flex flexDirection="row" className={classes.container}>
        <Flex flexDirection="row" flex={1}>
          <SearchField onSearch={setSearch} />
          <SortMenu sort={sort || SortType.DATE_DESC} onSortChange={setSort} />
        </Flex>
        <Pagination page={page} total={data ? data.total : undefined} pageSize={10} onPageChange={setPage} />
      </Flex>
      { loading || !subject || loadingReaction || !reactions
        ? <Loader />
        : (
          <>
            <SubjectComponent subject={subject} />
            <Collapse in={showReactionForm}>
              <ReactionCreationForm
                className={classes.reactionForm}
                subject={subject}
                onCreated={handleonReactionCreated}
                closeForm={() => setShowReactionForm(false)}
              />
            </Collapse>
            <ReactionsList reactions={reactions} onEdited={replace} />
          </>
        )
      }
    </div>
  );
};
export default Subject;
