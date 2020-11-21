import setupIntegration from './integration';
import integrations from './integrations';

for (const integration of integrations) {
  const identifier = integration.getIdentifier(location.href);

  if (identifier) {
    setupIntegration(integration);
  }
}
