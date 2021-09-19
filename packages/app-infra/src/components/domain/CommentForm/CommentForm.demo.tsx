import { createAuthenticatedUser, setAuthenticatedUser } from '@zetecom/app-core';

import { Demo } from '~/demos';

import { CommentForm } from './CommentForm';

export const commentForm: Demo = {
  prepare: ({ store }) => store.dispatch(setAuthenticatedUser(createAuthenticatedUser({ nick: 'Myself' }))),
  render: () => <CommentForm isLoading={false} placeholder="Rédiger un commentaire..." onSubmit={() => {}} />,
};
