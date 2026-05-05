import { test, expect } from '@playwright/test';
import { Pages } from '../pageObjects/pages';

test.describe('Login with valid credentials', () => {
  test('Login - Valid', async ({ page }) => {
    const pages = Pages(page);
    await page.goto('');
    await pages.LoginPage.loginWithCredentials("practice@qabrains.com","Password123");
    await expect(pages.ShoppingPage.userDropdownButton).toBeVisible();

  
  });
});

test.describe('Login with No Username', () => {
  test('Login - Invalid - No Username', async ({ page }) => {
    const pages = Pages(page);
    await page.goto('');
    await pages.LoginPage.loginWithCredentials("","Password123");
    await expect(pages.LoginPage.emailErrMsgLbl).toContainText("Email is a required field");
  });  
});

test.describe('Login with No Password', () => {
  test('Login - Invalid - No Password', async ({ page }) => {
    const pages = Pages(page);
    await page.goto('');
    await pages.LoginPage.loginWithCredentials("practice@qabrains.com","");
    await expect(pages.LoginPage.pwdErrMsgLbl).toContainText("Password is a required field");
  });  
});


test.describe('Login with Short Password', () => {
  test('Login - Invalid - Short Password', async ({ page }) => {
    const pages = Pages(page);
    await page.goto('');
    await pages.LoginPage.loginWithCredentials("practice@qabrains.com","123");
    await expect(pages.LoginPage.pwdErrMsgLbl).toContainText("Password must be at least 6 characters");
  });
});

test.describe('Login with Incorrect Password', () => {
  test('Login - Invalid - Incorrect Password', async ({ page }) => {
    const pages = Pages(page);
    await page.goto('');
    await pages.LoginPage.loginWithCredentials("practice@qabrains.com","123456");
    await expect(pages.LoginPage.pwdErrMsgLbl).toContainText("Password is incorrect.");
  });
});

