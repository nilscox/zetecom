import { setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthorizationModule } from '../authorization/authorization.module';

import { EmailModule } from './email.module';

describe('email controller', () => {

  setupE2eTest({
    imports: [EmailModule, AuthenticationModule, AuthorizationModule],
  });

  // TODO

  // eslint-disable-next-line
  it('should pass', () => {});

});
