const APP_URL = Cypress.env('APP_URL');

Cypress.Commands.add('pathname', (path) => cy.url().should('eq', APP_URL + path));

Cypress.Commands.add('visitPopup', (path = '') => {
  cy.viewport(380, 550);
  cy.visit(APP_URL + '/popup' + path);
});

Cypress.Commands.add('visitIntegration', (identifier, pageUrl) => {
  cy.visit(APP_URL + '/integration?identifier=' + encodeURIComponent(identifier) + '&pageUrl=' + pageUrl);
});

Cypress.Commands.add('visitHistory', (commentId) => {
  cy.visit(APP_URL + '/integration/comment/' + commentId + '/history');
});

Cypress.Commands.add('visitReport', (commentId) => {
  cy.visit(APP_URL + '/integration/comment/' + commentId + '/report');
});

Cypress.Commands.add('visitApp', (path = '') => {
  cy.visit(APP_URL + path);
});

declare namespace Cypress {
  interface Chainable {
    pathname(path: string): Chainable<void>;
    visitPopup(path?: string): Chainable<void>;
    visitIntegration(identifier: string, pageUrl: string): Chainable<void>;
    visitHistory(commentId: number): Chainable<void>;
    visitReport(commentId: number): Chainable<void>;
    visitApp(path?: string): Chainable<void>;
  }
}
