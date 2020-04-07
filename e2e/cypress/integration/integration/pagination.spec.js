describe('pagination', () => {

  it('should paginate reaction in default filter', () => {
    cy.resetdb();
    cy.populatedbFromFixture('pagination.json');

    cy.visitIntegration('https://news.fake/article/1');

    cy.get('#reaction-2').contains('reaction 2 text');
    cy.get('#reaction-3').contains('reaction 3 text');
    cy.get('#reaction-4').contains('reaction 4 text');
    cy.get('#reaction-5').contains('reaction 5 text');
    cy.get('#reaction-6').contains('reaction 6 text');
    cy.get('#reaction-7').contains('reaction 7 text');
    cy.get('#reaction-8').contains('reaction 8 text');
    cy.get('#reaction-9').contains('reaction 9 text');
    cy.get('#reaction-10').contains('reaction 10 text');
    cy.get('#reaction-11').contains('reaction 11 text');
    cy.get('#reaction-1').should('not.exist');
    cy.get('[data-e2e="pagination"]').contains('1 / 2');

    cy.get('[title="Page suivante"]').click();
    cy.get('#reaction-1').contains('reaction 1 text');
    cy.get('[data-e2e="pagination"]').contains('2 / 2');

    cy.get('[title="Page précédente"]').click();
    cy.get('[data-e2e="pagination"]').contains('1 / 2');

    cy.get('[title="Dernière page"]').click();
    cy.get('[data-e2e="pagination"]').contains('2 / 2');

    cy.get('[title="Première page"]').click();
    cy.get('[data-e2e="pagination"]').contains('1 / 2');
  });

});
