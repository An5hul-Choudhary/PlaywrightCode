const {test, expect} = require('@playwright/test');
const { timeLog } = require('console');
const exp = require('constants');


test('First Playwright test', async ({ browser }) => {

	const context =await browser.newContext();
	const page =await context.newPage();
	await page.goto("https://www.google.com");

});

test('First Playwright test without cookies', async ({  page }) => {

	const userName = page.locator('#username');
	const passWord = page.locator("input[id='password']");
	const signIn = page.locator("[name='signin']");
	const cardTitles = page.locator(".card-body a");

	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	console.log(await page.title());
	// await expect(page).toHaveTitle("Google");

	//#username or //input[@id='username']
	await userName.fill("rahulshetty")
	//#password or //input[@id='password']
	await passWord.fill("learning");

	await signIn.click();
	console.log(await page.locator("[style*='block']").textContent());
	await expect(page.locator("[style*='block']")).toContainText('Incorrect');

	// Enterning correct details now
	await userName.fill("");
	await userName.fill("rahulshettyacademy");
	await signIn.click();

	console.log(await cardTitles.nth(0).textContent());  // it will wait until the DOM is attached so after this the next step of displaying all card titles is not failing
	const allTitles = await cardTitles.allTextContents(); //allTextContent returns array it can return 0 and many elements but playwright will not be able to understand how much to wait but in above it is sure that it will return one element only so it waits for that
	console.log(allTitles);



});

test("Login Automation First", async ({browser})=> {
    
	
    const context =await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

	const email = page.locator("#userEmail");
	const password = page.locator("#userPassword");

	await email.fill("anshika222@gmail.com");
	await password.fill("Iamking@000");
	await page.locator("#login").click();

	// const titlesFirst = await page.locator("h5 b").nth(0).textContent();
	// console.log(titlesFirst);

	// We should wait until all the network calls are made and data is retrieved which will be showing in the page so for that we are using waitForLoadState

	await page.waitForLoadState('networkidle');      
	// Or we can use -> await page.locator("h5 b").first().waitFor();

	const titles = await page.locator("h5 b").allTextContents();
	console.log(titles);

	//await page.pause();

});


test("UI Controls", async ({page}) => {

	const userName = page.locator('#username');
	const passWord = page.locator("input[id='password']");
	const signIn = page.locator("[name='signin']");
	const blinkText = page.locator("[href*='documents-request']");

	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	await page.locator("[type='radio']").last().click();
	await page.locator("#okayBtn").click();
	await expect(page.locator("[type='radio']").last()).toBeChecked();
	const drowDown = page.locator("select.form-control");
	await drowDown.selectOption("consult");
	await page.locator("#terms").click();
	expect(await page.locator("#terms").toBeChecked);
	await page.locator("#terms").uncheck();
	expect(await page.locator("#terms").isChecked()).toBeFalsy();
	await expect(blinkText).toHaveAttribute("class", "blinkingText");

	

	//await page.pause();

});

test("Child Windows Handle", async ({browser}) => {

	const context = await browser.newContext();
	const page = await context.newPage();
	
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	const blinkText = page.locator("[href*='documents-request']");

	const [newPage] = await Promise.all([
	context.waitForEvent('page'),  // It is a listener which will wait until the page is opened but in this case our page is opening after this step by clicking on blinkText so we will not be able to use await because it will not proceed to next step until this is finished so we have to run both parallely or asynchronously and we can do that by keeping this inside promiseAll
	blinkText.click(),       // will open the new page by clicking on the link
	]
    )
	const textIs = await newPage.locator(".red").textContent();
	console.log(textIs);
	const arrayText = textIs.split("@");
	const domain = arrayText[1].split(" ")[0];
	console.log(domain);
	await page.locator("#username").fill(domain);

	//await page.pause();

});
