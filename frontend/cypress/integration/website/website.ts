import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('I see the header', () => {
  cy.dataE2e('header').contains('h1', 'Chercheurs de vérité');
  cy.dataE2e('header').contains('Décryptons l\'information !');
});

Then('I see the navigation', () => {
  cy.dataE2e('navigation', 'nav').should('exist');
});

Then('I see the main section', () => {
  cy.get('main').should('exist');
});
