import { Then, When, Given } from 'cypress-cucumber-preprocessor/steps';
import { gzipSync } from 'zlib';

Given('I open the website', () => {
  Cypress.config('baseUrl', Cypress.env('WEBSITE_URL'));
  cy.visit('/');
});

Then('I see the header', () => {
  cy.get('.page-header').contains('h1', 'Réagir à l\'information');
  cy.get('.page-header').contains('Décryptons les médias !');
});

Then('I see the navigation', () => {
  cy.get('nav.navigation').should('exist');
});

Then('I see the main section', () => {
  cy.get('main').should('exist');
});

Then('I see the logo', () => {
  cy.get('img.logo').should('be.visible');
});

Then('I see extension download button', () => {
  cy.get('a.download-extension').should('be.visible');
  cy.get('a.download-extension').should('have.attr', 'href', 'http://CHROME_EXTENSION_URL');
});

Then('I am on the {word} page', (page: string) => {
  cy.get('.page#page-' + page).should('exist');
});

Then('the active navigation link is {string}', (link: string) => {
  cy.get('nav.navigation').contains(link).should('have.class', 'active');
});

When('I click on the {string} navigation link', (link: string) => {
  cy.get('nav.navigation').contains(link).click();
});

When('I see the banner', () => {
  cy.get('#new-name-banner').should('be.visible');
});

When('I don\'t see the banner', () => {
  cy.get('#new-name-banner').should('not.be.visible');
});

When('I close the banner', () => {
  cy.get('#new-name-banner .close').click();
});
