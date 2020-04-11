describe('pagination', () => {

  it('should paginate reactions with default filter', () => {
    cy.resetdb();
    cy.populatedbFromFixture('pagination.json');

    cy.visitIntegration('https://news.fake/article/1');

    cy.get('.reactions-list').children().should('have.length', 10);
    cy.get('.reactions-list').last().contains('reaction 2 text');
    cy.get('.reactions-list').children().eq(1).contains('reaction 10 text');
    cy.get('.reactions-list').children().eq(2).contains('reaction 9 text');
    cy.get('.reactions-list').children().eq(3).contains('reaction 8 text');
    cy.get('.reactions-list').children().eq(4).contains('reaction 7 text');
    cy.get('.reactions-list').children().eq(5).contains('reaction 6 text');
    cy.get('.reactions-list').children().eq(6).contains('reaction 5 text');
    cy.get('.reactions-list').children().eq(7).contains('reaction 4 text');
    cy.get('.reactions-list').children().eq(8).contains('reaction 3 text');
    cy.get('.reactions-list').first().contains('reaction 11 text');
    cy.get('#reaction-1').should('not.exist');
    cy.get('[role="Numéro de page"]').contains('1 / 2');

    cy.get('[title="Page suivante"]').click();
    cy.get('.reactions-list').children().should('have.length', 1);
    cy.get('#reaction-1').contains('reaction 1 text');
    cy.get('[role="Numéro de page"]').contains('2 / 2');

    cy.get('[title="Page précédente"]').click();
    cy.get('[role="Numéro de page"]').contains('1 / 2');

    cy.get('[title="Dernière page"]').click();
    cy.get('[role="Numéro de page"]').contains('2 / 2');

    cy.get('[title="Première page"]').click();
    cy.get('[role="Numéro de page"]').contains('1 / 2');
  });

  it('should paginate reactions asc ordered', () => {
    cy.resetdb();
    cy.populatedbFromFixture('pagination.json');

    cy.visitIntegration('https://news.fake/article/1');

    cy.get('[title=Tri]').click();
    cy.get('[data-e2e="date-asc"]').click();

    cy.get('.reactions-list').children().should('have.length', 10);
    cy.get('.reactions-list').first().contains('reaction 1 text');
    cy.get('.reactions-list').children().eq(1).contains('reaction 2 text');
    cy.get('.reactions-list').children().eq(2).contains('reaction 3 text');
    cy.get('.reactions-list').children().eq(3).contains('reaction 4 text');
    cy.get('.reactions-list').children().eq(4).contains('reaction 5 text');
    cy.get('.reactions-list').children().eq(5).contains('reaction 6 text');
    cy.get('.reactions-list').children().eq(6).contains('reaction 7 text');
    cy.get('.reactions-list').children().eq(7).contains('reaction 8 text');
    cy.get('.reactions-list').children().eq(8).contains('reaction 9 text');
    cy.get('.reactions-list').last().contains('reaction 10 text');
    cy.get('#reaction-11').should('not.exist');
    cy.get('[role="Numéro de page"]').contains('1 / 2');

    cy.get('[title="Page suivante"]').click();
    cy.get('.reactions-list').children().should('have.length', 1);
    cy.get('#reaction-11').contains('reaction 11 text');
    cy.get('[role="Numéro de page"]').contains('2 / 2');
  });

  it('should sort reaction by relevance', () => {
    cy.resetdb();
    cy.populatedbFromFixture('sort-relevance.json');

    cy.visitIntegration('https://news.fake/article/1');

    cy.get('[title=Tri]').click();
    cy.get('[data-e2e="relevance"]').click();

    cy.get('.reactions-list').first().contains('reaction 2 text');
    cy.get('.reactions-list').children().eq(1).contains('reaction 1 text');
    cy.get('.reactions-list').children().eq(2).contains('reaction 3 text');
    cy.get('.reactions-list').last().contains('reaction 4 text');
  });

  it('should display reaction according to search field', () => {
    cy.resetdb();
    cy.populatedbFromFixture('search.json');

    cy.visitIntegration('https://news.fake/article/1');

    cy.get('input[name="search"]').type('1');
    cy.wait(500); // wait for api response

    cy.get('.reactions-list').children().should('have.length', 4);
    cy.get('#reaction-1').contains('reaction 1 text');
    cy.get('#reaction-2').contains('reaction 1.1 text');
    cy.get('#reaction-3').contains('reaction 1.1.1 text');
    cy.get('#reaction-5').contains('reaction 2.1 text');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('1.1');
    cy.wait(500); // wait for api response

    cy.get('.reactions-list').children().should('have.length', 2);
    cy.get('#reaction-2').contains('reaction 1.1 text');
    cy.get('#reaction-3').contains('reaction 1.1.1 text');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('3');
    cy.wait(500); // wait for api response

    cy.get('.reactions-list').children().should('have.length', 1);
    cy.get('#reaction-6').contains('reaction 3 text');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('0');
    cy.wait(500); // wait for api response

    cy.contains('Aucun résultat ne correspond à cette recherche');
  });

});
