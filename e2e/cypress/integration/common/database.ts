import { Given } from 'cypress-cucumber-preprocessor/steps';

const {
  RESTOREDB_URL = 'http://localhost:4242',
} = process.env;

Given('the database is empty', () => {
  cy.request({ method: 'POST', url: RESTOREDB_URL })
    .then(res => res.body)
    .should('have.property', 'error', null);
});
