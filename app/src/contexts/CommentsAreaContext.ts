import { createContext, useContext } from 'react';

import { CommentsArea } from '../types/CommentsArea';

const CommentsAreaContext = createContext<CommentsArea | null>(null);

export const CommentsAreaProvider = CommentsAreaContext.Provider;

export const useCommentsArea = () => {
  const commentsArea = useContext(CommentsAreaContext);

  if (commentsArea === null) {
    throw new Error('commentsArea should not be null');
  }

  return commentsArea;
};
