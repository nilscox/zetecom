describe('reactions', () => {

  it('should display fallback message if comment zone is not enable', () => {
    cy.resetdb();
    cy.visitIntegration('https://news.fake/article/1');

    cy.contains('L\'espace de commentaires n\'est pas activé sur cette page.');
  });

  it('should display no reaction message', () => {
    cy.populatedb();
    cy.visitIntegration('https://news.fake/article/2');

    cy.contains('Aucune réaction n\'a été publiée pour le moment.');
  });

  it('should list reactions', () => {
    cy.populatedb();
    cy.visitIntegration('https://news.fake/article/1');

    cy.get('#reaction-1').contains('reaction 1 text');
    cy.get('#reaction-1').contains('user2');
    cy.get('#reaction-1').find('img[src="/assets/images/default-avatar.png"]');

    cy.get('#reaction-2').contains('reaction 2 text');
    cy.get('#reaction-2').find('[title="Édité"]');
    cy.get('[data-e2e="qr-approve"]').contains('1');
  });

  it('should view replies', () => {
    cy.populatedb();
    cy.visitIntegration('https://news.fake/article/1');

    cy.get('#reaction-1').contains('reaction 1 text');
    cy.get('#reaction-1').contains('2 réponses').click();

    cy.contains('reaction 1.1 text');
    cy.contains('reaction 1.2 text');

    cy.get('#reaction-3').contains('1 réponse').click();

    cy.contains('reaction 1.2.1 text');

    cy.get('#reaction-1').contains('2 réponses').click();

    cy.get('#reaction-3').should('not.be.visible');
    cy.get('#reaction-4').should('not.be.visible');
    cy.get('#reaction-5').should('not.be.visible');
  });

});
