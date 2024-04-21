class LoginPage{

    constructor(page){
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
        this.signInBtn = page.locator("[value='Login']");
    }

    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email, password){
        await this.userName.fill(email);
        await this.passWord.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};
