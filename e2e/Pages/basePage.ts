import { Page } from '@playwright/test';
import { config } from '../config';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

    /**
   * Go to a page with basic auth
   * @param path - The page path (e.g., 'dashboard' goes to https://baseurl/dashboard)
   */
  async navigateTo(path: string) {
    await this.page.setExtraHTTPHeaders({
      Authorization: `Basic ${btoa(`${config.auth.username}:${config.auth.password}`)}`
    });
    await this.page.goto(`${config.baseUrl}/${path}`);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}