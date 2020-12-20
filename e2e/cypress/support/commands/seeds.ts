const API_URL = Cypress.env('API_URL');

Cypress.Commands.add('seed', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/seed', body }).then(({ status }) => expect(status).to.eq(204));
});

Cypress.Commands.add('seedFromFixture', (fixtureName) => {
  return cy.fixture(fixtureName).then((data) => cy.seed(data));
});

declare namespace Cypress {
  interface Chainable {
    seed(body: { users?: any[]; commentsAreas?: any[] }): Chainable<void>;
    seedFromFixture(fixtureName: string): Chainable<void>;
  }
}
