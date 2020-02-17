import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { parseInformation, Information } from 'src/types/Information';
import RouterLink from 'src/components/common/Link';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';

import PaginatedList from '../components/PaginatedList';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';

const useStyles = makeStyles({
  image: {
    width: 240,
    height: 160,
  },
  informationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  publicationDate: {
    color: '#666',
  },
});

const InformationList: React.FC = () => {
  const [
    { loading, data: informations, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/information', parseInformation);

  const classes = useStyles({});

  const renderInformation = (information: Information) => (
    <RouterLink key={information.id} to={`/information/${information.id}`}>
      <Flex flexDirection="row" my={12}>

        <img src={information.imageUrl || ''} className={classes.image} />

        <Flex flexDirection="column" p={12} >
          <div className={classes.informationTitle}>
            { information.title }
          </div>
          <Box my={6} className={classes.publicationDate}>{ moment().format('[Publiée le] DD.MM.YYYY') }</Box>
          <div>{ information.reactionsCount } réactions</div>
        </Flex>

      </Flex>
    </RouterLink>
  );

  return (
    <PaginatedList
      onSearch={setSearch}
      page={page}
      pageSize={10}
      totalPages={totalPages}
      onPageChange={setPage}
    >

      { !loading && informations.map(renderInformation) }

    </PaginatedList>
  );
};

export default InformationList;
