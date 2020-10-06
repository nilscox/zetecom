import React, { useCallback, useEffect, useState } from 'react';

import Authenticated from 'src/components/Authenticated';
import { SearchQueryProvider } from 'src/contexts/SearchQueryContext';

import AsyncContent from '../components/AsyncContent';
import CommentsAreaComponent from '../components/CommentsArea/CommentsAreaComponent';
import FiltersBar from '../components/FiltersBar';
import Padding from '../components/Padding';
import { CommentsAreaProvider } from '../contexts/CommentsAreaContext';
import useAxiosPaginated from '../hooks/use-axios-paginated';
import { Comment, parseComment } from '../types/Comment';
import { CommentsArea, parseCommentsArea } from '../types/CommentsArea';

const useParseCommentsAreaForUser = () => {
  return useCallback(
    (data: any) => ({
      commentsArea: parseCommentsArea(data.commentsArea),
      comments: data.comments.map(parseComment) as Comment[],
    }),
    [],
  );
};

const useFoldCommentsArea = (data: { commentsArea: CommentsArea }[]) => {
  const [folded, setFolded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (data) {
      setFolded(data.reduce((obj, { commentsArea: { id } }) => ({ ...obj, [id]: false }), {}));
    }
  }, [data]);

  const toggleFolded = (commentsArea: CommentsArea) => {
    setFolded({ ...folded, [commentsArea.id]: !folded[commentsArea.id] });
  };

  const foldAll = () => {
    const areAllFolded = Object.values(folded).every(Boolean);

    setFolded(data.reduce((obj, { commentsArea: { id } }) => ({ ...obj, [id]: !areAllFolded }), {}));
  };

  return [(commentsArea: CommentsArea) => folded[commentsArea.id], toggleFolded, foldAll] as const;
};

const UserComments: React.FC = () => {
  const parseCommentsAreaForUser = useParseCommentsAreaForUser();
  const [{ loading, data, total, error }, { search, setSearch }, , { page, setPage }] = useAxiosPaginated(
    '/api/comment/me',
    parseCommentsAreaForUser,
  );

  if (error) {
    throw error;
  }

  const [isFolded, toggleFolded, foldAll] = useFoldCommentsArea(data);

  const handleToggleFold = (commentsArea: CommentsArea) => (ctrlKey: boolean) => {
    if (ctrlKey) {
      foldAll();
    } else {
      toggleFolded(commentsArea);
    }
  };

  return (
    <Authenticated>
      <AsyncContent
        loading={loading}
        render={() => (
          <SearchQueryProvider value={search}>
            <FiltersBar onSearch={setSearch} page={page} pageSize={10} total={total} onPageChange={setPage} />
            {data.map(({ commentsArea, comments }) => (
              <Padding key={commentsArea.id} top>
                <CommentsAreaProvider value={commentsArea}>
                  <CommentsAreaComponent
                    commentsArea={commentsArea}
                    comments={comments}
                    loadingComments={false}
                    folded={isFolded(commentsArea)}
                    toggleFolded={handleToggleFold(commentsArea)}
                  />
                </CommentsAreaProvider>
              </Padding>
            ))}
          </SearchQueryProvider>
        )}
      />
    </Authenticated>
  );
};

export default UserComments;
