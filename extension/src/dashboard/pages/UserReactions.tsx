import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import Authenticated from 'src/dashboard/components/Authenticated';
import ReactionsListForInformation from 'src/dashboard/components/ReactionsListForInformation';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseReaction } from 'src/types/Reaction';

const UserReactionsListForInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const axiosResponse = useAxiosPaginated(`/api/reaction/me?informationId=${id}`, parseReaction);

  return <ReactionsListForInformation axiosResponse={axiosResponse} reactions={axiosResponse[0].data} />;
};

const UserReactionsList: React.FC = () => {
  const axiosResponse = useAxiosPaginated('/api/reaction/me', parseReaction);

  return (
    <ReactionsListWithInformation
      axiosResponse={axiosResponse}
      reactions={axiosResponse[0].data}
      getInformationLink={(information) => `/reactions/${information.id}`}
    />
  );
};

const UserReactions: React.FC = () => (
  <Authenticated>

    <Typography variant="h4">Mes réactions</Typography>

    <Switch>
      <Route path="/reactions/:id" component={UserReactionsListForInformation} />
      <Route path="/reactions" component={UserReactionsList} />
    </Switch>

  </Authenticated>
);

export default UserReactions;
