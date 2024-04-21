const { expect } = require('@playwright/test');

class OrderDetailsPage{

    constructor(page){
        this.page = page;
        this.rows = page.locator("tbody tr");
        this.details = page.locator(".col-text");
    }

    async selectingOrderDetails(orderId){
        await this.rows;
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            console.log(rowOrderId);
            if (orderId.includes(rowOrderId)) {
               await this.rows.nth(i).locator("button").first().click();
               break;
            }
        }

    }

    async validatingOrderDetails(orderId){
        const orderIdDetails = await this.details.textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
}
module.exports = {OrderDetailsPage};