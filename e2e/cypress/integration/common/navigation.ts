import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I open the popup', () => {
  Cypress.config('baseUrl', Cypress.env('EXTENSION_URL'));
  cy.visit('/popup');
});

When('I open the website', () => {
  Cypress.config('baseUrl', Cypress.env('WEBSITE_URL'));
  cy.visit('/');
});

When('I navigate to {word}', (url: string) => {
  cy.visit(url);
});

Then('the browser navigates to {word}', (path: string) => {
  cy.location('pathname').should('eq', path);
});

Then('the browser url matches {word}', (regexp: string) => {
  cy.location('href').should('match', new RegExp(regexp));
});
