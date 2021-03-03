import React from 'react';

import styled from '@emotion/styled';

import Button from 'src/components/elements/Button/Button';
import Fallback from 'src/components/layout/Fallback/Fallback';
import { fontSize, spacing } from 'src/theme';
import { useUser } from 'src/contexts/userContext';

const CommentsAreaClosedFallback = styled.div`
  font-size: ${fontSize('xlarge')};
  margin-bottom: ${spacing(2)};
`;

type CommentsAreaClosed = {
  requested: boolean;
  onRequest: () => void;
};

const CommentsAreaClosed: React.FC<CommentsAreaClosed> = ({ requested, onRequest }) => {
  const user = useUser();

  return (
    <Fallback
      when
      fallback={
        <>
          <CommentsAreaClosedFallback>
            L'espace de commentaires Zétécom n'est pas ouvert sur cette page.
          </CommentsAreaClosedFallback>

          {user && !requested && (
            <Button size="large" onClick={onRequest}>
              Demander l'ouverture
            </Button>
          )}

          {user && requested && (
            <>
              La demande d'ouverture a bien été prise en compte, les modérateurs vont traiter votre requête au plus
              vite.
            </>
          )}
        </>
      }
    />
  );
};

export default CommentsAreaClosed;
