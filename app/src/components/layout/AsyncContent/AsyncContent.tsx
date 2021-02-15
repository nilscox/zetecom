import React from 'react';

import { useDebounce } from 'use-debounce';

import Fallback from '../Fallback/Fallback';

type AsyncContentProps = {
  loaderDelay?: number;
  loading: boolean;
  render: () => React.ReactNode;
};

const AsyncContent: React.FC<AsyncContentProps> = ({ loaderDelay = 300, loading, render }) => {
  const [renderLoading] = useDebounce(loading, loaderDelay);

  if (loading && !renderLoading) {
    return null;
  }

  return <Fallback when={loading} render={render} />;
};

export default AsyncContent;
