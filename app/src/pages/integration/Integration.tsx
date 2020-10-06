import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import AsyncContent from 'src/components/AsyncContent';
import CommentsArea from 'src/components/CommentsArea';
import Fallback, { not } from 'src/components/Fallback';
import HeaderLogo from 'src/components/HeaderLogo';
import Padding from 'src/components/Padding';
import { useTrackPageview } from 'src/components/TrackPageView';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { CommentsArea as CommentsAreaType, parseCommentsArea } from 'src/types/CommentsArea';
import { trackViewIntegration } from 'src/utils/track';

import CommentAreaClosed from './CommentAreaClosed';

type IntegrationRouterProps = {
  commentsArea: CommentsAreaType;
};

const IntegrationRouter: React.FC<IntegrationRouterProps> = ({ commentsArea }) => (
  <Router>

    <Route path="/" exact render={() => <Redirect to="/comment" />} />
    <Route path="/comment" exact render={() => <CommentsArea commentsArea={commentsArea} />} />

  </Router>
);

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    backgroundColor: 'white',
    padding: spacing(2),
    border: `1px solid ${palette.grey[400]}`,
  },
}));

const Integration: React.FC = () => {
  const classes = useStyles();

  const { identifier: identifierParam, origin: originParam } = useQueryString();
  const [identifier, setIdentifier] = useState(identifierParam as string);
  const origin = decodeURIComponent(originParam as string);

  const opts = {
    url: `/api/comments-area/by-identifier/${identifier}`,
    validateStatus: (s: number) => [200, 404].includes(s),
  };

  // TODO: use fetchCommentsArea
  const [{ data: commentsArea, loading, error }, fetchCommentsArea] = useAxios(opts, parseCommentsArea);

  useTrackPageview(() => !!commentsArea);

  useEffect(() => {
    if (commentsArea) {
      trackViewIntegration(identifier);
    }
  });

  if (error) {
    throw error;
  }

  useEffect(() => void identifier && fetchCommentsArea(), [identifier, fetchCommentsArea]);

  useEffect(() => {
    const identifierChangedListener = (evt: MessageEvent) => {
      if (evt.origin !== origin) {
        return;
      }

      if (evt.data.type === 'IDENTIFIER_CHANGED') {
        setIdentifier(evt.data.identifier);
      }
    };

    window.addEventListener('message', identifierChangedListener);

    return () => window.removeEventListener('message', identifierChangedListener);
  }, [origin]);

  useEffect(() => {
    if (commentsArea) {
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: 'INTEGRATION_LOADED' },
          origin,
        );
      }
    }
  }, [commentsArea, origin]);

  return (
    <div className={classes.container}>
      <AsyncContent
        loading={loading}
        render={() => (
          <>
            <Padding bottom>
              <HeaderLogo />
            </Padding>

            <Fallback
              when={not(commentsArea)}
              fallback={<CommentAreaClosed />}
              render={() => <IntegrationRouter commentsArea={commentsArea} />}
            />
          </>
        )}
      >
      </AsyncContent>
    </div>
  );
};

export default Integration;
