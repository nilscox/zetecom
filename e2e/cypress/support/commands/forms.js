Cypress.Commands.add('getInput', (name) => {
  return cy.get(`input[name="${name}"]`);
});

Cypress.Commands.add('getField', (placeholder) => cy.get(`[placeholder="${placeholder}"]`));
