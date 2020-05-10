describe('update password', () => {
  it('should successfuly update password', () => {
    const data = {
      users: [
        { nick: 'user1', email: 'user1@domain.tld', password: 'secure p4ssword' },
      ],
      informations: [],
    };

    cy.resetdb();
    cy.populatedb(data);
    cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });

    cy.visitPopup();

    cy.contains('Changer de mot de passe').click();

    cy.get('input[name="password"]').type('sec');
    cy.get('form').submit();

    cy.contains('Ce mot de passe est trop court.').should('exist');

    cy.get('input[name="password"]').clear().type('n3w p4ssword');
    cy.get('form').submit();

    cy.contains('Changer de mot de passe').should('be.visible');

    cy.contains('Déconnexion').click();

    cy.get('input[name="email"]').type('user1@domain.tld');
    cy.get('input[name="password"]').type('secure p4ssword');
    cy.get('button[type="submit"]').contains('Connexion').click();

    cy.contains('Combinaison email / mot de passe non valide');

    cy.get('input[name="password"]').clear().type('n3w p4ssword');
    cy.get('button[type="submit"]').contains('Connexion').click();

    cy.contains('Déconnexion');
  });

});
