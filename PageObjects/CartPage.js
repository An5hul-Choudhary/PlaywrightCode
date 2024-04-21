const { expect } = require('@playwright/test');

class CartPage{

    constructor(page){
        this.page = page;
        this.firstListItem = page.locator("div li");
        this.addedProduct = page.locator("h3:has-text('ADIDAS ORIGINAL')");
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async checkAddedProduct(){
        await this.firstListItem.first().waitFor();
        const bool = await this.addedProduct.isVisible();
        expect(bool).toBeTruthy();
    }

    async checkOut(){
        await this.checkoutBtn.click();
    }

}
module.exports = {CartPage};