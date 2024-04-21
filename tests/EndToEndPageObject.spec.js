const { test, expect } = require('@playwright/test');
const {POManager} = require('../PageObjects/POManager');
 
  
test('@Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika222@gmail.com";
   const password = "Iamking@000";
   const productName = 'ADIDAS ORIGINAL';

   const poManager = new POManager(page);

   const loginPage = poManager.getLoginPage();
   await loginPage.goto();
   await loginPage.validLogin(email, password);
  
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProduct(productName);
   await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
   await cartPage.checkAddedProduct();
   await cartPage.checkOut();
 
   const paymentPage = poManager.getPaymentPage();
   await paymentPage.selectCountry();
   await paymentPage.validatingEmail(email);
  
   const thankyouPage = poManager.getThankyouPage();
   const orderId = await thankyouPage.validateOrderId();
   console.log(orderId);
   await thankyouPage.myOrder();

   const orderDetailsPage = poManager.getOrderDetailsPage();
   await orderDetailsPage.selectingOrderDetails(orderId);
   await orderDetailsPage.validatingOrderDetails(orderId);
 
});
 
 