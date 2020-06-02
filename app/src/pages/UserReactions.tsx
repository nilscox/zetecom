import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Authenticated from 'src/components/Authenticated';
import useQueryString from 'src/hooks/use-query-string';

import { Typography } from '@material-ui/core';

const UserReactions: React.FC<RouteComponentProps> = ({ location }) => {
  const { informationId } = useQueryString(location.search);

  return (
    <Authenticated>

      <Typography variant="h4">Mes réactions</Typography>

    </Authenticated>
  );
};

export default UserReactions;
