import React from 'react';

import { parseReaction } from 'src/types/Reaction';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { useParams } from 'react-router-dom';
import ReactionsByInformationList from 'src/dashboard/components/ReactionsByInformationList';

const UserReactionsByInformationList: React.FC = () => {
  const { id } = useParams();

  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated(`/api/reaction/me?informationId=${id}`, parseReaction);

  return (
    <>
      { reactions
        ? (
          <ReactionsByInformationList
            reactions={reactions}
            loading={loading}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            setSearch={setSearch}
          />
        ) : null
      }
    </>
  );
};

export default UserReactionsByInformationList;
