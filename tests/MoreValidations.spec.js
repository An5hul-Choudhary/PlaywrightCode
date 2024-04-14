const {test, expect} = require('@playwright/test')


test("More Validation test", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
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

