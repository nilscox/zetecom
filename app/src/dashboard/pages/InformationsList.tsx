import React from 'react';

import dayjs from 'dayjs';

import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import RouterLink from 'src/components/common/Link';
import PaginatedList from 'src/components/common/PaginatedList';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { Information, parseInformation } from 'src/types/Information';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  image: {
    width: 240,
    height: 160,
    objectFit: 'cover',
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
    { loading, data: informations, total },
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
          <Box my={6} className={classes.publicationDate}>{ dayjs().format('[Publiée le] DD.MM.YYYY') }</Box>
          <div>{ information.reactionsCount } réaction{ information.reactionsCount !== 1 && 's' }</div>
        </Flex>

      </Flex>
    </RouterLink>
  );

  return (
    <PaginatedList
      onSearch={setSearch}
      page={page}
      pageSize={10}
      total={total}
      onPageChange={setPage}
    >

      { !loading && informations.map(renderInformation) }

    </PaginatedList>
  );
};

export default InformationList;
