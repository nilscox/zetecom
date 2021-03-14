import { IntegrationHost } from './integration/IntegrationHost';
import integrations from './integrations';

const host = new IntegrationHost();

integrations.forEach(IntegrationClass => host.register(new IntegrationClass()));
host.run();
