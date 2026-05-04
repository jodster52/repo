import { test, expect } from '@playwright/test';
import { Pages } from '../pageObjects/pages';

test('Login - Valid', async ({ page }) => {
  const pages = Pages(page);

  await page.goto('');
  
  await pages.LoginPage.loginWithCredentials("practice@qabrains.com","Password123");
  await expect(pages.ShoppingPage.userDropdownButton).toBeVisible();

  
});


test('Login - Invalid - No Password', async ({ page }) => {
  const pages = Pages(page);

  await page.goto('');
  
  await pages.LoginPage.loginWithCredentials("practice@qabrains.com","");
  await expect(pages.LoginPage.pwdErrMsgLbl).toContainText("Password is a required field");
  
});


test('Login - Invalid - Short Password', async ({ page }) => {
  const pages = Pages(page);

  await page.goto('');
  
  await pages.LoginPage.loginWithCredentials("practice@qabrains.com","123");
  await expect(pages.LoginPage.pwdErrMsgLbl).toContainText("Password must be at least 6 characters");
  
});


test('Login - Invalid - Incorrect Password', async ({ page }) => {
  const pages = Pages(page);

  await page.goto('');
  
  await pages.LoginPage.loginWithCredentials("practice@qabrains.com","123456");
  await expect(pages.LoginPage.pwdErrMsgLbl).toContainText("Password is incorrect.");
  
});

