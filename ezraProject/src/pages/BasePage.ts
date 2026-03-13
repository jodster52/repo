import { Page, Locator, expect } from '@playwright/test';

//this is the base page that holds methods used in other pages

export class BasePage {

    readonly page: Page;
    readonly nextButton: Locator;


    constructor(page: Page){
        this.page = page;
        this.nextButton = page.getByRole('button',{name:'Next'});
    }

    async userJoin(first:string,last:string,username:string,phone:string,pwd:string){
        
        await expect(this.page.getByRole('button', { name: 'Accept' })).toBeVisible({timeout:10000});
        await this.page.getByRole('button', { name: 'Accept' }).click();
        await expect(this.page.getByRole('link', { name: 'Join' })).toBeEnabled({timeout:30000});
        await this.page.getByRole('link', { name: 'Join' }).click();
        await this.page.waitForURL('**/join');
        await this.page.waitForLoadState('load');

        await expect(this.page.getByRole('textbox', { name: 'Legal First Name' })).toBeVisible({timeout:10000});
        
        await this.page.getByRole('textbox', { name: 'Legal First Name' }).fill(first);
        await this.page.getByRole('textbox', { name: 'Legal Last Name' }).fill(last);
        await this.page.getByRole('textbox', { name: 'Email' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Phone Number' }).fill(phone);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(pwd);
        await this.page.getByRole('button', { name: 'I agree to Ezra\'s terms of' }).click();
        await this.page.getByRole('button', { name: 'I agree to receive marketing' }).click();
        await this.page.getByRole('button', { name: 'I agree that Ezra, directly' }).click();

        await this.page.waitForTimeout(300);
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeEnabled();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).waitFor({state:'hidden'});


    }

    async userLogin(name:string,pwd:string){
        await this.page.getByRole('button', { name: 'Accept' }).waitFor({state:'visible'});
        await this.page.getByRole('button', { name: 'Accept' }).click();
        await this.page.getByRole('textbox', { name: 'Email' }).click();
        await this.page.getByRole('textbox', { name: 'Email' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Email' }).press('Tab');
        await this.page.getByRole('textbox', { name: 'Password' }).fill(pwd);
        await this.page.getByRole('textbox', { name: 'Password' }).press('Tab');
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }


    async selectScan(dob:string,gen:string){
        await this.page.getByRole('textbox', { name: 'Date of birth (MM-DD-YYYY)' }).click();
        await this.page.getByRole('textbox', { name: 'Date of birth (MM-DD-YYYY)' }).fill(dob);
        await this.page.locator('.multiselect__tags').click();
        await this.page.locator('span').nth(4).click();
        await this.page.getByText(gen).click();
        await this.page.locator("xpath=//*[contains(@class,'encounter-title')][text()='MRI Scan']").click();
        //await expect(this.page.getByTestId('select-plan-submit-btn')).toBeEnabled({timeout:10000});
        await this.page.getByTestId('select-plan-submit-btn').click();

    }

    async schedScan(){
        await this.page.getByText('AMRICNew York,').waitFor({state:'visible'});
        await this.page.getByText('AMRICNew York,').click();
        //first avialable day
        await this.page.locator("xpath=//div[not(contains(@class,'_cell--disabled'))][contains(@class,'day')][1]//span[contains(@class,'content')]").click();
        //first time slot
        await this.page.locator('label').nth(1).click();
        await this.page.locator('[data-test="submit"]').click();
    }


    async paywithCC(cardNum:string,expdt:string){
        await this.page.waitForURL('**/sign-up/reserve-appointment');
        await this.page.waitForLoadState('load');
        const myframe = this.page.locator('iframe[title="Secure payment input frame"]').first().contentFrame();
        await myframe.getByRole('textbox', { name: 'Card number' }).click();
        await myframe.getByRole('textbox', { name: 'Card number' }).fill(cardNum);
        await myframe.locator("xpath=//input[@id='payment-expiryInput']").fill(expdt);
        await myframe.getByRole('textbox', { name: 'Security code' }).fill('123');
        await myframe.getByRole('textbox', { name: 'ZIP code' }).fill('80465');
            
        await this.page.locator('[data-test="submit"]').click();
        

    }


    async clickContinueAndWaitForPageElement(expectedPageElement?: Locator) {
        const currentUrl = this.page.url();
        const continueButton = this.page.getByRole('button',{name: 'Continue'});
        await expect(continueButton).toHaveCount(1);

        //console.log("click next");
        await Promise.all([
            continueButton.click(),
            this.page.waitForURL((url) => url.toString() !== currentUrl, {
                waitUntil: 'networkidle'
            })
        ]);

        await this.page.waitForTimeout(100); //100 millisec

        if(expectedPageElement){
            await expectedPageElement.waitFor({state:'visible', timeout:60000});
        }

    }






} // end of class