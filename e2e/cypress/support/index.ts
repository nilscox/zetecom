import '@cypress/code-coverage/support';

import './commands/authentication';
import './commands/comments';
import './commands/comments-areas';
import './commands/forms';
import './commands/navigation';
import './commands/notifications';
import './commands/screenshots';
import './commands/seeds';
import './commands/tracking';

Cypress.Commands.add('fixCI', () => {
  cy.wait(500);
});

beforeEach(() => {
  // @ts-ignore
  cy.clearCookies({ domain: null });
});

declare global {
  namespace Cypress {
    interface Chainable {
      fixCI(): Chainable<void>;
    }
  }
}
