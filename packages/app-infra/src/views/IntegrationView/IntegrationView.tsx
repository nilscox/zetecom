import React, { useEffect } from 'react';

import { loadIntegration, selectCommentsAreaByIdentifier } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from '~/hooks/useAppSelector';

import { Integration } from './Integration';

import 'iframe-resizer/js/iframeResizer.contentWindow';

const useQueryParams = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  return queryParams;
};

const useIntegrationParams = () => {
  const { identifier } = useParams<{ identifier?: string }>();
  const pageUrl = useQueryParams().get('pageUrl');

  if (!identifier) {
    throw new Error('the "identifier" path parameter is missing');
  }

  if (!pageUrl) {
    throw new Error('the "pageUrl" query parameter is missing');
  }

  return { identifier, pageUrl };
};

export const IntegrationView: React.FC = () => {
  const { identifier, pageUrl } = useIntegrationParams();

  const dispatch = useDispatch();

  const commentsArea = useAppSelector(selectCommentsAreaByIdentifier, identifier);

  useEffect(() => {
    dispatch(loadIntegration(identifier));
  }, [identifier]);

  return <Integration commentsAreaId={commentsArea?.id} identifier={identifier} pageUrl={pageUrl} />;
};
