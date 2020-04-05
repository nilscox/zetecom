import React from 'react';

import CenteredContent from './CenteredContent';
import Loader from './Loader';

type AsyncContentProps = {
  loading: boolean;
  content: () => React.ReactNode;
};

const AsyncContent: React.FC<AsyncContentProps> = ({ loading, content }) => {
  if (loading)
    return <CenteredContent><Loader /></CenteredContent>;

  return <>{ content() }</>;
};

export default AsyncContent;
