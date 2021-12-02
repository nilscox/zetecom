import React, { useEffect } from 'react';

import {
  requestCommentsArea,
  selectAuthenticatedUser,
  selectCommentsArea,
  selectCommentsAreaNotFound,
  selectCommentsAreaRequested,
  selectIsFetchingCommentsArea,
  selectIsRequestingCommentsArea,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { CommentsArea } from '~/components/domain/CommentsArea/CommentsArea';
import { Header } from '~/components/domain/Header/Header';
import { Button } from '~/components/elements/Button/Button';
import { Text } from '~/components/elements/Text/Text';
import { Async } from '~/components/layout/Async/Async';
import { Box } from '~/components/layout/Box/Box';
import { Fallback } from '~/components/layout/Fallback/Fallback';
import { useTrackingGateway } from '~/dependencies.provider';
import { useAppSelector } from '~/hooks/useAppSelector';

export type IntegrationProps = {
  commentsAreaId: string;
  identifier: string;
  pageUrl: string;
};

export const Integration: React.FC<IntegrationProps> = ({ commentsAreaId, identifier, pageUrl }) => {
  const commentsArea = useAppSelector(selectCommentsArea, commentsAreaId);
  const loading = useAppSelector(selectIsFetchingCommentsArea);
  const notFound = useAppSelector(selectCommentsAreaNotFound);

  const location = useLocation();
  const trackingGateway = useTrackingGateway();

  useEffect(() => {
    if (commentsArea) {
      trackingGateway.pageView();
    }
  }, [commentsArea?.id, location]);

  if (notFound) {
    return (
      <Box padding={2}>
        <CommentsAreaClosed identifier={identifier} pageUrl={pageUrl} />
      </Box>
    );
  }

  if (!commentsArea) {
    return null;
  }

  return (
    <Async
      loading={loading}
      render={() => (
        <Box padding={2}>
          <Header />
          <CommentsArea commentsAreaId={commentsArea.id} />
        </Box>
      )}
    />
  );
};

type CommentsAreaClosedProps = {
  identifier: string;
  pageUrl: string;
};

export const CommentsAreaClosed: React.FC<CommentsAreaClosedProps> = ({ identifier, pageUrl }) => {
  const dispatch = useDispatch();

  const user = useAppSelector(selectAuthenticatedUser);
  const loading = useAppSelector(selectIsRequestingCommentsArea);
  const requested = useAppSelector(selectCommentsAreaRequested);

  return (
    <>
      <Header />

      <Fallback minHeight={280}>
        <Text fontSize={4}>L'espace de commentaires Zétécom n'est pas ouvert sur cette page.</Text>

        {user && !requested && (
          <Button marginTop={4} loading={loading} onClick={() => dispatch(requestCommentsArea(identifier, pageUrl))}>
            <Text fontSize={3}>Demander l'ouverture</Text>
          </Button>
        )}

        {user && requested && (
          <Text fontWeight="body" marginTop={4}>
            La demande d'ouverture a bien été prise en compte.
          </Text>
        )}
      </Fallback>
    </>
  );
};
