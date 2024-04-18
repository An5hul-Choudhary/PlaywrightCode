const {test, expect} = require('@playwright/test');
const { timeLog } = require('console');
const exp = require('constants');



test('First Playwright test without cookies', async ({  page }) => {

	const userName = page.locator('#username');
	const passWord = page.locator("input[id='password']");
	const signIn = page.locator("[name='signin']");
	const cardTitles = page.locator(".card-body a");

    page.route('**/*.{png,jpg,jpeg}', route => route.abort());

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
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

