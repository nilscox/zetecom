import React, { useEffect, useState } from 'react';

import { HashRouter as Router, Redirect, Route } from 'react-router-dom';

import AsyncContent from 'src/components/common/AsyncContent';
import CenteredContent from 'src/components/common/CenteredContent';
import Text from 'src/components/common/Text';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { parseInformation } from 'src/types/Information';
import { InformationProvider } from 'src/utils/InformationContext';
import { useTheme } from 'src/utils/Theme';

import ReactionsList from './ReactionsList';

const Header: React.FC = () => {
  const { fontSizes, colors, sizes } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <img
        src="/assets/images/logo.png"
        alt="Logo de Réagir à l'information"
        style={{ width: 36, height: 36, opacity: 0.8, marginRight: sizes.big }}
      />

      <div>
        <h1 style={{ fontFamily: 'Domine', fontSize: fontSizes.title }}>Réagir à l'information</h1>
        <div style={{ color: colors.textLight, fontSize: fontSizes.small, letterSpacing: 4 }}>
          Avec esprit critique !
        </div>
      </div>

    </div>
  );
};

const IntegrationRouter = () => (
  <Router>

    <Header />

    <Route path="/" exact render={() => <Redirect to="/reaction" />} />
    <Route path="/reaction" exact component={ReactionsList} />

  </Router>
);

const InformationUnavalible: React.FC = () => {
  const { colors: { border } } = useTheme();

  return (
    <div style={{ minHeight: 300, backgroundColor: 'white', padding: 10, border: `1px solid ${border}` }}>

      <Header />

      <CenteredContent>
        <Text uppercase color="textLight">
          L'espace de commentaires n'est pas activé sur cette page.
        </Text>
      </CenteredContent>

    </div>
  );
};

const DOMAIN_NAME_REGEXP = /(https?:\/\/[-.a-z0-9]+(:\d+)?)\/?/;

const Integration: React.FC = () => {
  const { colors: { border } } = useTheme();

  const { identifier, url } = useQueryString();
  const [margin, setMargin] = useState(0);

  const opts = {
    url: `/api/information/by-identifier/${encodeURIComponent(identifier as string)}`,
    validateStatus: (s: number) => [200, 404].includes(s),
  };
  const [{ data: information, loading, error }] = useAxios(opts, parseInformation);

  useEffect(() => {
    if (information) {
      if (window.parent === window)
        setMargin(15);
      else {
        const match = DOMAIN_NAME_REGEXP.exec(url as string);

        if (!match)
          console.warn('Cannot find domain name from url');
        else {
          window.parent.postMessage(
            { type: 'INTEGRATION_LOADED' },
            match[1],
          );
        }
      }
    }
  }, [information, identifier, url]);

  if (error)
    throw error;

  return (
    <AsyncContent
      loading={loading}
      content={() => (
        <div style={{
          width: 'auto',
          margin: `0 ${margin}px`,
          paddingBottom: 20,
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
