import users from '../../fixtures/users.json';

const [admin] = users;

const API_URL = Cypress.env('API_URL');

Cypress.Commands.add('createRulesUpdateNotification', (version) => {
  cy.login(admin);
  cy.request({ method: 'POST', url: API_URL + '/api/notification/rules-update', body: { version } });
  cy.logout();
});

Cypress.Commands.add('getNotifications', () => {
  cy.request({ method: 'GET', url: API_URL + '/api/notification/me' });
});

Cypress.Commands.add('getNotificationsCount', () => {
  cy.getNotifications().then(({ body: { total } }) => total);
});

Cypress.Commands.add('countNotifications', (count) => {
  cy.get('.notification').should('have.length', count);
});

declare global {
  namespace Cypress {
    interface Chainable {
      createRulesUpdateNotification(version: string): Chainable<void>;
      getNotifications(): Chainable<{ body: { total: number } }>;
      getNotificationsCount(): Chainable<number>;
      countNotifications(count: number): Chainable<void>;
    }
  }
}
