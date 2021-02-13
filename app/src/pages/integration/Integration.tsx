import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import AsyncContent from 'src/components/AsyncContent';
import CommentsArea from 'src/components/CommentsArea';
import Fallback from 'src/components/Fallback';
import HeaderLogo from 'src/components/HeaderLogo';
import Padding from 'src/components/Padding';
import { useTrackEvent } from 'src/contexts/TrackingContext';
import useIFrameMessages from 'src/hooks/use-iframe-messages';
import useQueryString from 'src/hooks/use-query-string';
import { CommentsArea as CommentsAreaType } from 'src/types/CommentsArea';
import track from 'src/utils/track';

import CommentAreaClosed from './CommentAreaClosed';

type IntegrationRouterProps = {
  commentsArea: CommentsAreaType;
};

const IntegrationRouter: React.FC<IntegrationRouterProps> = ({ commentsArea }) => (
  <Router>
    <Route path="/" exact render={() => <Redirect to="/comment" />} />
    <Route path="/comment" exact render={() => <CommentsArea showDescription={false} commentsArea={commentsArea} />} />
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

  const { identifier: identifierParam } = useQueryString();
  const identifier = decodeURIComponent(identifierParam as string);

  const [sendMessage] = useIFrameMessages();

  const [{ data: commentsArea, loading, status }] = [{ loading: true }] as any;

  const trackEvent = useTrackEvent();

  useEffect(() => {
    if (status(200)) {
      trackEvent(track.viewIntegration(identifier, commentsArea));
    } else if (status(404)) {
      trackEvent(track.viewIntegration(identifier));
    }
  }, [commentsArea, identifier, trackEvent, status]);

  useEffect(() => {
    if (commentsArea) {
      sendMessage({ type: 'INTEGRATION_LOADED', comments: ' ' });
    }
  }, [commentsArea, sendMessage]);

  return (
    <div className={classes.container}>
      <AsyncContent
        loading={loading}
        render={() => (
          <>
            <Padding bottom>
              <HeaderLogo small />
            </Padding>

            <Fallback
              when={status(404)}
              fallback={<CommentAreaClosed />}
              render={() => <IntegrationRouter commentsArea={commentsArea} />}
            />
          </>
        )}
      ></AsyncContent>
    </div>
  );
};

export default Integration;
