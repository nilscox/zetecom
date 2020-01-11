import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Loader from 'src/dashboard/components/Loader';
import { parseReaction } from 'src/types/Reaction';

import PaginatedList from '../../../components/PaginatedList';
import ReactionWithInformation from 'src/dashboard/components/ReactionWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';

const useStyles = makeStyles((theme: Theme) => ({
  reactionContainer: {
    margin: theme.spacing(1, 0),
  },
}));

const BookmarksList: React.FC = () => {
  const classes = useStyles({});
  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/bookmark/me', parseReaction);

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
            <ReactionWithInformation reaction={r} informationLink={`/favoris/${r.information.id}`} />
          </div>
        ))
      }

    </PaginatedList>
  );
};

export default BookmarksList;
