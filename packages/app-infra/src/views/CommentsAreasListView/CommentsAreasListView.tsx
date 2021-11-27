import React, { useEffect } from 'react';

import { fetchCommentsAreas, selectCommentsAreas, selectIsFetchingCommentsAreas } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { CommentsAreaOutline } from '~/components/domain/CommentsAreaOutline/CommentsAreaOutline';
import { Button } from '~/components/elements/Button/Button';
import { FiltersBar } from '~/components/elements/FiltersBar/FiltersBar';
import { Script } from '~/components/elements/Script/Script';
import { Async } from '~/components/layout/Async/Async';
import { Fallback } from '~/components/layout/Fallback/Fallback';
import { List } from '~/components/layout/List/List';
import { useAppSelector } from '~/hooks/useAppSelector';

import { useHandleAuthenticationTokens } from './useHandleAuthenticationTokens';

export const CommentsAreasListView: React.FC = () => {
  const dispatch = useDispatch();

  const commentsAreas = useAppSelector(selectCommentsAreas);
  const loading = useAppSelector(selectIsFetchingCommentsAreas);

  useEffect(() => {
    dispatch(fetchCommentsAreas());
  }, []);

  useHandleAuthenticationTokens();

  if (!loading && !commentsAreas) {
    return null;
  }

  return (
    <>
      <FiltersBar onSearch={() => {}} pagination={{ page: 1, total: 1 }} />

      <Button data-tf-popup="yMudeqAm" data-tf-size="70" marginY={4}>
        Ouvrir une zone de commentaires
      </Button>

      <Script src="//embed.typeform.com/next/embed.js" />

      <Async
        loading={loading}
        render={() => (
          <>
            <List rowGap={5}>
              {commentsAreas.map((commentsArea) => (
                <CommentsAreaOutline
                  key={commentsArea.id}
                  commentsAreaId={commentsArea.id}
                  link={`/commentaires/${commentsArea.id}`}
                />
              ))}
            </List>

            {commentsAreas.length === 0 && <Fallback>Aucune zone de commentaire.</Fallback>}
          </>
        )}
      />
    </>
  );
};
