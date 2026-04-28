import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

let testURL = "https://www.qaplayground.com/practice";

test('Form Test', async ({ page }) => {
  await page.goto(testURL);

  // Click the get started link.
  await page.locator("#card-link-forms").click();

  // Expects page to have a heading with the name of Installation.
  await test.step('Check Heading', async () => {
    await expect(page.getByRole('heading', { name: 'Form Automation Practice' })).toBeVisible();
  });

  await test.step('Populate form', async () => {
    const fnameInp = page.locator("#firstName");
    const lnameInp = page.locator("#lastName");
    const emailInp = page.locator("#email");
    const phoneInp = page.locator("#phone");
    const dobInp = page.locator("#dob");
    const genF = page.locator("#gender-female");
    const countryDrop = page.locator("#country");
    const countrySelect = page.locator("xpath=//select");
    const cityInp = page.locator("#city");
    const bioInp = page.locator("#bio");
    const chkPlay = page.locator("#interest-playwright");
    const pw1Inp = page.locator("#password");
    const pw2Inp = page.locator("#confirmPassword");
    const chkTerms = page.locator("#terms");
    const submitBtn = page.locator("#submitFormBtn");

    await fnameInp.fill("Bob");
    await lnameInp.fill("Barker");
    await emailInp.fill("bob@test.com");
    await phoneInp.fill("3035555555");
    await dobInp.focus();
    await dobInp.fill("2000-01-01");
    await genF.click();
    //await countryDrop.click();
    await countrySelect.selectOption('usa');
    await cityInp.fill("Denver");
    await bioInp.fill("I Like Playwright");
    await chkPlay.check();
    await pw1Inp.fill("MyP@ssword1");
    await pw2Inp.fill("MyP@ssword1");
    await chkTerms.check();
    await submitBtn.click();

    await expect(page.locator("xpath=//*[text()='Form Submitted Successfully!']")).toBeVisible();
    await expect(page.locator("#formSuccessMsg")).toBeVisible();
  
  });

  
});
