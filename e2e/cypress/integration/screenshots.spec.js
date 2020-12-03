// document.querySelector('iframe').contentWindow.scrollY

describe.skip('website screenshots', () => {
  beforeEach(() => {
    cy.viewport(660, 490);
  });

  it('search', () => {
    cy.seedFromFixture('screenshot/search.json');

    cy.visitIntegration('id:1');

    cy.get('input[name="search"]').type('NoFakeScience');

    cy.getComment(1).contains('NoFakeScience');

    cy.blurContent();

    cy.get('.markdown-github .highlighted').invoke('css', 'color', 'initial');
    cy.get('.markdown-github .highlighted').invoke('css', 'font-weight', 'normal');
    cy.get('.markdown-github .highlighted').invoke('css', 'letter-spacing', 'initial');
    cy.get('.markdown-github .highlighted').invoke('css', 'text-shadow', 'none');

    cy.websiteScreenshot('search');
  });

  it('nested replies', () => {
    cy.seedFromFixture('screenshot/nested-replies.json');

    cy.login({ email: 'nils@nils.cx', password: 'secure p4ssword' });
    cy.visitIntegration('id:1');

    cy.getComment(1).contains('2 réponses').click();
    cy.getComment(2).contains('5 réponse').click();

    cy.wait(1000);
    cy.blurContent();
    cy.websiteScreenshot('nested-replies', { y: 425 });
  });

  it('sort relevance', () => {
    cy.seedFromFixture('screenshot/sort-relevance.json');
    cy.login({ email: 'user03@domain.tld', password: 'secure p4ssword' });

    cy.visitIntegration('id:1');

    cy.websiteScreenshot('sort-relevance', { y: 420 });
  });

  it('subscription', () => {
    cy.seedFromFixture('screenshot/subscription.json');
    cy.login({ email: 'user03@domain.tld', password: 'secure p4ssword' });

    cy.visitIntegration('id:1');

    cy.getComment(2).contains('1 réponse').click();

    cy.websiteScreenshot('subscription', { y: 400 });
  });

  it('format', () => {
    cy.seedFromFixture('screenshot/format.json');
    cy.login({ email: 'user01@domain.tld', password: 'secure p4ssword' });

    cy.visitIntegration('id:1');

    cy.getComment(2).contains('1 réponse').click();
  });
});
