describe.skip('website screenshots', () => {
  beforeEach(() => {
    cy.viewport(640, 480);
  });

  it('search', () => {
    cy.seedFromFixture('screenshot/search.json');

    cy.visitIntegration('id:1');

    cy.get('input[name="search"]').type('NoFakeScience');

    cy.getComment(1).contains('nofakescience');

    cy.websiteScreenshot('search');
  });

  it('nested replies', () => {
    cy.seedFromFixture('screenshot/nested-replies.json');

    cy.visitIntegration('id:1');

    cy.getComment(1).contains('2 réponses').click();
    cy.getComment(2).contains('5 réponse').click();

    cy.websiteScreenshot('nested-replies', { y: 665 });
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

    cy.websiteScreenshot('format', { y: 570 });
  });
});
