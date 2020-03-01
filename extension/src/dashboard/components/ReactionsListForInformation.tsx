import React from 'react';

import Flex from 'src/components/common/Flex';
import RouterLink from 'src/components/common/Link';
import ReactionContainer from 'src/components/reaction/ReactionContainer';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { Reaction } from 'src/types/Reaction';

import Loader from './Loader';
import PaginatedList from './PaginatedList';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing(1, 0),
  },
  image: {
    width: 240,
    height: 160,
    objectFit: 'cover',
  },
  informationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}));

type ReactionsListForInformationProps = {
  axiosResponse: ReturnType<typeof useAxiosPaginated>;
  reactions: Reaction[];
};

const ReactionsListForInformation: React.FC<ReactionsListForInformationProps> = ({ axiosResponse, reactions }) => {
  const classes = useStyles({});
  const [
    { loading, totalPages },
    { setSearch },,
    { page, setPage },
  ] = axiosResponse;
  const information = reactions && reactions[0].information;

  if (reactions && reactions.length === 0)
    return null;

  return (
    <>
      { !reactions
        ? <Loader />
        : (
          <>
            <RouterLink to={`/information/${information.id}`}>
              <Flex flexDirection="row" my={12}>

                <img src={information.imageUrl || ''} className={classes.image} />

                <Flex flexDirection="column" p={12} >
                  <div className={classes.informationTitle}>
                    { information.title }
                  </div>
                </Flex>

              </Flex>
            </RouterLink>

            <PaginatedList
              onSearch={setSearch}
              page={page}
              pageSize={10}
              totalPages={totalPages}
              onPageChange={setPage}
            >

              { loading
                ? <Loader />
                : reactions && reactions.map(reaction => (
                  <div key={reaction.id} className={classes.container}>
                    <ReactionContainer reaction={reaction} />
                  </div>
                ))
              }

            </PaginatedList>
          </>
        )
      }
    </>
  );
};

export default ReactionsListForInformation;
