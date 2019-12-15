import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { SubjectBody, SubjectHeader } from './SubjectComponent';
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

type SubjectComponentProps = {
  subject: SubjectType;
}

const useSubjectStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const SubjectComponent: React.FC<SubjectComponentProps> = ({ subject }) => {
  const classes = useSubjectStyles({});

  return (
    <Paper className={classes.container}>
      <SubjectHeader subject={subject} />
      <Divider className={classes.divider} />
      <SubjectBody subject={subject} />
    </Paper>
  );
};

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

const useStyles = makeStyles(theme => ({
  container: {
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}));

const Subject: React.FC<RouteComponentProps<{ subjectId: string }>> = ({ match }) => {
  const subjectId = Number(match.params.subjectId);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType | undefined>(undefined);
  const [page, setPage] = useState(1);
  const classes = useStyles({});

  const [{ data: subject, loading }] = useSubject(subjectId);
  const { data: reactions, loading: loadingReaction } = useSubjectReactions(subjectId, search, sort, page);

  return (
    <>
      <Flex flexDirection="row" className={classes.container}>
        <Flex flexDirection="row" flex={1}>
          <SearchField onSearch={setSearch} />
          <SortMenu sort={sort || SortType.DATE_DESC} onSortChange={setSort} />
        </Flex>
        <Pagination page={page} total={reactions ? reactions.total : undefined} pageSize={10} onPageChange={setPage} />
      </Flex>

      { loading || loadingReaction || !subject || !reactions
        ? <Loader />
        : (
          <>
            <SubjectComponent subject={subject} />
            <ReactionsList reactions={reactions.items} onEdited={() => {}} />
          </>
        )
      }
    </>
  );
};
export default Subject;
