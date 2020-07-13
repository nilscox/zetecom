import React, { useEffect, useState } from 'react';

import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import AsyncContent from 'src/components/AsyncContent';
import Fallback from 'src/components/Fallback';
import HeaderLogo from 'src/components/HeaderLogo';
import Padding from 'src/components/Padding';
import Text from 'src/components/Text';
import { useTrackPageview } from 'src/components/TrackPageView';
import { InformationProvider } from 'src/contexts/InformationContext';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { parseInformation } from 'src/types/Information';
import { trackViewIntegration } from 'src/utils/track';

import ReactionsZone from './ReactionsZone';

import { makeStyles } from '@material-ui/core';

const IntegrationRouter = () => (
  <Router>

    <Route path="/" exact render={() => <Redirect to="/reaction" />} />
    <Route path="/reaction" exact component={ReactionsZone} />

  </Router>
);

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    minHeight: 400,
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
    url: `/api/information/by-identifier/${identifier}`,
    validateStatus: (s: number) => [200, 404].includes(s),
  };

  const [{ data: information, loading, error }, fetchInfo] = useAxios(opts, parseInformation);

  useTrackPageview(() => !!information);

  useEffect(() => {
    if (information)
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
    if (information) {
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: 'INTEGRATION_LOADED' },
          origin,
        );
      }
    }
  }, [information, origin]);

  return (
    <div className={classes.container}>
      <AsyncContent loading={loading}>
        {() => (
          <>

            <Padding bottom>
              <HeaderLogo />
            </Padding>

            <Fallback
              when={!information}
              fallback={
                <Text uppercase color="textLight">
                  L'espace de commentaires n'est pas activé sur cette page.
                </Text>
              }
            >
              {() => (
                <InformationProvider value={information}>
                  <IntegrationRouter />
                </InformationProvider>
              )}
            </Fallback>

          </>
        )}
      </AsyncContent>
    </div>
  );
};

export default Integration;
