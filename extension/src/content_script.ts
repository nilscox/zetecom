import { IntegrationHost } from './integration/IntegrationHost';
import integrations from './integrations';

import './integration/integration.css';

const host = new IntegrationHost();

integrations.forEach(IntegrationClass => host.register(new IntegrationClass()));
host.run();
