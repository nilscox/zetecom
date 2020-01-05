import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Authenticated from 'src/dashboard/components/Authenticated';
import BookmarksList from './BookmarsList';
import BookmarksByInformationList from './BookmarksByInformationList';

const BookmarksTab: React.FC = () => (
  <Authenticated>

    <Switch>
      <Route path="/favoris/:id" component={BookmarksByInformationList} />
      <Route path="/favoris" component={BookmarksList} />
    </Switch>

  </Authenticated>
);

export default BookmarksTab;
