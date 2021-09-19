import React from 'react';

import styled from '@emotion/styled';
import { focusIntegration, IntegrationState, loadIntegrationState } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { Button } from '~/components/elements/Button/Button';
import { Text } from '~/components/elements/Text/Text';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useEffectDispatch } from '~/hooks/useEffectDispatch';

export const CommentsTab: React.FC = () => {
  const dispatch = useDispatch();

  const integrationState = useAppSelector((state) => state.extension.integrationState);

  useEffectDispatch(loadIntegrationState(), []);

  return (
    <>
      <Text as="p" marginY={4}>
        {integrationState && <IntegrationStateMessage state={integrationState} />}
      </Text>

      {(integrationState?.available || integrationState?.loaded) && (
        <FocusButton onClick={() => dispatch(focusIntegration())}>Afficher</FocusButton>
      )}
    </>
  );
};

const FocusButton = styled(Button)`
  display: block;
  margin: auto;
`;

type IntegrationStateMessageProps = {
  state: IntegrationState;
};

const IntegrationStateMessage: React.FC<IntegrationStateMessageProps> = ({ state }) => {
  if (state.loaded) {
    return <>Une zone de commentaires est disponible sur cette page.</>;
  }

  if (state.available) {
    return <>Une zone de commentaires peut être ouverte sur cette page.</>;
  }

  return <>Aucune zone de commentaire n'est disponible sur cette page.</>;
};
