import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';

import { Reaction, parseReaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import useAxios from 'src/hooks/use-axios';
import useUpdateEffect from 'src/hooks/use-update-effect';
import Flex from 'src/components/common/Flex';
import ReactionsList from 'src/components/reaction/ReactionsList';
import { Paginated, paginatedResults } from 'src/utils/parse-paginated';

import Pagination from '../../components/Pagination';
import SortMenu from '../../components/SortMenu';
import SearchField from 'src/dashboard/components/SearchField';
import Loader from 'src/dashboard/components/Loader';

const useReactions = (informationId: number, search: string, sort: SortType, page: number) => {
  const [result, refetch] = useAxios<Paginated<Reaction>>(
    `/api/information/${informationId}/reactions`,
    paginatedResults(parseReaction),
  );

  useUpdateEffect(() => {
    const opts: any = { params: {} };

    if (search)
      opts.params.search = search;

    if (sort)
      opts.params.sort = sort;

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [search, sort, page]);

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

const ReactionsTab: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType | undefined>();
  const [page, setPage] = useState(1);
  const { loading, data } = useReactions(Number(match.params.id), search, sort, page);
  const classes = useStyles({});

  return (
    <>
      <Flex className={classes.container}>
        <Flex flexDirection="row" flex={1}>
          <SearchField onSearch={setSearch} />
          <SortMenu sort={sort || SortType.DATE_DESC} onSortChange={setSort} />
        </Flex>
        <Pagination page={page} total={data ? data.total : undefined} pageSize={10} onPageChange={setPage} />
      </Flex>
      { loading
        ? <Loader />
        : <ReactionsList reactions={data.items} onEdited={() => {}} />
      }
    </>
  );
};

export default ReactionsTab;
