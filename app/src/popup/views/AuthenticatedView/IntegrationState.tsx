import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';

import Button from 'src/components/Button';
import useIFrameMessages from 'src/hooks/use-iframe-messages';

const IntegrationState: React.FC = () => {
  const [sendMessage, addListener] = useIFrameMessages();
  const [state, setState] = useState<{ available: boolean; loaded: boolean }>();

  useEffect(() => {
    sendMessage({ type: 'GET_INTEGRATION_STATE' });

    // TODO: cleanup
    addListener((message) => {
      if (message.type === 'INTEGRATION_STATE') {
        setState(message.state);
      }
    });
  }, []);

  if (!state) {
    return null;
  }

  if (!state.available) {
    return <Typography>Aucune zone de commentaire n'est disponible sur cette page.</Typography>;
  }

  return (
    <>
      {state.loaded ? (
        <Typography>
          Une zone de commentaires est disponible sur cette page.
        </Typography>
      ) : (
        <Typography>
          Une zone de commentaires peut être ouverte sur cette page.
        </Typography>
      )}

      <Button fullWidth onClick={() => sendMessage({ type: 'SCROLL_IFRAME_INTO_VIEW' })}>
        Voir
      </Button>
    </>
  );
};

export default IntegrationState;
