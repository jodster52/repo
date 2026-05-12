import { BasePage, expect } from './basePage';

export class CartPage extends BasePage {
    continueShoppingButton = this.page.getByRole('button', {name: 'Continue Shopping'});
    yourCartHeader = this.page.getByRole('heading', {name: 'Your Cart',exact:true});
    yourCartIsEmptyHeader = this.page.getByRole('heading', {name: 'Your cart is empty.'});
    cartList = this.page.locator("xpath=//*[contains(@class,'cart-list')]");
    //checkout
    checkoutButton = this.page.getByRole('button', {name: 'Checkout'});
    checkoutYourInfoHeader = this.page.getByRole('heading', {name: 'Checkout: Your Information'});
    checkoutContinueButton = this.page.getByRole('button', {name: 'Continue'});
    checkoutOverviewHeader = this.page.getByRole('heading', {name: 'Checkout: Overview'});
    checkoutFinishButton = this.page.getByRole('button', {name: 'Finish'});
    checkoutCompleteHeader = this.page.getByRole('heading', {name: 'Checkout: Complete!'});
    orderCompleteLbl = this.page.getByText("Thank you for your order!");


    async gotoCartPage() {
        await this.page.goto('/cart');
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
        await expect(this.yourCartHeader).not.toBeVisible({timeout:20000});
    }

    async checkoutCart(){

        await this.checkoutButton.click();
        await expect(this.checkoutYourInfoHeader).toBeVisible({timeout:20000});
        await this.checkoutContinueButton.click();
        await expect(this.checkoutOverviewHeader).toBeVisible({timeout:20000});
        await this.checkoutFinishButton.click();
        await expect(this.checkoutCompleteHeader).toBeVisible();

        
    }

    
}