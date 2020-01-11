import React from 'react';

import { parseReaction } from 'src/types/Reaction';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { useParams } from 'react-router-dom';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

const BookmarksListWithInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated(`/api/bookmark/me?informationId=${id}`, parseReaction);

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

export default BookmarksListWithInformation;
