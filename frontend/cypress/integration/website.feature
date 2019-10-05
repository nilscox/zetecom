Feature: Website pages

  Scenario: The home page loads correctly
    When I navigate to /
    Then I see the header
    And I see the navigation
    And I see the main section
