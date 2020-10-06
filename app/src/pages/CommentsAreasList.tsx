import React from 'react';

import FiltersBar from 'src/components/FiltersBar';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseCommentsArea } from 'src/types/CommentsArea';

import Padding from '../components/Padding';
import CommentsAreaComponent from '../components/CommentsArea/CommentsAreaComponent';

const CommentsAreasList: React.FC = () => {
  const [{ loading, data: commentsAreas, total, error }, { setSearch },, { page, setPage }] = useAxiosPaginated(
    '/api/comments-area',
    parseCommentsArea,
  );

  if (error) {
    throw error;
  }

  return (
    <>
      <FiltersBar onSearch={setSearch} page={page} pageSize={10} total={total} onPageChange={setPage} />

      {!loading &&
        commentsAreas?.map(commentsArea => (
          <Padding top key={commentsArea.id}>
            <CommentsAreaComponent commentsArea={commentsArea} />
          </Padding>
        ))}
    </>
  );
};

export default CommentsAreasList;
