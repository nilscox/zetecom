const API_URL = Cypress.env('API_URL');

Cypress.Commands.add('postComment', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/comment', body });
});

Cypress.Commands.add('getCommentId', (idx) => {
  cy.getCommentAt(idx).within(() => {
    cy.contains('#').then((elem) => {
      const match = elem.text().match(/^#(\d+) -/);
      return Number(match[1]);
    });
  });
});

Cypress.Commands.add('getComments', () => cy.get('.comment'));

Cypress.Commands.add('getComment', (id) => cy.get(`#comment-${id}`));

Cypress.Commands.add('getCommentAt', (place) => cy.getComments().eq(place));

Cypress.Commands.add('countComments', (expected) => cy.getComments().should('have.length', expected));
