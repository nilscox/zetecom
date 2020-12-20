const API_URL = Cypress.env('API_URL');

Cypress.Commands.add('login', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/auth/login', body });
});

Cypress.Commands.add('logout', () => {
  cy.request({ method: 'POST', url: API_URL + '/api/auth/logout' });
});

declare namespace Cypress {
  interface Chainable {
    login(creds: { email: string; password: string }): Chainable<void>;
    logout(): Chainable<void>;
  }
}
