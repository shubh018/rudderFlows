Feature: Login to Rudderstack Account and Send API Request

  Scenario Outline: As a user, I can log into the Rudderstack Account and send an API Request

    Given I am on the login page, open "<APP_URL>"
    When I login with "<USERNAME>" and "<PASSWORD>"
    Then I should see skip MFA and see Dashboard
    Then Copy values and save into .env file
    Then Capture Initial Success and Failure Events
    Then Sending an API Request using WRITE KEY and DATA PLANE URL
    Then Check Events Dashboard in Destination
