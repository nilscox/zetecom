import React from 'react';

import Fallback from './Fallback';
import Loader from './Loader';

type AsyncContentProps = {
  loading: boolean;
  children: () => React.ReactNode;
};

const AsyncContent: React.FC<AsyncContentProps> = ({ loading, children }) => {
  // eslint-disable-next-line react/no-children-prop
  return <Fallback when={loading} fallback={<Loader />} children={children} />;
};

export default AsyncContent;
