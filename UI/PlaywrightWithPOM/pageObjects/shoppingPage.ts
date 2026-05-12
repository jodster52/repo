import { BasePage, expect } from './basePage';

export class ShoppingPage extends BasePage {
    userDropdownButton = this.page.getByRole('button', {name: 'practice@qabrains.com'});
    shoppingCartButton = this.page.locator("xpath=//div[contains(@class,'profile')]/span");
    shoppingCartCountLbl = this.page.locator("xpath=//div[contains(@class,'profile')]/span/span");
    productsHeader = this.page.getByRole('heading', {name: 'Products'});
    shoeAddToCartBtn = this.page.locator("xpath=//*[text()='Sample Shoe Name']/following::button[text()='Add to cart'][1]");
    shoeCostLbl = this.page.locator("xpath=//*[text()='Sample Shoe Name']/following::span[1]");
    shoeRemoveFromCartBtn = this.page.locator("xpath=//*[text()='Sample Shoe Name']/following::button[text()='Remove from cart'][1]");

    async gotoCartPage() {
        await this.shoppingCartButton.click();  
        await this.productsHeader.waitFor({state:'hidden'});
    }


    async AddShoestoCartPage() {
        await this.shoeAddToCartBtn.click();
        await expect(this.shoeRemoveFromCartBtn).toBeVisible({timeout:20000});

    }

}