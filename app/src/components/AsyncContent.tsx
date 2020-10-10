import React, { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';

import Fallback from './Fallback';
import Loader from './Loader';

type AsyncContentProps = {
  loading: boolean;
  render: () => React.ReactNode;
};

const AsyncContent: React.FC<AsyncContentProps> = ({ loading, render }) => {
  const [loadingCopy, setLoadingCopy] = useState(undefined);
  const [loadingDebounced] = useDebounce(loadingCopy, 500);

  useEffect(() => {
    setLoadingCopy(loading);
  }, [loading]);

  if (loading && !loadingDebounced) {
    return null;
  }

  return <Fallback when={loading} fallback={<Loader />} render={render} />;
};

export default AsyncContent;
