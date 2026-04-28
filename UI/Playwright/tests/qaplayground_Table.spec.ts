import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

let testURL = "https://www.qaplayground.com/practice";

test('Form Test', async ({ page }) => {
  await page.goto(testURL);

  // Click the get started link.
  await page.locator("#card-link-data-table").click();

  // Expects page to have a heading with the name of Installation.
  await test.step('Check Heading', async () => {
    await expect(page.getByRole('heading', { name: 'Data Table Automation Practice' })).toBeVisible();
  });

  await test.step('View Table Headers', async () => {
    const headerLoc = page.locator("xpath=//table[@id='books-table']/thead/tr");
    const headVals = headerLoc.allTextContents();
    console.log("Headers: "+headVals);
  
  });

  await test.step('View Table data, random', async () => {
    
  
  });

  
});
