const {test, expect} = require('@playwright/test');
const exp = require('constants');


test("More Validation test", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'elementScreenshot.png'});// Taking element screenshot

    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});  // Taking full page screenshot

    expect(await page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator('#mousehover').hover();

    const frameObj = page.frameLocator("#courses-iframe");
    const students =await frameObj.locator(".count-text").first().textContent();
    console.log('Total students are: ' + students);
    const courses =await frameObj.locator(".count-text").nth(1).textContent();
    console.log('Total courses are: ' + courses);
    const projects =await frameObj.locator(".count-text").nth(3).textContent();
    console.log('Total projects are: ' + projects);

})

test.only("Screenshot comparison", async({page}) => {

    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})

