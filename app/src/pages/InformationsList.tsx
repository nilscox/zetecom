import React from 'react';

import FiltersBar from 'src/components/FiltersBar';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseInformation } from 'src/types/Information';

import InformationOverview from '../components/InformationOverview';
import RouterLink from '../components/Link';
import Padding from '../components/Padding';

const InformationList: React.FC = () => {
  const [
    { loading, data: informations, total },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/information', parseInformation);

  return (
    <>

      <FiltersBar
        onSearch={setSearch}
        page={page}
        pageSize={10}
        total={total}
        onPageChange={setPage}
      />

      { !loading && informations.map((information, n) => (
        <Padding top key={information.id}>
          <RouterLink to={`/information/${information.id}`}>
            <InformationOverview information={information} />
          </RouterLink>
        </Padding>
      )) }

    </>
  );
};

export default InformationList;
