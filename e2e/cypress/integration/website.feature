Feature: Website pages

  Background:
    Given I open the website

  Scenario Outline: The pages loads correctly
    When I navigate to <path>
    Then I see the header
    And I see the navigation
    And I see the main section
    And I am on the <page> page
    And the active navigation link is "<label>"

  Examples:
  | page        | path              | label       |
  | home        | /                 | Accueil     |
  | usage       | /utilisation.html | Utilisation |
  | rules       | /charte.html      | La charte   |
  | motivations | /motivations.html | Motivations |
  | faq         | /faq.html         | FAQ         |

  Scenario: Main elements
    Then I see the logo
    And I see extension download button

  Scenario: The navigation works
    When I click on the "Utilisation" navigation link
    Then the browser navigates to /utilisation.html
    When I click on the "La charte" navigation link
    Then the browser navigates to /charte.html
    When I click on the "Motivations" navigation link
    Then the browser navigates to /motivations.html
    When I click on the "FAQ" navigation link
    Then the browser navigates to /faq.html
    When I click on the "Accueil" navigation link
    Then the browser navigates to /

  Scenario: New name banner
    Then I see the banner
    When I close the banner
    Then I don't see the banner
    When I navigate to /
    Then I don't see the banner
