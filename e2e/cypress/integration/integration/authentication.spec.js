describe('authentication', () => {

  it('signup', () => {
    cy.resetdb();

    cy.visitPopup();

    cy.contains('Inscription').click();
    cy.get('input[placeholder="Email"]').type('user@domain.tld');
    cy.get('input[placeholder="Mot de passe"]').type('secure p4ssword');
    cy.get('input[placeholder="Pseudo"]').type('User');
    cy.contains('J\'accepte la charte.').siblings('input[type="checkbox"]').first().click();
    cy.get('button[type="submit"]').contains('Inscription').click();
    cy.contains('un email vous a été envoyé à user@domain.tld.');

    cy.visitPopup();

    cy.contains('User');
    cy.contains('Email: user@domain.tld');
    cy.get('button[type="submit"]').contains('Déconnexion');
  });

  it('login', () => {
    cy.populatedb();

    cy.visitPopup();

    cy.get('input[placeholder="Email"]').type('user1@domain.tld');
    cy.get('input[placeholder="Mot de passe"]').type('secure p4ssword');
    cy.get('button[type="submit"]').contains('Connexion').click();

    cy.contains('user1');
    cy.contains('Email: user1@domain.tld');

    cy.get('button[type="submit"]').contains('Déconnexion');
    cy.visitPopup();
    cy.get('button[type="submit"]').contains('Déconnexion');
  });

  it('logout', () => {
    cy.populatedb();
    cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });

    cy.visitPopup();

    cy.get('button[type="submit"]').contains('Déconnexion').click();

    cy.contains('Connexion');
    cy.visitPopup();
    cy.contains('Connexion');
  });

});