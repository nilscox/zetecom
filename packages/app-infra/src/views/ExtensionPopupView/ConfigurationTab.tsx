import React from 'react';

import styled from '@emotion/styled';
import { IntegrationType, loadExtensionConfig, updateExtensionConfig } from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { Select } from '~/components/elements/Select/Select';
import { Text } from '~/components/elements/Text/Text';
import { Flex } from '~/components/layout/Flex/Flex';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useEffectDispatch } from '~/hooks/useEffectDispatch';
import { medias } from '~/medias/medias';
import { spacing } from '~/theme';

export const ConfigurationTab: React.FC = () => {
  const dispatch = useDispatch();

  const config = useAppSelector((state) => state.extension.config);

  useEffectDispatch(loadExtensionConfig(), []);

  const handleChange = (media: string) => (type: IntegrationType) => {
    dispatch(updateExtensionConfig(media, type));
  };

  return (
    <>
      <Text as="p" marginBottom={4}>
        Vous pouvez configurer l'extension Zétécom indépendamment pour chaque site, pour afficher les zones de
        commentaire intégrées à la page, par dessus la page (mode overlay) ou ne pas les afficher du tout.
      </Text>

      {config &&
        Object.keys(medias).map((media) => (
          <Flex key={media} direction="row" marginY={2}>
            <Media>{media}</Media>
            <SelectIntegrationType type={config.mediaIntegrations[media]} onChange={handleChange(media)} />
          </Flex>
        ))}
    </>
  );
};

const Media = styled.label`
  flex: 1;
  margin: ${spacing(1, 0)};
`;

const mapIntegrationLabel: Record<IntegrationType, string> = {
  [IntegrationType.integration]: 'Intégrées',
  [IntegrationType.overlay]: 'Overlay',
  [IntegrationType.disabled]: 'Désactivées',
};

type SelectIntegrationTypeProps = {
  type: IntegrationType;
  onChange: (type: IntegrationType) => void;
};

const SelectIntegrationType: React.FC<SelectIntegrationTypeProps> = ({ type, onChange }) => (
  <div style={{ flex: 1 }}>
    <Select value={type} onChange={(e) => onChange(e.target.value as IntegrationType)}>
      {Object.values(IntegrationType).map((integration) => (
        <option key={integration} value={integration}>
          {mapIntegrationLabel[integration]}
        </option>
      ))}
    </Select>
  </div>
);
