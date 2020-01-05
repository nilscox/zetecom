import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import PaginatedList from './PaginatedList';
import Loader from './Loader';
import ReactionContainer from 'src/components/reaction/ReactionContainer';
import RouterLink from 'src/components/common/Link';
import Flex from 'src/components/common/Flex';

import { Reaction } from 'src/types/Reaction';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing(1, 0),
  },
  image: {
    width: 240,
    height: 160,
  },
  informationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}));

type ReactionsByInformationListProps = {
  reactions: Reaction[];
  page: number;
  totalPages: number;
  loading: boolean;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
};

const ReactionsByInformationList: React.FC<ReactionsByInformationListProps> = ({
  reactions,
  page, setPage,
  setSearch,
  totalPages,
  loading,
}) => {
  const classes = useStyles({});

  if (reactions.length <= 0)
    return null;

  return (
    <>
      <RouterLink to={`/information/${reactions[0].information.id}`}>
        <Flex flexDirection="row" my={12}>

          <img src={reactions[0].information.image || ''} className={classes.image} />

          <Flex flexDirection="column" p={12} >
            <div className={classes.informationTitle}>
              { reactions[0].information.title }
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
          : reactions.map(r => (
            <div key={r.id} className={classes.container}>
              <ReactionContainer reaction={r} onEdited={() => {}} />
            </div>
          ))
        }

      </PaginatedList>
    </>
  );
};

export default ReactionsByInformationList;
