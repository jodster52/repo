import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

let testURL = "https://www.qaplayground.com/practice";

test('has title', async ({ page }) => {
  await page.goto(testURL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Practice Elements/);
});


