import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import AsyncContent from 'src/components/AsyncContent';
import CommentsArea from 'src/components/CommentsArea';
import Fallback from 'src/components/Fallback';
import HeaderLogo from 'src/components/HeaderLogo';
import Padding from 'src/components/Padding';
import { useTrackPageview } from 'src/components/TrackPageView';
import useQueryString from 'src/hooks/use-query-string';
import { CommentsArea as CommentsAreaType } from 'src/types/CommentsArea';
import { trackViewIntegration } from 'src/utils/track';

import CommentAreaClosed from './CommentAreaClosed';
import useFetchCommentsArea from 'src/components/CommentsArea/useFetchCommentsArea';

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

  const { identifier: identifierParam, origin: originParam } = useQueryString();
  const identifier = decodeURIComponent(identifierParam as string);
  const origin = decodeURIComponent(originParam as string);

  const [{ data: commentsArea, loading, status }] = useFetchCommentsArea({ identifier });

  useTrackPageview(() => !!commentsArea);

  useEffect(() => {
    if (commentsArea) {
      trackViewIntegration(identifier);
    }
  }, [commentsArea, identifier]);

  useEffect(() => {
    if (commentsArea) {
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'INTEGRATION_LOADED' }, origin);
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
