describe.skip('website screenshots', () => {
  beforeEach(() => {
    cy.viewport(640 + 2 * 16, 480);
  });

  it('search', () => {
    cy.resetdb();
    cy.populatedbFromFixture('screenshot/search.json');

    cy.visitIntegration('https://news.fake/article/1');

    cy.get('input[name="search"]').type('NoFakeScience');

    cy.getComment(1).contains('nofakescience');

    cy.websiteScreenshot('search');
  });

  it('nested replies', () => {
    cy.resetdb();
    cy.populatedbFromFixture('screenshot/nested-replies.json');

    cy.visitIntegration('https://news.fake/article/1');

    cy.getComment(1).contains('2 réponses').click();
    cy.getComment(2).contains('1 réponse').click();

    cy.websiteScreenshot('nested-replies', 380);
  });

  it('sort relevance', () => {
    cy.resetdb();
    cy.populatedbFromFixture('screenshot/sort-relevance.json');

    cy.visitIntegration('https://news.fake/article/1');

    cy.websiteScreenshot('sort-relevance', 120);
  });

  it('subscription', () => {
    cy.resetdb();
    cy.populatedbFromFixture('screenshot/subscription.json');
    cy.login({ email: 'user03@domain.tld', password: 'secure p4ssword' });

    cy.visitIntegration('https://news.fake/article/1');

    cy.getComment(2).contains('1 réponse').click();
    cy.getComment(2).within(() => cy.get('[title="S\'abonner"]').click());

    cy.websiteScreenshot('subscription', 260);
  });

  it('format', () => {
    cy.resetdb();
    cy.populatedbFromFixture('screenshot/format.json');
    cy.login({ email: 'user01@domain.tld', password: 'secure p4ssword' });

    cy.visitIntegration('https://news.fake/article/1');

    cy.getComment(2).contains('1 réponse').click();

    cy.websiteScreenshot('format', 393);
  });
});
