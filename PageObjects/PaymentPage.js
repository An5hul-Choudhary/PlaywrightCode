const { expect } = require('@playwright/test');

class PaymentPage{

    constructor(page){
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.buttons = this.dropdown.locator("button");
        this.emailIdPresent = page.locator(".user__name [type='text']");
        this.submitBtn = page.locator(".action__submit");
    }

    async selectCountry(){
        await this.country.pressSequentially("ind");
        await this.dropdown.waitFor();
        const optionsCount = await this.buttons.count();
        for (let i = 0; i < optionsCount; ++i) {
           const text = await this.buttons.nth(i).textContent();
           if (text === " India") {
              await this.buttons.nth(i).click();
              break;
           }
        }
    }

    async validatingEmail(email){
        await expect(this.emailIdPresent.first()).toHaveText(email);
        await this.submitBtn.click();
        
    }
}
module.exports = {PaymentPage};