import React, { useState, useRef } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';

import { Reaction, parseReaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import useAxios from 'src/hooks/use-axios';
import useUpdateEffect from 'src/hooks/use-update-effect';
import Flex from 'src/components/common/Flex';
import ReactionsList from 'src/components/reaction/ReactionsList';
import { Paginated, paginatedResults } from 'src/utils/parse-paginated';
import SearchField from 'src/dashboard/components/SearchField';
import Loader from 'src/dashboard/components/Loader';
import ReactionCreationForm from 'src/components/reaction/ReactionForm';

import Pagination from '../../../components/Pagination';
import SortMenu from '../../../components/SortMenu';
import AddButton from '../../../components/AddButton';
import Collapse from '@material-ui/core/Collapse';
import { useCurrentUser } from 'src/hooks/use-user';
import useEditableDataset from 'src/hooks/use-editable-dataset';

const useReactions = (informationId: number, search: string, sort: SortType | undefined, page: number) => {
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

const useStyles = makeStyles((theme: Theme) => {
  return ({
    container: {
      flexDirection: 'row',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    reactionForm: {
      margin: theme.spacing(2, 0, 3),
    },
  });
});

const ReactionsTab: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const user = useCurrentUser();

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType | undefined>();
  const [page, setPage] = useState(1);
  const { loading, data } = useReactions(Number(match.params.id), search, sort, page);

  const [showReactionForm, setShowReactionForm] = useState(false);
  const [reactions, { prepend, replace }] = useEditableDataset(data && data.items);
  const containerRef = useRef<HTMLDivElement>();

  const classes = useStyles({});

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
      <AddButton show={user && !showReactionForm} onClick={handleShowReactionForm} />
      <Flex className={classes.container}>
        <Flex flexDirection="row" flex={1}>
          <SearchField onSearch={setSearch} />
          <SortMenu sort={sort || SortType.DATE_DESC} onSortChange={setSort} />
        </Flex>
        <Pagination page={page} total={data ? data.total : undefined} pageSize={10} onPageChange={setPage} />
      </Flex>
      <Collapse in={showReactionForm}>
        <ReactionCreationForm
          className={classes.reactionForm}
          onCreated={handleonReactionCreated}
          closeForm={() => setShowReactionForm(false)}
        />
      </Collapse>
      { loading
        ? <Loader />
        : <ReactionsList reactions={reactions} onEdited={replace} />
      }
    </div>
  );
};

export default ReactionsTab;
