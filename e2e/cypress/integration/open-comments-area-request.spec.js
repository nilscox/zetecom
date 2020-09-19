const user1 = { nick: 'user1', email: 'user1@domain.tld', password: 'secure p4ssword' };

describe('open comments area request', () => {

  it('should not request to open a new comments area when unauthenticated', () => {
    cy.resetdb();
    cy.visitIntegration('test:news1');

    cy.contains('L\'espace de commentaires n\'est pas ouvert sur cette page.').should('be.visible');
    cy.contains('Connectez-vous pour demander l\'ouverture d\'une nouvelle zone de commentaire.')
  });

  it('should request to open a new comments area', () => {
    const data = { users: [user1], commentsAreas: [] };

    cy.resetdb();
    cy.populatedb(data);
    cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
    cy.visitIntegration('test:news1');

    cy.contains('L\'espace de commentaires n\'est pas ouvert sur cette page.').should('be.visible');
    cy.contains('Demander l\'ouverture').click();
    cy.contains('L\'ouverture a bien été prise en compte !')
  });

});
