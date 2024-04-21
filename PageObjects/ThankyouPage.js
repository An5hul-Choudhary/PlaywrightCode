const { expect } = require('@playwright/test');

class ThankyouPage{

    constructor(page){
        this.page = page;
        this.thanksText = page.locator(".hero-primary");
        this.orderIdPresent = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrderBtn = page.locator("button[routerlink*='myorders']");
        this.element = page.locator("tbody");
    }

    async validateOrderId(){
        await expect(this.thanksText).toHaveText(" Thankyou for the order. ");
        return await  this.orderIdPresent.textContent();
        
    }

    async myOrder(){
        await this.myOrderBtn.click();
        await this.element.waitFor();
    }
}
module.exports = {ThankyouPage};