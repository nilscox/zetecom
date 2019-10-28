Feature: Integration

  Background:
    Given the database is populated with data from "data.json"
    And I open the integration on url "https://news.fake/article/1"

  Scenario: Integration navigation
    Then I see a input with placeholder "Rechercher..."
    And I read "subject 1"
    And I read "subject 2"
    When I click on "subject 1"
    Then I read "Voir les réactions"
    When I click on "Voir les réactions"
    Then the browser url matches url=https://news.fake/article/1#/subject/1$
    When I click on the link with label "Retour"
    Then the browser url matches url=https://news.fake/article/1#/$
    When I open the subject 1 with the header link
    Then the browser url matches url=https://news.fake/article/1#/subject/1$
    And I read "reaction 1.1 text"
    And I don't read "reaction 1.1.1 text"
    When I click on the button with label "2 réponses"
    Then I read "reaction 1.1 text"
    And I read "reaction 1.1.1 text"
    When I click on the button with label "2 réponses"
    Then I read "reaction 1.1 text"
    And I don't read "reaction 1.1.1 text"

  Scenario: Information not found
    Given I open the integration on url "https://news.fake/article/2"
    Then I read "L'espace de commentaire n'est pas activé sur cette page."

  Scenario: Subject and reaction form are not visible when unauthenticated
    Then I don't read "Nouveau sujet"
    When I open the subject 1 with the header link
    Then I don't see an element matching selector ".reaction-form"

  Scenario: Subject creation
    And I am logged in
    And I open the integration on url "https://news.fake/article/1"
    When I click on the button with label "Nouveau sujet"
    Then I see an element matching selector ".subject-form"
    And I see a input with placeholder "Sujet"
    And I see a input with placeholder "Citation (optionelle)"
    And I see a textarea with placeholder "Description du sujet..."
    And I see a button with label "Envoyer"
    When I type "new subject" in the "Sujet" field
    And I type "Lorem ipsum" in the "Citation (optionelle)" field
    Then the button with label "Envoyer" is disabled
    When I type "Dolor sit amet." in the "Description du sujet..." field
    Then the button with label "Envoyer" is not disabled
    When I click on the button with label "Envoyer"
    Then the browser url matches url=https://news.fake/article/1#/subject/\d+$
    And the subject title is "new subject"
    And the subject quote is "Lorem ipsum"
    And the subject description is "Dolor sit amet"

  Scenario: Reaction creation
    Given I am logged in
    And I open the integration on url "https://news.fake/article/1"
    When I open the subject 1 with the header link
    Then the reaction form is empty
    And I type "# Hello{enter}{enter}that is [something](https://something.com)!" in the "Composez votre message..." field
    Then the button with label "Envoyer" is not disabled
    When I click on "Aperçu"
    Then I don't see a textarea with placeholder "Composez votre message..."
    And I see an element matching selector ".markdown-preview h1" with text "Hello"
    And I see an element matching selector ".markdown-preview a[href=\"https://something.com\"]" with text "something"
    When I click on "Editer"
    And I don't see an element matching selector ".markdown-preview"
    And I see a textarea with placeholder "Composez votre message..."
    When I click on "Envoyer"
    Then the reaction form is empty

  Scenario: Reaction edition
    Given I am logged in
    And I open the integration on url "https://news.fake/article/1"
    When I open the subject 1 with the header link
    Then I read "✎"
    When I click on "✎"
