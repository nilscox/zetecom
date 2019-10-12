import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I see the header', () => {
  cy.dataE2e('header').contains('h1', 'Réagir à l\'information');
  cy.dataE2e('header').contains('Décryptons les médias !');
});

Then('I see the navigation', () => {
  cy.dataE2e('navigation', 'nav').should('exist');
});

Then('I see the main section', () => {
  cy.get('main').should('exist');
});

Then('I am on the {word} page', (page: string) => {
  cy.dataE2e('page-' + page).should('exist');
});

Then('the active navigation link is {string}', (link: string) => {
  cy.dataE2e('navigation').contains(link).should('have.class', 'active');
});

When('I click on the {string} navigation link', (link: string) => {
  cy.dataE2e('navigation').contains(link).click();
});
