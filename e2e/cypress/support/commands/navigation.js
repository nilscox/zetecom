const APP_URL = Cypress.env('APP_URL');

Cypress.Commands.add('pathname', (path) => cy.url().should('eq', APP_URL + path));

Cypress.Commands.add('visitPopup', (url = '') => {
  cy.viewport(380, 550);
  cy.visit(APP_URL + '/popup' + url);
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

Cypress.Commands.add('visitApp', (route = '') => {
  cy.visit(APP_URL + route);
});
