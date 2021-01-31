import { getQueriesForIframe } from '../../utils';

import './comments-list.e2e-spec';
import './comment-display.e2e-spec';
import './comment-mutations.e2e-spec';
import './reaction.e2e-spec';
import './report.e2e-spec';
import './subscription.e2e-spec.ts';

export const getComments = () => {
  return getQueriesForIframe().queryAllByTestId('comment');
};

export const getCommentAt = (index: number) => {
  return getComments()[index];
};

export const getCommentId = (element: HTMLElement) => {
  return Number(element.getAttribute('id')?.replace('comment-', ''));
};
