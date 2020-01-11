import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BookmarksList from './BookmarsList';
import BookmarksListWithInformation from './BookmarksListWithInformation';

const BookmarksTab: React.FC = () => (
  <Switch>
    <Route path="/favoris/:id" component={BookmarksListWithInformation} />
    <Route exact path="/favoris" component={BookmarksList} />
  </Switch>
);

export default BookmarksTab;
