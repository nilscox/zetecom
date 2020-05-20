// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const API_URL = Cypress.env('API_URL');
const RESTOREDB_URL = Cypress.env('RESTOREDB_URL');
const APP_URL = Cypress.env('APP_URL');

const RESETDB_URL = RESTOREDB_URL + '/reset';
const POPULATEDB_URL = RESTOREDB_URL + '/populate';

Cypress.Commands.add('resetdb', () => {
  cy.request({ method: 'POST', url: RESETDB_URL });
});

Cypress.Commands.add('populatedb', (data) => {
  cy.request({ method: 'POST', url: POPULATEDB_URL, body: data });
});

Cypress.Commands.add('populatedbFromFixture', (fixtureName) => {
  return cy.fixture(fixtureName)
    .then((data) => cy.populatedb(data));
});

Cypress.Commands.add('login', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/auth/login', body });
});

Cypress.Commands.add('visitPopup', () => {
  cy.visit(APP_URL + '/popup');
});

Cypress.Commands.add('visitIntegration', (identifier) => {
  cy.visit(APP_URL + '/integration?identifier=' + encodeURIComponent(identifier));
});

Cypress.Commands.add('visitHistory', (reactionId) => {
  cy.visit(APP_URL + '/integration/reaction/' + reactionId + '/history');
});

Cypress.Commands.add('visitReport', (reactionId) => {
  cy.visit(APP_URL + '/integration/reaction/' + reactionId + '/report');
});

Cypress.Commands.add('getReactions', () => cy.get('.reaction'));

Cypress.Commands.add('getReaction', (id) => cy.get(`#reaction-${id}`));

Cypress.Commands.add('getReactionAt', (place) => cy.getReactions().eq(place));

Cypress.Commands.add('countReactions', (expected) => cy.getReactions().should('have.length', expected));

Cypress.Commands.add('websiteScreenshot', (name, scroll = 1) => {
  cy.wait(500);
  cy.scrollTo(0, scroll);
  cy.screenshot(name, {
    clip: {
      x: 16,
      y: scroll,
      width: 640,
      height: 480,
    },
  });
});
