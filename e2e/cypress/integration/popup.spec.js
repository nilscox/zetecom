describe('popup', () => {
  it('navigation', () => {
    cy.visitPopup();

    cy.url().should('eq', 'http://localhost:8000/popup/connexion');
    cy.contains('Connectez-vous sur Zétécom pour interagir avec le reste de la communauté.');
    cy.contains('Créer un compte');
    cy.contains('Mot de passe oublié');
    cy.contains('Connexion');

    cy.contains('Créer un compte').click();
    cy.url().should('eq', 'http://localhost:8000/popup/inscription');
    cy.contains('Créez votre compte sur Zétécom.');
    cy.contains('Connexion');
    cy.contains('Mot de passe oublié');
    cy.contains('Inscription');

    cy.contains('Mot de passe oublié').click();
    cy.url().should('eq', 'http://localhost:8000/popup/connexion-par-email');
    cy.contains('Identifiez-vous sur Zétécom via un email contenant un lien de connexion sans mot de passe.');
    cy.contains('Connexion');
    cy.contains('Mot de passe oublié');
    cy.contains('Envoyer');
  });

  it('signup', () => {
    cy.resetdb();
    cy.visitPopup();

    cy.contains('Créer un compte').click();

    cy.getInput('email').type('user@domain.tld');
    cy.getInput('password').type('p4ssword');
    cy.getInput('nick').type('User');

    cy.get('#accept-rules-checkbox').click();
    cy.get('#accept-rules-checkbox').should('not.be.checked');
    cy.contains('La charte est composée de quelques règles simples. Accordez 5 minutes à sa lecture avant de vous inscrire.');

    cy.get('#accept-rules-checkbox').click();
    cy.get('#accept-rules-checkbox').should('be.checked');

    cy.contains('Inscription').click();
    cy.url().should('eq', 'http://localhost:8000/popup');
    cy.contains('Bienvenue ! 🎉');
    cy.didTrack({ category: 'Authentication', action: 'Signup', label: 'Signup from popup' });

    cy.reload();
    cy.url().should('eq', 'http://localhost:8000/popup');

    cy.contains('User');
    cy.contains('Email : user@domain.tld');

  });

  it('logout', () => {
    cy.login({ email: 'user@domain.tld', password: 'p4ssword' });
    cy.visitPopup();

    cy.contains('Déconnexion').click();
    cy.url().should('eq', 'http://localhost:8000/popup/connexion');

    cy.reload();
    cy.url().should('eq', 'http://localhost:8000/popup/connexion');
  });

  it('login', () => {
    cy.visitPopup();

    cy.getInput('email').type('user@domain.tld');
    cy.getInput('password').type('passw0rd');
    cy.contains('Connexion').click();

    cy.contains('Combinaison email / mot de passe non valide');
    cy.didTrack({ category: 'Authentication', action: 'LoginFailed', label: 'Login failed from popup' });

    cy.getInput('password').clear();
    cy.getInput('password').type('p4ssword');

    cy.contains('Connexion').click();
    cy.url().should('eq', 'http://localhost:8000/popup');
    cy.didTrack({ category: 'Authentication', action: 'Login', label: 'Login from popup' });

    cy.reload();
    cy.url().should('eq', 'http://localhost:8000/popup');
  });

  it('change password', () => {
    cy.login({ email: 'user@domain.tld', password: 'p4ssword' });
    cy.visitPopup();

    cy.contains('Changer de mot de passe').click();

    cy.getInput('password').type('pwd');
    cy.get('form').submit();
    cy.contains('Ce mot de passe est trop court.');

    cy.getInput('password').clear().type('such wow!');
    cy.get('form').submit();

    cy.didTrack({ category: 'Authentication', action: 'ChangePassword' });
    cy.contains('Votre mot de passe a bien été mis à jour !');
    cy.contains('Changer de mot de passe');

    cy.contains('Déconnexion').click();

    cy.getInput('email').type('user@domain.tld');
    cy.getInput('password').type('p4ssword');
    cy.contains('Connexion').click();
    cy.contains('Combinaison email / mot de passe non valide');

    cy.getInput('password').clear().type('such wow!');
    cy.contains('Connexion').click();
    cy.contains('Déconnexion').click();
  });

  it('ask email login', () => {
    cy.visitPopup();

    cy.contains('Mot de passe oublié').click();
    cy.url().should('eq', 'http://localhost:8000/popup/connexion-par-email');

    cy.get('input[name="email"]').type('user@domain.tld');
    cy.contains('Envoyer').click();

    cy.contains('Si un compte est associé à l\'adresse user@domain.tld, l\'email de connexion a bien été envoyé.');
    cy.didTrack({ category: 'Authentication', action: 'AskEmailLogin' });
  });

  it('signup conflicts', () => {
    cy.visitPopup();

    cy.contains('Créer un compte').click();

    cy.getInput('email').clear();
    cy.getInput('email').type('user@domain.tld');
    cy.getInput('password').type('p4ssword');
    cy.getInput('nick').type('User1');

    cy.get('#accept-rules-checkbox').click();
    cy.get('#accept-rules-checkbox').click();

    cy.contains('Inscription').click();
    cy.contains('Cette adresse email est déjà utilisée.');

    cy.getInput('email').clear();
    cy.getInput('email').type('user1@domain.tld');
    cy.getInput('nick').clear();
    cy.getInput('nick').type('User');

    cy.contains('Inscription').click();
    cy.contains('Ce pseudo est déjà utilisé.');
  });

});
