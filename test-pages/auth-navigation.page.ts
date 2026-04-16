import { Locator, Page } from '@playwright/test';

export class AuthNavigationPage {
  private page: Page;
  private signInLink: Locator;
  private registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = this.page.getByRole('link', { name: 'Sign in' });
    this.registerLink = this.page.getByRole('link', { name: 'Register' });
  }

  async openLoginForm() {
    await this.signInLink.click();
  }

  async openRegister() {
    await this.registerLink.click();
  }
}
