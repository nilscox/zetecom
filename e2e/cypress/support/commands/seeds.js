const API_URL = Cypress.env('API_URL');

Cypress.Commands.add('seed', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/seed', body }).then(({ status }) => expect(status).to.eq(204));
});

Cypress.Commands.add('seedFromFixture', (fixtureName) => {
  return cy.fixture(fixtureName).then((data) => cy.seed(data));
});
