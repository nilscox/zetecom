import React from 'react';

import RouterLink from 'src/components/common/Link';
import Loader from 'src/components/common/Loader';
import PaginatedList from 'src/components/common/PaginatedList';
import Text from 'src/components/common/Text';
import ReactionContainer from 'src/components/reaction/ReactionContainer';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { Information } from 'src/types/Information';
import { Reaction } from 'src/types/Reaction';

import { makeStyles, Theme } from '@material-ui/core/styles';

type ReactionWithInformationProps = {
  reaction: Reaction;
  informationLink: string;
};

const useStylesReaction = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
  },
  informationContainer: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  informationImage: {
    width: 120,
    height: 80,
    marginRight: theme.spacing(1),
    objectFit: 'cover',
  },
  reactionContainer: {
    flex: 3,
  },
}));

const ReactionWithInformation: React.FC<ReactionWithInformationProps> = ({ reaction, informationLink }) => {
  const classes = useStylesReaction({});

  return (
    <div className={classes.container}>

      <RouterLink to={informationLink} className={classes.informationContainer}>
        <Text bold size={20}>
          { reaction.information.title }
        </Text>
        <img src={reaction.information.imageUrl || ''} className={classes.informationImage} />
      </RouterLink>

      <div className={classes.reactionContainer}>
        <ReactionContainer reaction={reaction} />
      </div>

    </div>
  );
};

const useStylesList = makeStyles((theme: Theme) => ({
  reactionContainer: {
    margin: theme.spacing(1, 0),
  },
}));

type ReactionsListWithInformationProps = {
  axiosResponse: ReturnType<typeof useAxiosPaginated>;
  reactions: Reaction[];
  getInformationLink: (information: Information) => string;
};

const ReactionsListWithInformation: React.FC<ReactionsListWithInformationProps> = ({
  axiosResponse,
  reactions,
  getInformationLink,
}) => {
  const classes = useStylesList({});
  const [
    { loading, total },
    { setSearch },,
    { page, setPage },
  ] = axiosResponse;

  return (
    <PaginatedList
      onSearch={setSearch}
      page={page}
      pageSize={10}
      total={total}
      onPageChange={setPage}
    >

      { loading
        ? <Loader />
        : reactions.map(r => (
          <div key={r.id} className={classes.reactionContainer}>
            <ReactionWithInformation
              reaction={r}
              informationLink={getInformationLink(r.information)}
            />
          </div>
        ))
      }

    </PaginatedList>
  );

};

export default ReactionsListWithInformation;
