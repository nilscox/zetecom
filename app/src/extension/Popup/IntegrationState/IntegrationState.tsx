import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Button from 'src/components/elements/Button/Button';
import useIFrameMessages from 'src/hooks/use-iframe-messages';
import { fontSize, spacing } from 'src/theme';

const IntegrationStateText = styled.div`
  margin: ${spacing(4, 0)};
  font-size: ${fontSize('large')};
`;

const ShowIntegrationButton = styled(Button)`
  margin: auto;
  margin-bottom: ${spacing(2)};
  padding: ${spacing(1, 4)};
  display: block;
`;

const IntegrationState: React.FC = () => {
  const [sendMessage, addListener] = useIFrameMessages();
  const [state, setState] = useState<{ available: boolean; loaded: boolean }>();

  useEffect(() => {
    // TODO: cleanup
    addListener(message => {
      if (message.type === 'INTEGRATION_STATE') {
        setState(message.state);
      }
    });

    sendMessage({ type: 'GET_INTEGRATION_STATE' });
  }, [sendMessage, addListener]);

  const getText = () => {
    if (!state || !state.available) {
      return "Aucune zone de commentaire n'est disponible sur cette page.";
    }

    if (state.loaded) {
      return 'Une zone de commentaires est disponible sur cette page.';
    }

    return 'Une zone de commentaires peut être ouverte sur cette page.';
  };

  return (
    <>
      <IntegrationStateText>{getText()}</IntegrationStateText>
      {state?.available && (
        <ShowIntegrationButton onClick={() => sendMessage({ type: 'SCROLL_IFRAME_INTO_VIEW' })}>
          Voir
        </ShowIntegrationButton>
      )}
    </>
  );
};

export default IntegrationState;
