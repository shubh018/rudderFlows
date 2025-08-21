import { Given, When, Then } from '@wdio/cucumber-framework';
import { updateEnv, generateAuthHeader } from '../../utils/helper';
import axios from "axios";

// Page Imports
import LoginPage from '../pageobjects/login.page';
import DashboardPage from '../pageobjects/dashboard.page';
import loginPage from '../pageobjects/login.page';
import destinationPage from '../pageobjects/destinations.page';


Given(/^I am on the login page, open "([^"]*)"$/, async (url) => {
    const app_url = process.env.APP_URL || url
    await loginPage.navigateTo(app_url)
});

When(/^I login with "([^"]*)" and "([^"]*)"$/, async (username, password) => {
    const user_name = process.env.USERNAME || username;
    const user_password = process.env.PASSWORD || password;
    await LoginPage.fillLoginDetails(user_name, user_password);
    await LoginPage.clickOnLogin();
    await LoginPage.skipMFAAlertIfPresent();
});

Then("I should see skip MFA and see Dashboard", async () => {
    await DashboardPage.clickCloseInfoMessage();
});

Then("Copy values and save into .env file", async() => {
    await DashboardPage.copyElementsAndSaveValues();
});

Then("Sending an API Request using WRITE KEY and DATA PLANE URL", async()=>{
    const dataPlaneURL = process.env.DATA_PLANE_URL;
    const writeKey = process.env.WRITE_KEY!;
    const encodedWriteKey = generateAuthHeader(writeKey);
    console.log("Reaching here");

    const headers = {
        "Authorization": encodedWriteKey,
        "Content-Type": "application/json",
    };

    try{

        const response = await axios.post(`${dataPlaneURL}/v1/identify`, {message: "Testing Event"}, { headers });

        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        if (response.status !== 200){
            throw Error("Status code is not 200.")
        }

    }

    catch (error: any) {
        console.error("API Request failed.", error?.response.status)
    }

});

Then("Capture Initial Success and Failure Events", async()=>{
    await destinationPage.clickDestinationMenuItem();
    await destinationPage.clickDestinationNameCard();
    await destinationPage.clickEventsTab();

    const previousSuccessfulEvents = await destinationPage.getEventsStats('delivered');
    const previousFailedEvents = await destinationPage.getEventsStats('failed');
    const previousFailedPercentageRate = await destinationPage.getEventsStats('failure rate');

    updateEnv('PREVIOUS_SUCCESS_EVENTS', previousSuccessfulEvents);
    updateEnv('PREVIOUS_FAILED_EVENTS', previousFailedEvents);
    updateEnv('PREVIOUS_FAILURE_PERCENTAGE', previousFailedPercentageRate);

})

Then("Check Events Dashboard in Destination", async()=>{
    await destinationPage.refreshEvents();
    // await destinationPage.clickDestinationNameCard();
    // await destinationPage.clickEventsTab();

    const newSuccessfulEvents = await destinationPage.getEventsStats('delivered');
    const newFailedEvents = await destinationPage.getEventsStats('failed');
    const newFailedPercentageRate = await destinationPage.getEventsStats('failure rate');

    updateEnv('NEW_SUCCESS_EVENTS', newSuccessfulEvents);
    updateEnv('NEW_FAILED_EVENTS', newFailedEvents);
    updateEnv('NEW_FAILURE_PERCENTAGE', newFailedPercentageRate);

});

