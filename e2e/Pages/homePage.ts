import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  
  private readonly marketPlaceLink: Locator
  constructor(page: Page) {
    super(page);
    this.marketPlaceLink = page.locator('a[href="https://www.beequip.com/marktplaats/"]').nth(0)
  }
  
  /**
 * Navigates to the Marketplace page by clicking the Marketplace link
 * and waits for the page to fully load.
 * @returns {Promise<void>} A promise that resolves when navigation is complete
 * @throws {Error} Throws an error if:
 * - The Marketplace link is not found
 * - The page fails to load after clicking
 * - The navigation times out
 */
  async navigateToMarketplace(): Promise<void> {
    await this.marketPlaceLink.click();
    await this.waitForPageLoad();
  }
}