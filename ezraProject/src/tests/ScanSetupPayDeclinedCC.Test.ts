import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { faker } from '@faker-js/faker/locale/en';
import dayjs from 'dayjs';

let b: BasePage;

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const dobFormatted = dayjs(faker.date.birthdate({ mode: 'age', min: 40, max: 40 })).format('MM-DD-YYYY');
const email = randomFirstName+"@test.com";
const userPhone = "3035554444";
const userPwd = "PassEzra!2026";
const ccDeclined = "4000000000000002";
const cvc = "123";
const ccExpDate = dayjs().add(3,'years').format('MM/YY');


test.describe("Schedule as a 40 year old, Pay with a credit card", () => {

    test.beforeEach(( { page }) => {
        b = new BasePage(page);
    });


    test('Regular Scan, Pay with CC', async({page}) => {

        await test.step('Join', async() => {
            await page.goto('');
            await b.userJoin(randomFirstName,randomLastName,email,userPhone,userPwd);
            
        });

        await test.step('Select Scan', async() => {
            await b.selectScan(dobFormatted,"Female");
  
        });

        await test.step('Schedule scan', async() => {
            await b.schedScan();
        });

        await test.step('Pay for scan', async() => {
            await b.paywithCC(ccDeclined,ccExpDate);

            await expect(page.locator('iframe[title="Secure payment input frame"]').first().contentFrame().getByText('Your card was declined.')).toBeVisible({timeout:60000});
            
        });



    });

});