Feature: Website pages

  Scenario Outline: The pages loads correctly
    When I navigate to <path>
    Then I see the header
    And I see the navigation
    And I see the main section
    And I am on the <page> page
    And the active navigation link is "<label>"

  Examples:
  | page        | path         | label       |
  | home        | /            | Accueil     |
  | usage       | /utilisation | Utilisation |
  | rules       | /charte      | La charte   |
  | motivations | /motivations | Motivations |
  | faq         | /faq         | FAQ         |

  Scenario: The navigation works
    When I navigate to /
    And I click on the "Utilisation" navigation link
    Then the browser navigates to /utilisation
    When I click on the "La charte" navigation link
    Then the browser navigates to /charte
    When I click on the "Motivations" navigation link
    Then the browser navigates to /motivations
    When I click on the "FAQ" navigation link
    Then the browser navigates to /faq
    When I click on the "Accueil" navigation link
    Then the browser navigates to /

  Scenario: Not found page works
    When I navigate to /var/run
    Then I see a link to / with label "Retour à l'accueil"
    When I click on the link with label "Retour à l'accueil"
    Then the browser navigates to /
