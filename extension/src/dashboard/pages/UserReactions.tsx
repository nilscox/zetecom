import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import Authenticated from 'src/dashboard/components/Authenticated';
import ReactionsListForInformation from 'src/dashboard/components/ReactionsListForInformation';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useQueryString from 'src/hooks/use-query-string';
import { parseReaction } from 'src/types/Reaction';

type UserReactionsListForInformationProps = {
  informationId: string;
};

const UserReactionsListForInformation: React.FC<UserReactionsListForInformationProps> = ({ informationId }) => {
  const axiosResponse = useAxiosPaginated(`/api/reaction/me?informationId=${informationId}`, parseReaction);

  return <ReactionsListForInformation axiosResponse={axiosResponse} reactions={axiosResponse[0].data} />;
};

const UserReactionsList: React.FC = () => {
  const axiosResponse = useAxiosPaginated('/api/reaction/me', parseReaction);

  return (
    <ReactionsListWithInformation
      axiosResponse={axiosResponse}
      reactions={axiosResponse[0].data}
      getInformationLink={(information) => `/reactions?informationId=${information.id}`}
    />
  );
};

const UserReactions: React.FC<RouteComponentProps> = ({ location }) => {
  const { informationId } = useQueryString(location.search);

  return (
    <Authenticated>

      <Typography variant="h4">Mes réactions</Typography>

      { informationId
        ? <UserReactionsListForInformation informationId={informationId as string} />
        : <UserReactionsList />
      }

    </Authenticated>
  );
};

export default UserReactions;
