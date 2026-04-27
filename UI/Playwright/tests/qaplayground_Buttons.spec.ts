import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

let testURL = "https://www.qaplayground.com/practice";

test('Buttons Test', async ({ page }) => {
  await page.goto(testURL);

  // Click the get started link.
  await page.locator("#practice-card-buttons").click();

  // Expects page to have a heading with the name of Installation.
  await test.step('Check Heading', async () => {
    await expect(page.getByRole('heading', { name: 'Button Automation Practice' })).toBeVisible();
  });

  await test.step('Scenario 1: Navigate Home', async () => {
    await page.locator("#btn-goto-home").click();
    await expect(page.getByRole('button', {name: 'Start Practicing'})).toBeVisible();
    //get back to buttons page
    await page.getByRole('button', {name: 'Start Practicing'}).click();
    await page.locator("#card-link-buttons").click();
    await expect(page.getByRole('heading', { name: 'Button Automation Practice' })).toBeVisible();
  
  });

  await test.step('Scenario 2: Button X Y Coords', async () => {
    const box = page.locator("#btn-find-location").boundingBox;
    console.log("xy coords: "+box);
    
    
  });

  await test.step('Scenario 3: Button color', async () => {
    const colorBtn = page.locator("#btn-find-color");
    const colorVal = await colorBtn.evaluate((el) => {
       return window.getComputedStyle(el).getPropertyValue('background-color');
      });
    console.log("Button color: "+colorVal);
    
  });

  await test.step('Scenario 4: Height and Width', async () => {
    const szBtn = page.locator("#btn-size");
    const szHeight = szBtn.getAttribute('height');
    const szLen = szBtn.getAttribute('length');
    console.log("Button height x length = "+szHeight+" x "+szLen)
  });

  await test.step('Scenario 5: Disabled', async () => {
    const disbtn = page.locator("#btn-disabled");
    await expect(disbtn).toBeDisabled();
    
  });

  await test.step('Scenario 6: Click and hold', async () => {
    const clHoldbtn = page.locator("#btn-click-hold");
    await clHoldbtn.click({delay: 1501});
    await expect(clHoldbtn).toHaveText("Hold Complete!");
    
  });

  await test.step('Scenario 7: Double click', async () => {
    const dblClkBtn = page.locator("#btn-double-click");
    await dblClkBtn.dblclick();
    await expect(page.locator("#btn-action-result")).toHaveText("You Double-clicked on button!");
    
  });

  await test.step('Scenario 8: Right click', async () => {
    const rtClkBtn = page.locator("#btn-right-click");
    await rtClkBtn.click({button:'right'});
    await expect(page.locator("#btn-action-result")).toHaveText("You Right-clicked on button!");
    
  });

});
