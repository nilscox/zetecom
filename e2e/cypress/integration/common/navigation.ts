import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I navigate to {word}', (url: string) => {
  cy.visit(url);
});

Then('the browser navigates to {word}', (path: string) => {
  cy.location('pathname').should('eq', path);
});

Then('the browser url matches {word}', (regexp: string) => {
  cy.location('href').should('match', new RegExp(regexp));
});
