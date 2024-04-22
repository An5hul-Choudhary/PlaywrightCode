const { test, expect } = require('@playwright/test');
const {customtest} = require('../Utils/test-base');
const {POManager} = require('../PageObjects/POManager');
//JSON -> String -> JS object
const dataSet = JSON.parse(JSON.stringify(require('../Utils/EndToEndPageObjectTestData.json')));
 
for(const data of dataSet){

test(`@Client App login for ${data.productName}`, async ({ page }) => {
   //js file- Login js, DashboardPage
   const poManager = new POManager(page);

   const loginPage = poManager.getLoginPage();
   await loginPage.goto();
   await loginPage.validLogin(data.email, data.password);
  
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProduct(data.productName);
   await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
   await cartPage.checkAddedProduct();
   await cartPage.checkOut();
 
   const paymentPage = poManager.getPaymentPage();
   await paymentPage.selectCountry("ind",  " India");
   await paymentPage.validatingEmail(data.email);
  
   const thankyouPage = poManager.getThankyouPage();
   const orderId = await thankyouPage.validateOrderId();
   console.log(orderId);
   await thankyouPage.myOrder();

   const orderDetailsPage = poManager.getOrderDetailsPage();
   await orderDetailsPage.selectingOrderDetails(orderId);
   await orderDetailsPage.validatingOrderDetails(orderId);
 
});
 
}



customtest.only("@Client App login with test data fixture", async ({ page,  testDataForOrder }) => {
   //js file- Login js, DashboardPage
   const poManager = new POManager(page);

   const loginPage = poManager.getLoginPage();
   await loginPage.goto();
   await loginPage.validLogin( testDataForOrder.email,  testDataForOrder.password);
  
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProduct( testDataForOrder.productName);
   await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
   await cartPage.checkAddedProduct();
   await cartPage.checkOut();
 
   const paymentPage = poManager.getPaymentPage();
   await paymentPage.selectCountry("ind",  " India");
   await paymentPage.validatingEmail( testDataForOrder.email);
  
   const thankyouPage = poManager.getThankyouPage();
   const orderId = await thankyouPage.validateOrderId();
   console.log(orderId);
   await thankyouPage.myOrder();

   const orderDetailsPage = poManager.getOrderDetailsPage();
   await orderDetailsPage.selectingOrderDetails(orderId);
   await orderDetailsPage.validatingOrderDetails(orderId);
 
});