import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

let testURL = "https://www.qaplayground.com/practice";

test('Input Fields Test', async ({ page }) => {
  await page.goto(testURL);

  // Click the get started link.
  await page.getByRole('link', { name: 'Input Fields' }).click();

  // Expects page to have a heading with the name of Installation.
  await test.step('Check Heading', async () => {
    await expect(page.getByRole('heading', { name: 'Input Field Automation Practice' })).toBeVisible();
  });

  await test.step('Scenario 1: Movie Name Input', async () => {
    const scen1Inp = page.locator("[name='movieName']");
    await scen1Inp.fill("The Goonies");
    await expect(scen1Inp).not.toBeEmpty()
    
  });

  await test.step('Scenario 2: Append Input', async () => {
    const today = dayjs().format('dddd');
    const apInput = page.locator("[name='appendText']");
    await apInput.focus();
    await apInput.evaluate("e => e.setSelectionRange(-1,-1)");
    await apInput.type(" for a "+today);
    await page.keyboard.press('Tab');
    await expect(apInput).not.toBeEmpty();
    await expect(apInput).toHaveValue("I am good for a "+today);
    
  });

  await test.step('Scenario 3: Verify text', async () => {
    await expect(page.locator("[name='insideText']")).toHaveValue('QA PlayGround');
    
  });

  await test.step('Scenario 4: Clear text', async () => {
    const scen4input = page.locator("[name='clearText']");
    await scen4input.focus();
    await scen4input.fill('');
    await expect(scen4input).toBeEmpty();
  });

  await test.step('Scenario 5: Disabled', async () => {
    await expect(page.locator("[name='disabledInput']")).toBeDisabled();
    
  });

  await test.step('Scenario 6: Read only', async () => {
    await expect(page.locator("[name='readonlyInput']")).toHaveAttribute("readonly","");
    
  });

});
