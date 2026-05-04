import { Page } from '@playwright/test';
import { LoginPage } from './loginPage';
import { CartPage } from './cartPage';
import { ShoppingPage } from './shoppingPage';

export const Pages = (page: Page) => {
    return {
        LoginPage: new LoginPage(page),
        ShoppingPage: new ShoppingPage(page),
        CartPage: new CartPage(page),
    };
};