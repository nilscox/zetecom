import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { AuthorizationModule } from 'src/modules/authorization/authorization.module';
import { setupE2eTest } from 'src/testing/setup-e2e-test';

import { EmailModule } from './email.module';

describe('email controller', () => {

  setupE2eTest({
    imports: [EmailModule, AuthenticationModule, AuthorizationModule],
  });

  // TODO

  // eslint-disable-next-line
  it('should pass', () => {});

});
