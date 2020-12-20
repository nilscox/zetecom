import '@cypress/code-coverage/support';

import './commands/authentication';
import './commands/comments';
import './commands/comments-areas';
import './commands/forms';
import './commands/navigation';
import './commands/screenshots';
import './commands/seeds';
import './commands/tracking';

Cypress.Commands.add('fixCI', () => {
  cy.wait(500);
});

beforeEach(() => {
  cy.clearCookies({ domain: null });
});
