import { Given } from 'cypress-cucumber-preprocessor/steps';

const {
  API_URL = 'http://localhost:3000',
  RESETDB_URL = 'http://localhost:4242/reset',
  POPULATEDB_URL = 'http://localhost:4242/populate',
} = process.env || {};

Given('the database is empty', () => {
  cy.request({ method: 'POST', url: RESETDB_URL });
});

Given('the database is populated with data from {string}', (fixture: string) => {
  cy.fixture(fixture).then(body => {
    return cy.request({
      url: API_URL + '/api/information/by-url/' + encodeURIComponent(body.informations[0].url),
      failOnStatusCode: false,
    })
      .then(({ status }) => {
        if (status !== 200)
          return cy.request({ method: 'POST', url: POPULATEDB_URL, body });
      });
  });
});
