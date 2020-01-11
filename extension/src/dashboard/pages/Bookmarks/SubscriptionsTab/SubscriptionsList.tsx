import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Loader from 'src/dashboard/components/Loader';

import Authenticated from 'src/dashboard/components/Authenticated';
import ReactionWithInformation from 'src/dashboard/components/ReactionWithInformation';
import PaginatedList from 'src/dashboard/components/PaginatedList';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseSubscription } from 'src/types/Subscription';

const useStyles = makeStyles((theme: Theme) => ({
  reactionContainer: {
    margin: theme.spacing(1, 0),
  },
}));

const SubscriptionsList: React.FC = () => {
  const classes = useStyles({});
  const [
    { loading, data: subscriptions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/subscription/me', parseSubscription);

  return (
    <Authenticated>

      <PaginatedList
        onSearch={setSearch}
        page={page}
        pageSize={10}
        totalPages={totalPages}
        onPageChange={setPage}
      >

        { loading
          ? <Loader />
          : subscriptions.map(s => (
            <div key={s.id} className={classes.reactionContainer}>
              <ReactionWithInformation
                reaction={s.reaction}
                informationLink={`/favoris/souscriptions/${s.reaction.information.id}`} />
            </div>
          ))
        }

      </PaginatedList>

    </Authenticated>
  );
};

export default SubscriptionsList;
