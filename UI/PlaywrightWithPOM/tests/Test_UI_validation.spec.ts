import { test, expect } from '@playwright/test';
import { Pages } from '../pageObjects/pages';

test('Login', async ({ page }) => {
  const pages = Pages(page);

  await page.goto('');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/QA Practice Site/);
  
  await pages.LoginPage.loginWithCredentials("practice@qabrains.com","Password123");
  await expect(pages.ShoppingPage.userDropdownButton).toBeVisible();

  
});


test('View Cart', async ({ page }) => {
  const pages = Pages(page);

  await page.goto('');
  
  await pages.LoginPage.loginWithCredentials("practice@qabrains.com","Password123");

  await pages.ShoppingPage.gotoCartPage();

  await pages.CartPage.leaveCartPage();

  
});
