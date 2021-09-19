import React from 'react';

import { setCommentsArea } from '@zetecom/app-core';
import { setAuthenticatedUser } from '@zetecom/app-core/modules/authentication/actions';
import { setCommentsAreaNotFound } from '@zetecom/app-core/modules/commentsArea/actions';

import { Demo } from '~/demos';
import { dougForcett, vaccinsEffetsSecondaires as commentsArea } from '~/fixtures';

import { Integration, IntegrationProps } from './Integration';

const props: IntegrationProps = {
  commentsAreaId: commentsArea.id,
  identifier: 'demo:identifier',
  pageUrl: 'pageUrl',
};

export const integration: Demo = {
  prepare: ({ store }) => {
    store.dispatch(setCommentsArea(commentsArea));
  },
  render: () => <Integration {...props} />,
};

export const integrationClosed: Demo = {
  prepare: ({ store }) => {
    store.dispatch(setAuthenticatedUser(dougForcett));
    store.dispatch(setCommentsAreaNotFound(true));
  },
  render: () => <Integration {...props} />,
};
