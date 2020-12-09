Feature: The form

    I want fill the form

    @login
    Scenario: Opening the form page
        Given I open the form page
        Then I see "ToolsQA" in the title

    @cadastro
    Scenario: Fill the form
        Given I insert "Luis" "Silva"