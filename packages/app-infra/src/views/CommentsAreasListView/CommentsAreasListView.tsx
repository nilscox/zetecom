import React, { useEffect } from 'react';

import { fetchCommentsAreas, selectCommentsAreas, selectIsFetchingCommentsAreas } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { CommentsAreaOutline } from '~/components/domain/CommentsAreaOutline/CommentsAreaOutline';
import { Button } from '~/components/elements/Button/Button';
import { FiltersBar } from '~/components/elements/FiltersBar/FiltersBar';
import { Async } from '~/components/layout/Async/Async';
import { Fallback } from '~/components/layout/Fallback/Fallback';
import { Flex } from '~/components/layout/Flex/Flex';
import { useAppSelector } from '~/hooks/useAppSelector';

export const CommentsAreasListView: React.FC = () => {
  const dispatch = useDispatch();

  const commentsAreas = useAppSelector(selectCommentsAreas);
  const loading = useAppSelector(selectIsFetchingCommentsAreas);

  useEffect(() => {
    dispatch(fetchCommentsAreas());
  }, []);

  if (!loading && !commentsAreas) {
    return null;
  }

  return (
    <>
      <FiltersBar onSearch={() => {}} pagination={{ page: 1, total: 1 }} />

      <Button data-tf-popup="yMudeqAm" data-tf-size="70" marginY={4}>
        Ouvrir une zone de commentaires
      </Button>

      <Async
        loading={loading}
        render={() => (
          <>
            <Flex direction="column" rowGap={5}>
              {commentsAreas.map((commentsArea) => (
                <CommentsAreaOutline
                  key={commentsArea.id}
                  commentsAreaId={commentsArea.id}
                  link={`/commentaires/${commentsArea.id}`}
                />
              ))}
            </Flex>
            {commentsAreas.length === 0 && <Fallback>Aucune zone de commentaire.</Fallback>}
          </>
        )}
      />
    </>
  );
};
