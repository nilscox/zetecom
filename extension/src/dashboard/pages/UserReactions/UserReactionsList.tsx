import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Loader from 'src/dashboard/components/Loader';
import { parseReaction } from 'src/types/Reaction';

import PaginatedList from '../../components/PaginatedList';
import ReactionWithInform from '../../components/ReactionWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';

const useStyles = makeStyles((theme: Theme) => ({
  reactionContainer: {
    margin: theme.spacing(1, 0),
  },
}));

const UserReactionsList: React.FC = () => {
  const classes = useStyles({});
  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/reaction/me', parseReaction);

  return (
    <PaginatedList
      onSearch={setSearch}
      page={page}
      pageSize={10}
      totalPages={totalPages}
      onPageChange={setPage}
    >

      { loading
        ? <Loader />
        : reactions.map(r => (
          <div key={r.id} className={classes.reactionContainer}>
            <ReactionWithInform
              reaction={r}
              informationLink={`/reactions/${r.information.id}`}
            />
          </div>
        ))
      }

    </PaginatedList>
  );
};

export default UserReactionsList;
