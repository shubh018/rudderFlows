import {updateEnv} from '../../utils/helper';

class DashboardPage {
    get crossIconSidebar() {
        return $("//*[name()='svg' and @data-testid='cross-icon']");
    }

    get closeInfoMessage() {
        return $("//button[@data-action='close']");
    }

    get copyElements(){return $$("//*[name()='svg' and @data-icon='copy']");}
    get writeKeyElement() {return $("//span[contains(text(), 'Write key')]");}
    get dataPlaneURLElement() {return $("//span[text()='Data Plane']//following-sibling::div//div//button/preceding-sibling::span");}

    async clickCrossIconSidebar(){
        await this.crossIconSidebar.click();
    }

    async clickCloseInfoMessage(){
        await this.closeInfoMessage.click();
    }

    async copyElementsAndSaveValues(){
        const dataPlaneURL = await this.dataPlaneURLElement.getText();
        const fullText = await this.writeKeyElement.getText();
        const writeKey = fullText.replace("Write key", "").trim();

        updateEnv('DATA_PLANE_URL', dataPlaneURL);
        updateEnv('WRITE_KEY', writeKey);

    }
}

export default new DashboardPage();