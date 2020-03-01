import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import ReactionsListForInformation from 'src/dashboard/components/ReactionsListForInformation';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useQueryString from 'src/hooks/use-query-string';
import { parseReaction } from 'src/types/Reaction';

type BookmarksListForInformationProps = {
  informationId: string;
};

const BookmarksListForInformation: React.FC<BookmarksListForInformationProps> = ({ informationId }) => {
  const axiosResponse = useAxiosPaginated(`/api/bookmark/me?informationId=${informationId}`, parseReaction);

  return <ReactionsListForInformation axiosResponse={axiosResponse} reactions={axiosResponse[0].data} />;
};

const BookmarksList: React.FC = () => {
  const axiosResponse = useAxiosPaginated('/api/bookmark/me', parseReaction);

  return (
    <ReactionsListWithInformation
      axiosResponse={axiosResponse}
      reactions={axiosResponse[0].data}
      getInformationLink={(information) => `/favoris?informationId=${information.id}`}
    />
  );
};

const BookmarksTab: React.FC<RouteComponentProps> = ({ location }) => {
  const { informationId } = useQueryString(location.search);

  if (informationId)
    return <BookmarksListForInformation informationId={informationId as string} />;

  return <BookmarksList />;
};

export default BookmarksTab;
