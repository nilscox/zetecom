import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Authenticated from 'src/components/Authenticated';
import useQueryString from 'src/hooks/use-query-string';

const UserReactions: React.FC<RouteComponentProps> = ({ location }) => {
  const { informationId } = useQueryString(location.search);

  return (
    <Authenticated>

    </Authenticated>
  );
};

export default UserReactions;
