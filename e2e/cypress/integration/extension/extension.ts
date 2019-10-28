import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I open the integration on url {string}', (url: string) => {
  Cypress.config('baseUrl', Cypress.env('EXTENSION_URL'));
  cy.visit('/integration?url=' + url);
});

When('I open the subject {int} with the header link', (subjectId: number) => {
  cy.get(`.subject#subject-${subjectId} a > *`).click();
});

Then('the subject {word} is {string}', (part: string, text: string) => {
  cy.contains('.subject-' + part, text);
});

Then('the reaction form is empty', () => {
  cy.get('.reaction-form').should('be.visible');
  cy.get('.reaction-form textarea[placeholder="Composez votre message..."]').should('have.value', '');
  cy.contains('.reaction-form button', 'Envoyer').should('be.visible').and('be.disabled');
});
