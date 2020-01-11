import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseReaction, Reaction } from 'src/types/Reaction';

const UserReactionsListWithInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const axiosResponse = useAxiosPaginated<Reaction>(`/api/reaction/me?informationId=${id}`, parseReaction);

  return <ReactionsListWithInformation axiosResponse={axiosResponse} reactions={axiosResponse[0].data} />;
};

export default UserReactionsListWithInformation;
