import React, { useState } from 'react';

import makeCommentsArea from '../../test/makeCommentsArea';
import withMemoryRouter from '../../utils/storybook/withMemoryRouter';
import withUser from '../../utils/storybook/withUser';

import CommentsAreaComponent from './CommentsAreaComponent';

export default {
  title: 'CommentsAreaComponent',
  decorators: [withMemoryRouter, withUser],
};

const commentsArea = makeCommentsArea();

export const Default = () => {
  const [folded, setFolded] = useState(false);

  return <CommentsAreaComponent commentsArea={commentsArea} folded={folded} toggleFolded={() => setFolded(!folded)} />;
};

export const Folded = () => {
  const [folded, setFolded] = useState(true);

  return <CommentsAreaComponent commentsArea={commentsArea} folded={folded} toggleFolded={() => setFolded(!folded)} />;
};
