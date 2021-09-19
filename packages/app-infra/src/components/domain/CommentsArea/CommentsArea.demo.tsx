import { createAuthenticatedUser, setAuthenticatedUser, setCurrentCommentsArea } from '@zetecom/app-core';

import { radioactivitéCovid } from '~/fixtures';

import { Demo } from '../../../demos';

import { CurrentCommentsArea } from './CommentsArea';

export const commentsAreaDemo: Demo = {
  prepare: ({ store, containers }) => {
    store.dispatch(setAuthenticatedUser(createAuthenticatedUser({ nick: 'Myself' })));
    store.dispatch(setCurrentCommentsArea(radioactivitéCovid));

    containers.commentsAreas.addItem(radioactivitéCovid);
  },
  render: () => <CurrentCommentsArea />,
};
