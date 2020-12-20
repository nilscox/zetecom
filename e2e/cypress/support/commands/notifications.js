Cypress.Commands.add('getNotifications', () => {
  cy.request({ method: 'GET', url: API_URL + '/api/notification/me' });
});

Cypress.Commands.add('getNotificationsCount', () => {
  cy.getNotifications().then(({ body: { total } }) => total);
});
