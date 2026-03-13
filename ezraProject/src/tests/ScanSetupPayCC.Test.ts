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
const ccVisa = "4242424242424242";
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
            await b.paywithCC(ccVisa,ccExpDate);
            await expect(page.getByRole('button', { name: 'Begin Medical Questionnaire' })).toBeVisible({timeout:60000});
        });



    });

});