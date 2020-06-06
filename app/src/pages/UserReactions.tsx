import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Authenticated from 'src/components/Authenticated';
import useQueryString from 'src/hooks/use-query-string';

import useAxiosPaginated from '../hooks/use-axios-paginated';
import { parseReaction } from '../types/Reaction';

const UserReactions: React.FC<RouteComponentProps> = ({ location }) => {
  const { informationId } = useQueryString(location.search);
  const [{ data: comments }] = useAxiosPaginated('/api/reaction/me', parseReaction);

  return (
    <Authenticated>

    </Authenticated>
  );
};

export default UserReactions;
