import { setComment } from '@zetecom/app-core';

import { Demo } from '~/demos';
import { vaccinsEffetsSecondaires } from '~/fixtures';

import { ReportComment } from './ReportComment';

const comment = vaccinsEffetsSecondaires.comments[0];

export const reportComment: Demo = {
  prepare: ({ store }) => {
    store.dispatch(setComment(comment));
  },
  render: () => <ReportComment comment={comment} />,
};
