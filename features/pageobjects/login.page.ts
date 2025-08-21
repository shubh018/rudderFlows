class LoginPage {
    get userNameInputField() {
        return $('//input[@data-testid="Email"]');
    }
    get passwordInputField() {
        return $('//input[@data-testid="Password"]');
    }
    get loginButton() {
        return $("//span[text()='Log in']//parent::button[not(@disabled)]");
    }
    get mfaAlert() { return $("//a[contains(text(),' do this later')]");}
    get goToDashboard() {return $("//span[text()='Go to dashboard']");}

    async navigateTo(url: string){
        await browser.url(url)
    }

    async fillLoginDetails(username: string, password: string){
        await this.userNameInputField.addValue(username);
        await this.passwordInputField.setValue(password);
    }

    async clickOnLogin(){
        await this.loginButton.click();
    }

    async skipMFAAlertIfPresent(){

        const appeared = await browser.waitUntil(
        async () => await this.mfaAlert.isExisting(),
            {
                timeout: 50000,
                timeoutMsg: "MFA alert did not appear in 5s"
            }
        );

        if (appeared) {
            await this.mfaAlert.click();
            await this.goToDashboard.click();
        }

        // try{
        //     const mfaAlertElement = await this.mfaAlert.waitForExist({timeout: 30000, reverse: false});

        //     if (!mfaAlertElement){
        //         await this.mfaAlert.click();
        //         await this.goToDashboard.click();
        //     }

        // }

        // catch{
        //     console.log("MFA alert not received, continuing...")
        // }
        // const mfaAlertElement = await (this.mfaAlert).isExisting();
        // if (!mfaAlertElement){
        //     await this.mfaAlert.click();
        //     await this.goToDashboard.click();
        // }
        
    }

}

export default new LoginPage();