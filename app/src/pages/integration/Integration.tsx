import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import AsyncContent from 'src/components/AsyncContent';
import Fallback from 'src/components/Fallback';
import HeaderLogo from 'src/components/HeaderLogo';
import Padding from 'src/components/Padding';
import { useTrackPageview } from 'src/components/TrackPageView';
import { CommentsAreaProvider } from 'src/contexts/CommentsAreaContext';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { parseCommentsArea } from 'src/types/CommentsArea';
import { trackViewIntegration } from 'src/utils/track';

import CommentAreaClosed from './CommentAreaClosed';
import CommentsArea from './CommentsArea';

const IntegrationRouter = () => (
  <Router>

    <Route path="/" exact render={() => <Redirect to="/comment" />} />
    <Route path="/comment" exact component={CommentsArea} />

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

  const [{ data: commentsArea, loading, error }, fetchInfo] = useAxios(opts, parseCommentsArea);

  useTrackPageview(() => !!commentsArea);

  useEffect(() => {
    if (commentsArea)
      trackViewIntegration(identifier);
  });

  if (error)
    throw error;

  useEffect(() => void identifier && fetchInfo(), [identifier, fetchInfo]);

  useEffect(() => {
    const identifierChangedListener = (evt: MessageEvent) => {
      if (evt.origin !== origin)
        return;

      if (evt.data.type === 'IDENTIFIER_CHANGED')
        setIdentifier(evt.data.identifier);
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
      <AsyncContent loading={loading}>
        {() => (
          <>

            <Padding bottom>
              <HeaderLogo />
            </Padding>

            <Fallback
              when={!commentsArea}
              fallback={<CommentAreaClosed />}
            >
              {() => (
                <CommentsAreaProvider value={commentsArea}>
                  <IntegrationRouter />
                </CommentsAreaProvider>
              )}
            </Fallback>

          </>
        )}
      </AsyncContent>
    </div>
  );
};

export default Integration;
