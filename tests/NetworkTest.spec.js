const {test,expect} = require('@playwright/test');
let webContext;
const fakePayLoad = {data:[],message:"No Orders"};

test.beforeAll(async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "anshika222@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
})

// Mocking the response to get the cart as empty and checking the message 
test('Login', async() =>{

    const page = await webContext.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoad);
        route.fulfill({
            response,
            body,
        })
        //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    }
)
    
    await page.locator("button[routerlink*='myorders']").click();
    //waiting for response
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
      
 
})