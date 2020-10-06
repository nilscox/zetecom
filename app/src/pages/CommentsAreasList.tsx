import React from 'react';

import { Typography } from '@material-ui/core';

import FiltersBar from 'src/components/FiltersBar';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseCommentsArea } from 'src/types/CommentsArea';

import AsyncContent from '../components/AsyncContent';
import CommentsAreaComponent from '../components/CommentsArea/CommentsAreaComponent';
import Fallback from '../components/Fallback';
import Padding from '../components/Padding';

const CommentsAreasList: React.FC = () => {
  const [
    { loading, data: commentsAreas, total, error },
    { search, setSearch },
    ,
    { page, setPage },
  ] = useAxiosPaginated('/api/comments-area', parseCommentsArea);

  if (error) {
    throw error;
  }

  const getFallbackMessage = () => {
    if (search) {
      return 'Aucun résultat ne correspond à cette recherche.';
    }

    return "Aucune zone de commentaire n'est ouverte.";
  };

  return (
    <>
      <FiltersBar onSearch={setSearch} page={page} pageSize={10} total={total} onPageChange={setPage} />

      <AsyncContent
        loading={loading}
        render={() => (
          <Fallback
            when={!commentsAreas.length}
            fallback={<Typography variant="body2">{getFallbackMessage()}</Typography>}
            render={() => (
              <>
                {commentsAreas?.map(commentsArea => (
                  <Padding top key={commentsArea.id}>
                    <CommentsAreaComponent commentsArea={commentsArea} />
                  </Padding>
                ))}
              </>
            )}
          />
        )}
      />
    </>
  );
};

export default CommentsAreasList;
