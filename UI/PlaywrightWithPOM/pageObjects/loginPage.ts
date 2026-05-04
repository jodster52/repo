import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    userName = this.page.locator('#email');
    password = this.page.locator('#password');
    loginButton = this.page.getByRole('button', {name: 'Login'});
    pwdErrMsgLbl = this.page.locator("xpath=//label[@for='password']/following::p[1]");


    async gotoLoginPage() {
        await this.page.goto('/');
    }

    async loginWithCredentials(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}