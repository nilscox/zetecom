import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseReaction } from 'src/types/Reaction';

const UserReactionsListWithInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated(`/api/reaction/me?informationId=${id}`, parseReaction);

  return (
    <>
      { reactions && (
        <ReactionsListWithInformation
          reactions={reactions}
          loading={loading}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          setSearch={setSearch}
        />
      ) }
    </>
  );
};

export default UserReactionsListWithInformation;
