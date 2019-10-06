import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('the database is empty', () => {
  cy.request({ method: 'POST', url: 'http://localhost:4242' })
    .then(res => res.body)
    .should('have.property', 'error', null);
});
