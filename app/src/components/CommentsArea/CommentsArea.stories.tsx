import React, { useState } from 'react';

import { boolean } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import makeCommentsArea from '../../test/makeCommentsArea';
import makeUser from '../../test/makeUser';

import CommentsAreaComponent from './CommentsAreaComponent';

const withMemoryRouter = (Story: React.FC) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const withUserContext = (Story: React.FC) => {
  const user = makeUser({ nick: 'Doug Forcett' });
  const loggedIn = boolean('logged in', true);

  return (
    <UserContext.Provider value={[loggedIn ? user : null, () => {}]}>
      <Story />
    </UserContext.Provider>
  );
};

export default {
  title: 'CommentsAreaComponent',
  decorators: [withMemoryRouter, withUserContext],
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
