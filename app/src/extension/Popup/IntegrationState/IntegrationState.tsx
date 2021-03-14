import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Button from 'src/components/elements/Button/Button';
import { fontSize, spacing } from 'src/theme';

import { getIntegrationState, onFocusApp } from '../../messages';
import { IntegrationState } from '../../types';

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

const IntegrationStateView: React.FC = () => {
  const [integrationState, setIntegrationState] = useState<IntegrationState>();

  useEffect(() => getIntegrationState(setIntegrationState), []);

  const getText = () => {
    if (!integrationState || !integrationState.available) {
      return "Aucune zone de commentaire n'est disponible sur cette page.";
    }

    if (integrationState.loaded) {
      return 'Une zone de commentaires est disponible sur cette page.';
    }

    return 'Une zone de commentaires peut être ouverte sur cette page.';
  };

  return (
    <>
      <IntegrationStateText>{getText()}</IntegrationStateText>
      {integrationState?.available && <ShowIntegrationButton onClick={onFocusApp}>Voir</ShowIntegrationButton>}
    </>
  );
};

export default IntegrationStateView;
