import React from 'react';

import Fallback from './Fallback';
import Loader from './Loader';

type AsyncContentProps = {
  loading: boolean;
  render: () => React.ReactNode;
};

const AsyncContent: React.FC<AsyncContentProps> = ({ loading, render }) => (
  <Fallback when={loading} fallback={<Loader />} render={render} />
);

export default AsyncContent;
