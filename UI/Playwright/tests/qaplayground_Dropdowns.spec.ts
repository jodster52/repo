import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

let testURL = "https://www.qaplayground.com/practice";

test('Form Test', async ({ page }) => {
  await page.goto(testURL);

  // Click the get started link.
  await page.locator("#practice-card-dropdowns").click();

  // Expects page to have a heading with the name of Installation.
  await test.step('Check Heading', async () => {
    await expect(page.getByRole('heading', { name: 'Dropdown Automation Practice' })).toBeVisible();
  });

  await test.step('Scenario 1: Dropdown visible text', async () => {
    const scen1dd = page.locator("#dropdown-fruit");
    const scApple = page.locator("xpath=//*[text()='Apple']");
    await scen1dd.click();
    await scApple.click();

    await expect(page.locator("xpath=//*[contains(text(),'Selected:')]")).toBeVisible();

  
  });

  await test.step('Scenario 2: Dropdown value attrib', async () => {
    const sc2dd = page.locator("#dropdown-country");
    const scUS = page.locator("xpath=//*[text()='USA']");
    

    await sc2dd.click();
    await scUS.click();
    
    await expect(page.locator("xpath=//*[contains(text(),'Value:')]")).toBeVisible();
    
    
  });

  await test.step('Scenario 3: Get all values, pick last one', async () => {
    const sc3dd = page.locator("#dropdown-language");

    await sc3dd.click();
    await page.getByText('JavaScript', { exact: true }).click();
    await expect(page.locator("xpath=//p[contains(@class,'purple')]")).toBeVisible();
    //await expect(page.getByTestId("#result-language")).toBeVisible();
    //let resVal = page.getByTestId("#result-language").textContent();
    //let resVal = page.locator("xpath=//p[contains(@class,'purple')]").innerText();
    //console.log("Scenario 3 Result: "+resVal);
    
  });

  await test.step('Scenario 4: Multi-select', async () => {
    const sc4dd = page.locator("#dropdown-heroes");

    await sc4dd.selectOption(['Batman','Aquaman']);

    await expect(page.locator("xpath=//p[contains(@class,'orange')]")).toBeVisible();
    
  });

  
});
