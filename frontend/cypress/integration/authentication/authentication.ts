import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I open the popup', () => {
  cy.visit('/popup');
});

Then('I see the popup header', () => {
  cy.dataE2e('popup-header').should('exist');
  cy.dataE2e('popup-header').contains('Connexion');
  cy.dataE2e('popup-header').contains('Inscription');
});

When('I accept the rules', () => {
  cy.contains('J\'accepte la charte de CDV.').siblings('input[type="checkbox"]').first().click();
});

When(
  'I submit the signup form with values {string}, {string} and {string}',
  (email: string, password: string, nick: string) => {
    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Mot de passe"]').type(password);
    cy.get('[placeholder="Pseudo"]').type(nick);
    cy.contains('J\'accepte la charte de CDV.').siblings('input[type="checkbox"]').first().click();
    cy.contains('button', 'Inscription').click();
  });

When(
  'I submit the login form with values {string} and {string}',
  (email: string, password: string) => {
    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Mot de passe"]').type(password);
    cy.contains('button', 'Connexion').click();
  });
