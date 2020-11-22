import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Button from 'src/components/Button';
import Padding from 'src/components/Padding';
import useIFrameMessages from 'src/hooks/use-iframe-messages';

const useStyles = makeStyles({
  text: {
    fontSize: 18,
  },
});

const IntegrationState: React.FC = () => {
  const [sendMessage, addListener] = useIFrameMessages();
  const [state, setState] = useState<{ available: boolean; loaded: boolean }>();

  const classes = useStyles();

  useEffect(() => {
    sendMessage({ type: 'GET_INTEGRATION_STATE' });

    // TODO: cleanup
    addListener((message) => {
      if (message.type === 'INTEGRATION_STATE') {
        setState(message.state);
      }
    });
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
      <Padding y>
        <Typography className={classes.text}>
          {getText()}
        </Typography>
      </Padding>

      {state?.available && (
        <Button fullWidth onClick={() => sendMessage({ type: 'SCROLL_IFRAME_INTO_VIEW' })} style={{ fontSize: 16 }}>
          Voir
        </Button>
      )}
    </>
  );
};

export default IntegrationState;
