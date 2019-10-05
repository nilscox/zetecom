import { When } from 'cypress-cucumber-preprocessor/steps';

When('I navigate to {word}', (url: string) => {
  cy.visit(url);
});
