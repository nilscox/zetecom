import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';

import ReactionsListForInformation from 'src/dashboard/components/ReactionsListForInformation';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseReaction } from 'src/types/Reaction';

const BookmarksListForInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const axiosResponse = useAxiosPaginated(`/api/bookmark/me?informationId=${id}`, parseReaction);

  return <ReactionsListForInformation axiosResponse={axiosResponse} reactions={axiosResponse[0].data} />;
};

const BookmarksList: React.FC = () => {
  const axiosResponse = useAxiosPaginated('/api/bookmark/me', parseReaction);

  return (
    <ReactionsListWithInformation
      axiosResponse={axiosResponse}
      reactions={axiosResponse[0].data}
      getInformationLink={(information) => `/favoris/${information.id}`}
    />
  );
};

const BookmarksTab: React.FC = () => (
  <Switch>
    <Route path="/favoris/:id" component={BookmarksListForInformation} />
    <Route exact path="/favoris" component={BookmarksList} />
  </Switch>
);

export default BookmarksTab;
