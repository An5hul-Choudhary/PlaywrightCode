class PaymentPage{

    constructor(page){
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
    }

    async selectCountry(){
        await this.country.pressSequentially("ind");
    }
}
module.exports = {PaymentPage};