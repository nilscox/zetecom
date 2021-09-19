import { setCommentsArea } from '@zetecom/app-core';

import { Demo } from '~/demos';
import { intelligenceArtificielle } from '~/fixtures';

import { CommentsAreaOutline } from './CommentsAreaOutline';

export const commentsAreaOutline: Demo = {
  prepare: ({ store }) => {
    store.dispatch(setCommentsArea(intelligenceArtificielle));
  },
  render: () => <CommentsAreaOutline commentsAreaId={intelligenceArtificielle.id} link="#" />,
};
