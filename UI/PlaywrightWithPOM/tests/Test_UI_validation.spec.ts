import { test, expect } from '@playwright/test';
import { Pages } from '../pageObjects/pages';

test.beforeEach('Setup', async ({page}) => {
  const pages = Pages(page);
  await page.goto('');
  await pages.LoginPage.loginWithCredentials("practice@qabrains.com","Password123");
});

test('Login', async ({ page }) => {
  const pages = Pages(page);  
  await expect(pages.ShoppingPage.userDropdownButton).toBeVisible();
});


test('View Cart', async ({ page }) => {
  const pages = Pages(page);

  await pages.ShoppingPage.gotoCartPage();
  await expect(pages.CartPage.yourCartHeader).toBeVisible({timeout:10000});

  await pages.CartPage.continueShopping();

  
});
