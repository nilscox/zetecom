import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I read {string}', (text: string) => {
  cy.contains(text).should('be.visible');
});

Then('I don\'t read {string}', (text: string) => {
  cy.contains(text).should('not.be.visible');
});

Then('I see an element matching selector {string}', (selector: string) => {
  cy.get(selector).should('be.visible');
});

Then('I don\'t see an element matching selector {string}', (selector: string) => {
  cy.get(selector).should('not.be.visible');
});

Then('I see an element matching selector {string} with text {string}', (selector: string, text: string) => {
  cy.contains(selector, text).should('be.visible');
});

Then('I don\'t see an element matching selector {string} with text {string}', (selector: string, text: string) => {
  cy.contains(selector, text).should('not.be.visible');
});

When('I click on {string}', (text: string) => {
  cy.contains(text).click();
});

When('I force click on {string}', (text: string) => {
  cy.contains(text).click({ force: true });
});

Then('I see a {word} with placeholder {string}', (elem: string, placeholder: string) => {
  cy.get(`${elem}[placeholder="${placeholder}"]`).should('be.visible');
});

Then('I don\'t see a {word} with placeholder {string}', (elem: string, placeholder: string) => {
  cy.get(`${elem}[placeholder="${placeholder}"]`).should('not.be.visible');
});

Then('I see a {word} with value {string}', (elem: string, value: string) => {
  cy.get(`${elem}[value="${value}"]`).should('be.visible');
});

Then('I see a {word} with label {string}', (elem: string, text: string) => {
  cy.contains(elem, text).should('be.visible');
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

Then('the button with label {string} is disabled', (label: string) => {
  cy.contains('button', label).should('have.attr', 'disabled');
});

Then('the button with label {string} is not disabled', (label: string) => {
  cy.contains('button', label).should('not.have.attr', 'disabled');
});
