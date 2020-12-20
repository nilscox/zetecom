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
