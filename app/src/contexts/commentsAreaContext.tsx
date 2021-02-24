import { createContext, useContext } from 'react';

import { CommentsArea } from 'src/types/CommentsArea';

const commentsAreaContext = createContext<CommentsArea>(null as any);

export const CommentsAreaProvider = commentsAreaContext.Provider;
export const useCommentsArea = () => useContext(commentsAreaContext);
