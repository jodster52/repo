import { test, expect } from '@playwright/test';
import { Pages } from '../pageObjects/pages';

test.describe('Buy Shoes and complete checkout', () => {
  test('Buy Shoes', async ({ page }) => {
    const pages = Pages(page);
    await page.goto('');
    await pages.LoginPage.loginWithCredentials("practice@qabrains.com","Password123");
    await expect(pages.ShoppingPage.shoeAddToCartBtn).toBeVisible();
    const shoePrice = pages.ShoppingPage.shoeCostLbl.textContent();
    console.log("Shoe price: "+shoePrice);
    await pages.ShoppingPage.AddShoestoCartPage();
    await expect(pages.ShoppingPage.shoeRemoveFromCartBtn).toBeVisible();
    await expect(pages.ShoppingPage.shoppingCartCountLbl).toBeVisible();
    await expect(pages.ShoppingPage.shoppingCartCountLbl).toContainText("1");
    await pages.ShoppingPage.gotoCartPage();
    await expect(pages.CartPage.cartList).toContainText("Shoe");
    await pages.CartPage.checkoutCart();
    await expect(pages.CartPage.orderCompleteLbl).toBeVisible();
    await expect(pages.ShoppingPage.shoppingCartCountLbl).not.toBeVisible();
  
  });
});


