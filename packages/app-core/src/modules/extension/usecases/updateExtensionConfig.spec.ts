import { expect } from 'earljs';

import { ExtensionConfig, IntegrationType } from '../../../entities';
import { MockExtensionGateway } from '../../../shared/mocks';
import { MemoryStore } from '../../../store/MemoryStore';
import { setExtensionConfig } from '../actions';
import { selectExtensionConfig } from '../index';

import { updateExtensionConfig } from './index';

describe('updateExtensionConfig', () => {
  let store: MemoryStore;

  let extensionGateway: MockExtensionGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ extensionGateway } = store.dependencies);
  });

  const config: ExtensionConfig = {
    mediaIntegrations: {
      media: IntegrationType.integration,
    },
  };

  const newConfig: ExtensionConfig = {
    mediaIntegrations: {
      media: IntegrationType.disabled,
    },
  };

  beforeEach(() => {
    store.dispatch(setExtensionConfig(config));

    extensionGateway.getExtensionConfig.resolvesToOnce(config);
    extensionGateway.setExtensionConfig.returnsOnce(undefined);
  });

  it('updates an integration type for a specific media', async () => {
    await store.dispatch(updateExtensionConfig('media', IntegrationType.disabled));

    expect(store.select(selectExtensionConfig)).toEqual(newConfig);
    expect(extensionGateway.setExtensionConfig).toHaveBeenCalledWith([newConfig]);
  });
});
