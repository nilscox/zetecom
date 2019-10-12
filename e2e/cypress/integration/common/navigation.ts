import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I navigate to {word}', (url: string) => {
  cy.visit(url);
});

Then('the browser navigates to {word}', (path: string) => {
  cy.location('pathname').should('eq', path);
});
