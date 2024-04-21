const {LoginPage} = require('../PageObjects/LoginPage');
const {DashboardPage} = require('../PageObjects/DashboardPage');
const {CartPage} = require('../PageObjects/CartPage');
const {PaymentPage} = require('../PageObjects/PaymentPage');

class POManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.paymentPage = new PaymentPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getPaymentPage(){
        return this.paymentPage;
    }
}
module.exports = {POManager};