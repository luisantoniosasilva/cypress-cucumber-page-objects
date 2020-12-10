Feature: The form

    I want fill the form

    Background:
        Given I open the form page

    @login
    Scenario: Opening the form page

        Then I see "ToolsQA" in the title

    @cadastro
    Scenario Outline: Fill the form
        Given I insert "<nome>" "<sobrenome>"
        Examples:
            | nome  | sobrenome |
            | João  | Silva     |
            | Maria | Fernanda  |