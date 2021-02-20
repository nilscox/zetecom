import React, { useState } from 'react';

import useTimeout from 'src/hooks/useTimeout';

import Fallback from '../Fallback/Fallback';

type AsyncContentProps = {
  loaderDelay?: number;
  loading: boolean;
  render: () => React.ReactNode;
};

const AsyncContent: React.FC<AsyncContentProps> = ({ loaderDelay = 300, loading, render }) => {
  const [renderLoading, setRenderLoading] = useState(false);

  useTimeout(() => setRenderLoading(true), loaderDelay);

  if (loading && !renderLoading) {
    return null;
  }

  return <Fallback when={loading} render={render} />;
};

export default AsyncContent;
