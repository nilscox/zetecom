import React, { useEffect, useState } from 'react';

import Loader from 'src/components/layout/Loader/Loader';

import Fallback from '../Fallback/Fallback';

type AsyncContentProps = {
  loaderDelay?: number;
  loading: boolean;
  render: () => React.ReactNode;
};

const AsyncContent: React.FC<AsyncContentProps> = ({ loaderDelay = 400, loading, render }) => {
  const [renderLoader, setRenderLoader] = useState(false);

  useEffect(() => {
    if (loading) {
      setRenderLoader(false);

      const timeout = setTimeout(() => {
        setRenderLoader(true);
      }, loaderDelay);

      return () => clearTimeout(timeout);
    }
  }, [loading, loaderDelay]);

  return <Fallback when={loading} fallback={loading && !renderLoader ? <></> : <Loader />} render={render} />;
};

export default AsyncContent;
