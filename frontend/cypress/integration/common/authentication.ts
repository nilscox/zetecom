import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('my login session is preserved across tests', () => {
  Cypress.Cookies.preserveOnce('connect.sid');
});

Given('I am logged in', () => {
  cy.request({ url: 'http://localhost:3000/api/auth/me', failOnStatusCode: false })
    .then((res) => {
      if (res.status === 403) {
        return cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/auth/login',
          body: {
            email: 'email@domain.tld',
            password: 'secure p4ssword',
          },
          failOnStatusCode: false,
        });
      }
    })
    .then((res) => {
      if (res.status === 401) {
        return cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/auth/signup',
          body: {
            email: 'email@domain.tld',
            password: 'secure p4ssword',
            nick: 'someone',
          },
        });
      }
    });
});

Given('I am logged out', () => {
  cy.clearCookie('connect.sid');
});
