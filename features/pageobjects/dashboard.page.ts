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
        // const writeKey = await this.writeKeyElement.getText();
        const fullText = await this.writeKeyElement.getText();
        const writeKey = fullText.replace("Write key", "").trim();

        updateEnv('DATA_PLANE_URL', dataPlaneURL);
        updateEnv('WRITE_KEY', writeKey);

        // let envConfig = '';

        // if (fs.existsSync(envPath)) {
        //     envConfig = fs.readFileSync(envPath, 'utf-8');
        // }

        // const DATA_PLANE_URL = new RegExp(`^DATA_PLANE_URL=.*$`, 'm');

        // if (DATA_PLANE_URL.test(envConfig)) {
        //     envConfig = envConfig.replace(DATA_PLANE_URL, `DATA_PLANE_URL=${dataPlaneURL}`);
        // } else {
        //     envConfig += `\nDATA_PLANE_URL=${dataPlaneURL}`;
        // }

        // fs.writeFileSync(envPath, envConfig);
        // console.log(`.env updated: $DATA_PLANE_URL=${dataPlaneURL}`);

        // const WRITE_KEY = new RegExp(`^WRITE_KEY=.*$`, 'm');

        // if (WRITE_KEY.test(envConfig)) {
        //     envConfig = envConfig.replace(WRITE_KEY, `WRITE_KEY=${writeKey}`);
        // } else {
        //     envConfig += `\WRITE_KEY=${writeKey}`;
        // }

        // fs.writeFileSync(envPath, envConfig);
        // console.log(`.env updated: $WRITE_KEY=${writeKey}`);

    }
}

export default new DashboardPage();