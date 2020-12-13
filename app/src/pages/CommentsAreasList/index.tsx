import React from 'react';

import FiltersBar from 'src/components/FiltersBar';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import CommentsAreaRequest from 'src/pages/CommentsAreasList/CommentsAreaRequest';
import { CommentsArea } from 'src/types/CommentsArea';

import AsyncContent from '../../components/AsyncContent';
import CommentsAreaComponent from '../../components/CommentsArea/CommentsAreaComponent';
import Fallback from '../../components/Fallback';
import Padding from '../../components/Padding';
import { useCurrentUser } from '../../contexts/UserContext';

const CommentsAreasList: React.FC = () => {
  const user = useCurrentUser();

  const [
    { loading, data: commentsAreas, total, error },
    { search, setSearch },
    ,
    { page, setPage },
  ] = useAxiosPaginated('/api/comments-area', undefined, CommentsArea);

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

      {user && <CommentsAreaRequest />}

      <AsyncContent
        loading={loading}
        render={() => (
          <Fallback
            when={!commentsAreas?.length}
            fallback={getFallbackMessage()}
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
