import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Loader from './loader.svg';

import { color } from '~/theme';

import { Fallback } from '../Fallback/Fallback';

type AsyncProps = {
  loading: boolean;
  render: () => React.ReactNode;
};

export const Async: React.FC<AsyncProps> = ({ loading, render }) => {
  const [renderLoader, setRenderLoader] = useState(false);

  useEffect(() => {
    setRenderLoader(false);

    if (loading) {
      const timeout = setTimeout(() => {
        setRenderLoader(true);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (loading) {
    return (
      <Fallback role="status" aria-busy="true" data-testid="loader">
        {renderLoader && <StyledLoader />}
      </Fallback>
    );
  }

  return <>{render()}</>;
};

const StyledLoader = styled(Loader)`
  color: ${color('primary')};
`;
