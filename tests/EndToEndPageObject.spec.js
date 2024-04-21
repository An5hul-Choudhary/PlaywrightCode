const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');
const {DashboardPage} = require('../PageObjects/DashboardPage');
const {CartPage} = require('../PageObjects/CartPage');
const {PaymentPage} = require('../PageObjects/PaymentPage');
 
  
test('@Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika222@gmail.com";
   const password = "Iamking@000";
   const productName = 'ADIDAS ORIGINAL';

   const loginPage = new LoginPage(page);

   await loginPage.goto();
   await loginPage.validLogin(email, password);
  
   const dashboardPage = new DashboardPage(page);
   await dashboardPage.searchProduct(productName);
   await dashboardPage.navigateToCart();

   const cartPage = new CartPage(page);
   cartPage.checkAddedProduct();
   cartPage.checkOut();
 
   const paymentPage = new PaymentPage(page);
   paymentPage.selectCountry();
 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 

});
 
 