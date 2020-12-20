Cypress.Commands.add('getCommentsAreas', () => cy.get('.comments-area'));

Cypress.Commands.add('getCommentsAreaAt', (place) => cy.getCommentsAreas().eq(place));

Cypress.Commands.add('countCommentsAreas', (expected) => cy.getCommentsAreas().should('have.length', expected));
