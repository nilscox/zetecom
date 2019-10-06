import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I read {string}', (text: string) => {
  cy.contains(text);
});

When('I click on the link with label {string}', (label: string) => {
  cy.contains('a', label).click();
});

Then('I see a link to {word} with label {string}', (path: string, label: string) => {
  cy.contains(`a[href="${path}"]`, label);
});

When('I click on the button with label {string}', (label: string) => {
  cy.contains('button', label).click();
});

Then('the button with label {string} should be disabled', (label: string) => {
  cy.contains('button', label).should('have.attr', 'disabled');
});

Then('the button with label {string} should not be disabled', (label: string) => {
  cy.contains('button', label).should('not.have.attr', 'disabled');
});
