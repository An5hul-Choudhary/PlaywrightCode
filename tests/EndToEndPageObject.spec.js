const { test, expect } = require('@playwright/test');
const {POManager} = require('../PageObjects/POManager');
//JSON -> String -> JS object
const dataSet = JSON.parse(JSON.stringify(require('../Utils/EndToEndPageObjectTestData.json')));
 
  
test('@Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const poManager = new POManager(page);

   const loginPage = poManager.getLoginPage();
   await loginPage.goto();
   await loginPage.validLogin(dataSet.email, dataSet.password);
  
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProduct(dataSet.productName);
   await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
   await cartPage.checkAddedProduct();
   await cartPage.checkOut();
 
   const paymentPage = poManager.getPaymentPage();
   await paymentPage.selectCountry("ind",  " India");
   await paymentPage.validatingEmail(dataSet.email);
  
   const thankyouPage = poManager.getThankyouPage();
   const orderId = await thankyouPage.validateOrderId();
   console.log(orderId);
   await thankyouPage.myOrder();

   const orderDetailsPage = poManager.getOrderDetailsPage();
   await orderDetailsPage.selectingOrderDetails(orderId);
   await orderDetailsPage.validatingOrderDetails(orderId);
 
});
 
 