const API_URL = Cypress.env('API_URL');

Cypress.Commands.add('requestCommentsArea', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/comments-area/request', body });
});

Cypress.Commands.add('createCommentsArea', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/comments-area', body });
});

Cypress.Commands.add('rejectCommentsAreaRequest', (requestId) => {
  cy.request({ method: 'POST', url: API_URL + `/api/comments-area/request/${requestId}/reject` });
});

Cypress.Commands.add('getCommentsAreas', () => cy.get('.comments-area'));

Cypress.Commands.add('getCommentsAreaAt', (place) => cy.getCommentsAreas().eq(place));

Cypress.Commands.add('countCommentsAreas', (expected) => cy.getCommentsAreas().should('have.length', expected));

declare namespace Cypress {
  interface Chainable {
    requestCommentsArea(body: any): Chainable<void>;
    createCommentsArea(body: any): Chainable<void>;
    rejectCommentsAreaRequest(requestId: number): Chainable<void>;
    getCommentsAreas(): Chainable<Element[]>;
    getCommentsAreaAt(place: number): Chainable<Element>;
    countCommentsAreas(expected: number): Chainable<void>;
  }
}
