describe('pagination', () => {

  it('should display the comments', () => {
    cy.resetdb();
    cy.populatedbFromFixture('pagination.json');

    cy.visitIntegration('test:news1');

    cy.get('[role="Numéro de page"]').contains('1 / 2');
    cy.countComments(10);
    cy.getComment(1).should('not.exist');
    cy.getCommentAt(0).should('have.id', 'comment-11');
    cy.getCommentAt(9).should('have.id', 'comment-2');

    cy.get('[title="Page suivante"]').click();

    cy.get('[role="Numéro de page"]').contains('2 / 2');
    cy.countComments(1);
    cy.getCommentAt(0).should('have.id', 'comment-1');

    cy.get('[title="Page précédente"]').click();
    cy.get('[role="Numéro de page"]').contains('1 / 2');
    cy.get('[title="Dernière page"]').click();
    cy.get('[role="Numéro de page"]').contains('2 / 2');
    cy.get('[title="Première page"]').click();
    cy.get('[role="Numéro de page"]').contains('1 / 2');
  });

  it('should display the comments ordered by creation date (ascending)', () => {
    cy.resetdb();
    cy.populatedbFromFixture('pagination.json');

    cy.visitIntegration('test:news1');

    cy.get('[title=Tri]').click();
    cy.contains('Les plus anciens en premier').click();

    cy.countComments(10);
    cy.getComment(11).should('not.exist');
    cy.getCommentAt(0).should('have.id', 'comment-1');
  });

  it('should display the comments ordered by relevance', () => {
    cy.resetdb();
    cy.populatedbFromFixture('sort-relevance.json');

    cy.visitIntegration('test:news1');

    cy.get('[title=Tri]').click();
    cy.contains('Les plus pertinents en premier').click();

    // cy.wait(500);

    cy.getCommentAt(0).should('contain', 'score = 4');
    cy.getCommentAt(1).should('contain', 'score = 3');
    cy.getCommentAt(2).should('contain', 'score = 2');
    cy.getCommentAt(3).should('contain', 'score = 0');
  });

  it('should filter the comments with a search query', () => {
    cy.resetdb();
    cy.populatedbFromFixture('search.json');

    cy.visitIntegration('test:news1');

    cy.get('input[name="search"]').type('1');

    cy.countComments(4);

    for (const id of [1, 2, 3, 5])
      cy.getComment(id).should('exist');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('1.1');

    cy.countComments(2);

    for (const id of [2, 3])
      cy.getComment(id).should('exist');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('3');

    cy.countComments(1);
    cy.getComment(6).should('exist');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('0');

    cy.contains('Aucun résultat ne correspond à cette recherche');
  });

  it('should display paginated replies', () => {
    cy.resetdb();
    cy.populatedbFromFixture('paginated-replies.json');

    cy.visitIntegration('test:news1');

    cy.getComment(1).contains('11 réponses').click();

    cy.get('#comment-1').within(() => {
      cy.countComments(10);
      cy.contains('1 commentaire restant').click();
      cy.countComments(11);
      cy.contains('0 commentaire restant').should('not.exist');
    });
  });

});
