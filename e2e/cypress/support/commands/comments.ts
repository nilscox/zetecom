const API_URL = Cypress.env('API_URL');

Cypress.Commands.add('postComment', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/comment', body });
});

Cypress.Commands.add('getComments', () => cy.get('.comment'));

Cypress.Commands.add('getComment', (id) => cy.get(`#comment-${id}`));

Cypress.Commands.add('getCommentAt', (place) => cy.getComments().eq(place));

Cypress.Commands.add('countComments', (expected) => cy.getComments().should('have.length', expected));

declare namespace Cypress {
  interface Chainable {
    postComment(body: any): Chainable<Element[]>;
    getComments(): Chainable<Element>;
    getComment(id: number): Chainable<Element>;
    getCommentAt(place: number): Chainable<Element>;
    countComments(expected: number): Chainable<void>;
  }
}
