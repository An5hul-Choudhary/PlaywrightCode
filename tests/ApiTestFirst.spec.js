const {test, expect, request} = require('@playwright/test')
const {ApiUtils} = require('./Utils/ApiUtils')
const requestPayload = {userEmail: "anshika222@gmail.com", userPassword: "Iamking@000"};
let token;
const orderApiRequestPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};
let orderId;

let response;
test.beforeAll( async() => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, requestPayload);
    response = await apiUtils.createOrder(orderApiRequestPayload);
   
});

test("Login Using API", async ({page}) => {
    //js file- Login js, DashboardPage

    //Hitting login via api and storing token in dev console under application tab local storage

    await page.addInitScript(value => {

         window.localStorage.setItem('token', value);
    }, response.token);

    const email = "anshika222@gmail.com";
    const productName = 'ADIDAS ORIGINAL';
    
    await page.goto("https://rahulshettyacademy.com/client/");
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Iamking@000");
    // await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    
    /* 
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
       if (await products.nth(i).locator("b").textContent() === productName) {
          //add to cart
          await products.nth(i).locator("text= Add To Cart").click();
          break;
       }
    }
  
    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
  
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
  
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
  
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
 
*/

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  
 
 });