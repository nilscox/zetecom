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
const APP_URL = Cypress.env('APP_URL');
const API_SEED_URL = Cypress.env('API_SEED_URL');

Cypress.Commands.add('getInput', (name) => {
  return cy.get(`input[name="${name}"]`);
});

Cypress.Commands.add('seed', (body) => {
  cy.request({ method: 'POST', url: API_SEED_URL + '/seed', body }).then(({ status }) => expect(status).to.eq(204));
});

Cypress.Commands.add('seedFromFixture', (fixtureName) => {
  return cy.fixture(fixtureName).then((data) => cy.seed(data));
});

Cypress.Commands.add('login', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/auth/login', body });
});

Cypress.Commands.add('logout', () => {
  cy.request({ method: 'POST', url: API_URL + '/api/auth/logout' });
});

Cypress.Commands.add('postComment', (body) => {
  cy.request({ method: 'POST', url: API_URL + '/api/comment', body });
});

Cypress.Commands.add('getNotifications', () => {
  cy.request({ method: 'GET', url: API_URL + '/api/notification/me' });
});

Cypress.Commands.add('getNotificationsCount', () => {
  cy.getNotifications().then(({ body: { total } }) => total);
});

Cypress.Commands.add('getCommentId', (idx) => {
  cy.getCommentAt(idx).within(() => {
    cy.contains('#').then((elem) => {
      const match = elem.text().match(/^#(\d+) -/);
      return Number(match[1]);
    });
  });
});

Cypress.Commands.add('visitPopup', (url = '') => {
  cy.viewport(380, 550);
  cy.visit(APP_URL + '/popup' + url);
});

Cypress.Commands.add('visitIntegration', (identifier) => {
  cy.visit(APP_URL + '/integration?identifier=' + encodeURIComponent(identifier));
});

Cypress.Commands.add('visitHistory', (commentId) => {
  cy.visit(APP_URL + '/integration/comment/' + commentId + '/history');
});

Cypress.Commands.add('visitReport', (commentId) => {
  cy.visit(APP_URL + '/integration/comment/' + commentId + '/report');
});

Cypress.Commands.add('visitApp', (route) => {
  cy.visit(APP_URL + route);
});

Cypress.Commands.add('getComments', () => cy.get('.comment'));

Cypress.Commands.add('getComment', (id) => cy.get(`#comment-${id}`));

Cypress.Commands.add('getCommentAt', (place) => cy.getComments().eq(place));

Cypress.Commands.add('countComments', (expected) => cy.getComments().should('have.length', expected));

Cypress.Commands.add('zetecom', () => cy.window().then((win) => win.zetecom));

Cypress.Commands.add('fixCI', () => {
  cy.wait(500);
});

Cypress.Commands.add('didTrack', (event) => {
  cy.fixCI();

  return cy
    .zetecom()
    .then((zc) => zc.tracking.events)
    .then((events) => {
      const found = events.find((other) => {
        return ['category', 'action', 'name'].every((prop) => event[prop] === other[prop]);
      });

      if (!found) {
        console.log('tracking events', events, JSON.stringify(events));
        console.log('expected', event);

        // not working
        // cy.log('tracking events', events);
        // cy.log('expected', event);
      }

      expect(found, 'event was not tracked').not.to.be.undefined;
    });
});

Cypress.Commands.add('blurContent', () => {
  cy.get('.markdown-github').invoke('css', 'color', 'transparent');
  cy.get('.markdown-github').invoke('css', 'font-weight', 'bold');
  cy.get('.markdown-github').invoke('css', 'letter-spacing', '-1');
  cy.get('.markdown-github').invoke('css', 'text-shadow', '0 0 5px rgba(0,0,0,0.5)');
});

Cypress.Commands.add('websiteScreenshot', (name, { x = 0, y = 1 } = {}) => {
  cy.fixCI();

  cy.scrollTo(0, y);

  cy.screenshot(name, {
    clip: {
      x,
      y,
      width: 640,
      height: 480,
    },
  });
});
