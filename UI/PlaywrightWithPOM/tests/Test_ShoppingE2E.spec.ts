import { test, expect } from '@playwright/test';
import { Pages } from '../pageObjects/pages';

test('Buy Shoes', async ({ page }) => {
  const pages = Pages(page);

  await page.goto('');

  await pages.LoginPage.loginWithCredentials("practice@qabrains.com","Password123");

  await pages.ShoppingPage.AddShoestoCartPage();

  await pages.ShoppingPage.gotoCartPage();

  await pages.CartPage.checkoutCart();

  
});


