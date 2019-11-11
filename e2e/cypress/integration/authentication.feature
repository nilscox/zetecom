Feature: Authentication

  Background:
    Given I open the popup

  Scenario: Popup navigation
    Then I see the popup header
    When I click on the link with label "Inscription"
    Then the browser navigates to /popup/signup
    When I click on the link with label "Connexion"
    Then the browser navigates to /popup/login

  Scenario: Redirection to the login page
    Then the browser navigates to /popup/login
    When I navigate to /popup/logout
    Then the browser navigates to /popup/login
    When I navigate to /popup/signup/post-signup
    Then the browser navigates to /popup/login
    When I navigate to /popup/signup/wat
    Then the browser navigates to /popup/login

  Scenario: Redirection to the logout page
    Given I am logged in
    When I open the popup
    Then the browser navigates to /popup/logout
    When I navigate to /popup/login
    Then the browser navigates to /popup/logout
    When I navigate to /popup/signup
    Then the browser navigates to /popup/logout
    When I navigate to /popup/signup/wat
    Then the browser navigates to /popup/logout

  Scenario: Account creation
    Given the database is empty
    And the email "email@domain.tld" is authorized
    When I navigate to /popup/signup
    And I type "email@domain.tld" in the "Email" field
    And I type "secure p4ssword" in the "Mot de passe" field
    And I type "someone" in the "Pseudo" field
    Then the button with label "Inscription" is disabled
    When I accept the rules
    Then the button with label "Inscription" is not disabled
    When I click on the button with label "Inscription"
    Then the browser navigates to /popup/signup/post-signup
    And I read "un email vous a été envoyé à email@domain.tld"

  # https://github.com/cypress-io/cypress/issues/408
  @ignore
  Scenario: Login
    When I navigate to /popup/login
    And I type "email@domain.tld" in the "Email" field
    Then the button with label "Connexion" is disabled
    When I type "secure p4ssword" in the "Mot de passe" field
    Then the button with label "Connexion" is not disabled
    When I click on the button with label "Connexion"
    Then the browser navigates to /popup/logout
    And I read "Vous êtes connecté(e) sur Réagir à l'information en tant que someone."

  @ignore
  Scenario: Login - invalid credentials
    When I navigate to /popup/login
    And I submit the login form with values "email@domain.tld" and "p4ssword secure"
    Then I read "Combinaison email / mot de passe non valide"

  Scenario: Logout
    Given I am logged in
    When I open the popup
    Then the button with label "Déconnexion" is not disabled
    When I click on the button with label "Déconnexion"
    Then the browser navigates to /popup/login
