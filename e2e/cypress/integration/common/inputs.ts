import { When } from 'cypress-cucumber-preprocessor/steps';

When('I type {string} in the {string} field', (text: string, placeholder: string) => {
  cy.get(`[placeholder="${placeholder}"]`).type(text);
});
