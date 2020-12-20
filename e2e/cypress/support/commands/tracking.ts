Cypress.Commands.add('zetecom', () => cy.window().then((win) => win.zetecom));

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

      expect(found, `event ${event.category} ${event.action} was not tracked`).not.to.be.undefined;
    });
});

declare namespace Cypress {
  interface Chainable {
    zetecom(): Chainable<{ tracking: { events: any } }>;
    didTrack(event: { category: string; action: string; name?: string }): Chainable<void>;
  }
}
