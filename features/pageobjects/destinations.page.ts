class DestinationPage {
    get destinationMenuItem() {return $("//a[@data-testid='sub-menu-destinations']");}
    get destinationNameCard() {return $("//div[text()='Test Webhook']");}
    get eventsTab() {return $("//div[@role='tab' and text()='Events']");}
    get deliveredEvents() {return $("//span[text()='Delivered']//following-sibling::div//h2");}
    get failedEvents() {return $("//span[text()='Failed']//following-sibling::div//h2");}
    get failedEventsPercentage() {return $("//span[text()='Failure rate']//following-sibling::div//h2");}
    get refreshEventsButton() {return $("//button//span[text()='Refresh']");}
    get delieveredEventsText() {return $("//span[text()='Delivered']");}

    async clickDestinationMenuItem(){
        await this.destinationMenuItem.click();
    }

    async clickDestinationNameCard(){
        await this.destinationNameCard.click();
    }

    async clickEventsTab(){
        await this.eventsTab.click();
        await this.delieveredEventsText.waitForDisplayed({timeout: 800000});
        // await browser.waitUntil(
        // async () => {
        //     const elements = await $$("//span[text()='Delivered']");
        //     return await elements.length === 1;
        // },
        // {
        //     timeout: 60000,
        //     timeoutMsg: "Expected exactly 1 Delivered element, but condition not met"
        // }
        // );
    }

    async getEventsStats(eventStatus: string): Promise<string>{
        if (eventStatus === 'delivered'){
            return await this.deliveredEvents.getText();
        }
        else if (eventStatus === 'failed'){
            return await this.failedEvents.getText();
        }
        else{
            return await this.failedEventsPercentage.getText();
        }
    }

    async refreshEvents(){
        await this.refreshEventsButton.click();
        await this.delieveredEventsText.waitForDisplayed({timeout: 800000});
    }
}

export default new DestinationPage();