/** @jsx jsx */
import React, { useEffect, useState } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';

import Select from 'src/components/elements/Select/Select';
import { medias } from 'src/domain/medias/medias';
import { spacing } from 'src/theme';
import { MediaType } from 'src/types/CommentsArea';

import { getExtensionConfig, updateExtensionConfig } from '../../messages';
import { ExtensionConfig, IntegrationType } from '../../types';

const InfoMessage = styled.div`
  margin: ${spacing(4, 0)};
`;

const MediaConfig = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${spacing(1, 0)};

  & > div {
    flex: 1;
  }
`;

const ConfigurationView: React.FC = () => {
  const [config, setConfig] = useState<ExtensionConfig>();

  useEffect(() => getExtensionConfig(setConfig), []);

  const handleIntegrationTypeChange = (media: MediaType, value: IntegrationType) => {
    const newConfig = {
      ...config,
      integrationTypes: {
        ...config?.integrationTypes,
        [media]: value,
      },
    };

    setConfig(newConfig);
    updateExtensionConfig(newConfig);
  };

  return (
    <>
      <InfoMessage>
        Vous pouvez configurer l'extension Zétécom indépendamment pour chaque site, pour afficher les zones de
        commentaire intégrées à la page, par dessus la page ou ne pas les afficher du tout.
      </InfoMessage>

      {Object.entries(medias).map(([media, { label }]) => (
        <MediaConfig key={media}>
          <div>{label}</div>
          <div>
            <Select
              value={config?.integrationTypes[media]}
              onChange={e => handleIntegrationTypeChange(media as MediaType, e.currentTarget.value as IntegrationType)}
            >
              <option value="integration">Intégration</option>
              <option value="overlay">Overlay</option>
              <option value="disabled">Désactivé</option>
            </Select>
          </div>
        </MediaConfig>
      ))}
    </>
  );
};

export default ConfigurationView;
