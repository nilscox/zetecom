import React, { useCallback, useEffect, useState, useMemo } from 'react';

import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import AsyncContent from 'src/components/common/AsyncContent';
import CenteredContent from 'src/components/common/CenteredContent';
import HeaderLogo from 'src/components/common/HeaderLogo';
import Text from 'src/components/common/Text';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { parseInformation } from 'src/types/Information';
import { InformationProvider } from 'src/utils/InformationContext';
import { useTheme } from 'src/utils/Theme';

import ReactionsZone from './ReactionsZone';

const IntegrationRouter = () => (
  <Router>

    <HeaderLogo />

    <Route path="/" exact render={() => <Redirect to="/reaction" />} />
    <Route path="/reaction" exact component={ReactionsZone} />

  </Router>
);

const InformationUnavalible: React.FC = () => {
  const { colors: { border } } = useTheme();

  return (
    <div style={{ minHeight: 300, backgroundColor: 'white', padding: 10, border: `1px solid ${border}` }}>

      <HeaderLogo />

      <CenteredContent>
        <Text uppercase color="textLight">
          L'espace de commentaires n'est pas activé sur cette page.
        </Text>
      </CenteredContent>

    </div>
  );
};

const Integration: React.FC = () => {
  const { colors: { border } } = useTheme();
  const [margin, setMargin] = useState(0);

  const { identifier: identifierParam, origin: originParam } = useQueryString();
  const [identifier, setIdentifier] = useState(identifierParam as string);
  const origin = decodeURIComponent(originParam as string);

  const opts = {
    url: `/api/information/by-identifier/${identifier}`,
    validateStatus: (s: number) => [200, 404].includes(s),
  };

  const [{ data: information, loading, error }, fetchInfo] = useAxios(opts, parseInformation);

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
      if (window.parent === window)
        setMargin(15);
      else {
        window.parent.postMessage(
          { type: 'INTEGRATION_LOADED' },
          origin,
        );
      }
    }
  }, [information, origin]);

  if (error)
    throw error;

  return (
    <AsyncContent
      loading={loading}
      content={() => (
        <div style={{
          width: 'auto',
          margin: `0 ${margin}px`,
        }}>
          { information ? (
            <InformationProvider value={information}>
              <div style={{ minHeight: 400, backgroundColor: 'white', padding: 10, border: `1px solid ${border}` }}>
                <IntegrationRouter />
              </div>
            </InformationProvider>
          ) : (
            <InformationUnavalible />
          ) }
        </div>
      )}
    />

  );
};

export default Integration;
