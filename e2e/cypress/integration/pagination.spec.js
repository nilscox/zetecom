describe('pagination', () => {

  it('should display the reactions', () => {
    cy.resetdb();
    cy.populatedbFromFixture('pagination.json');

    cy.visitIntegration('test:news1');

    cy.get('[role="Numéro de page"]').contains('1 / 2');
    cy.countReactions(10);
    cy.getReaction(1).should('not.exist');
    cy.getReactionAt(0).should('have.id', 'reaction-11');
    cy.getReactionAt(9).should('have.id', 'reaction-2');

    cy.get('[title="Page suivante"]').click();

    cy.get('[role="Numéro de page"]').contains('2 / 2');
    cy.countReactions(1);
    cy.getReactionAt(0).should('have.id', 'reaction-1');

    cy.get('[title="Page précédente"]').click();
    cy.get('[role="Numéro de page"]').contains('1 / 2');
    cy.get('[title="Dernière page"]').click();
    cy.get('[role="Numéro de page"]').contains('2 / 2');
    cy.get('[title="Première page"]').click();
    cy.get('[role="Numéro de page"]').contains('1 / 2');
  });

  it('should display the reactions ordered by creation date (ascending)', () => {
    cy.resetdb();
    cy.populatedbFromFixture('pagination.json');

    cy.visitIntegration('test:news1');

    cy.get('[title=Tri]').click();
    cy.contains('[FAIL]').click();

    cy.countReactions(10);
    cy.getReaction(11).should('not.exist');
    cy.getReactionAt(0).should('have.id', 'reaction-1');
  });

  it('should display the reactions ordered by relevance', () => {
    cy.resetdb();
    cy.populatedbFromFixture('sort-relevance.json');

    cy.visitIntegration('test:news1');

    cy.get('[title=Tri]').click();
    cy.contains('Les plus pertinents en premier').click();

    cy.getReactionAt(0).should('contain', 'score = 4');
    cy.getReactionAt(1).should('contain', 'score = 3');
    cy.getReactionAt(2).should('contain', 'score = 2');
    cy.getReactionAt(3).should('contain', 'score = 0');
  });

  it('should filter the reactions with a search query', () => {
    cy.resetdb();
    cy.populatedbFromFixture('search.json');

    cy.visitIntegration('test:news1');

    cy.get('input[name="search"]').type('1');

    cy.countReactions(4);

    for (const id of [1, 2, 3, 5])
      cy.getReaction(id).should('exist');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('1.1');

    cy.countReactions(2);

    for (const id of [2, 3])
      cy.getReaction(id).should('exist');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('3');

    cy.countReactions(1);
    cy.getReaction(6).should('exist');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('0');

    cy.contains('Aucun résultat ne correspond à cette recherche');
  });

  it('should display paginated replies', () => {
    cy.resetdb();
    cy.populatedbFromFixture('paginated-replies.json');

    cy.visitIntegration('test:news1');

    cy.getReaction(1).contains('11 réponses').click();

    cy.get('#reaction-1').within(() => {
      cy.countReactions(10);
      cy.contains('1 réaction restante').click();
      cy.countReactions(11);
      cy.contains('0 réaction restante').should('not.exist');
    });
  });

});
