import { createContext, useContext } from 'react';

import { CommentsArea } from 'src/types/CommentsArea';

const commentsAreaContext = createContext<CommentsArea | undefined>(undefined);

export const CommentsAreaProvider = commentsAreaContext.Provider;
export const useCommentsArea = () => useContext(commentsAreaContext);
