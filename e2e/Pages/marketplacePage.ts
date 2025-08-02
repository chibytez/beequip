import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { handleCookieConsent } from '../helper/cookie'

export class MarketplacePage extends BasePage {
    private categoryBtn: Locator;
    private vrachtwagenCategory: Locator;

    constructor(page: Page) {
        super(page);
        this.categoryBtn = page.getByRole('button', { name: 'Alle categorieën' });
        this.vrachtwagenCategory = page.locator('text=Vrachtwagen').first();
    }

    /**
   * Hovers over 'Vrachtwagen' category and clicks 'Schuifzeilen' submenu item
   */
  async navigateToSchuifzeilen(): Promise<void> {
    await   handleCookieConsent(this.page);
    await this.categoryBtn.hover()
    await this.vrachtwagenCategory.hover();
    const schuifzeilenItem = this.page.locator('text=Schuifzeilen').first();
    await schuifzeilenItem.click();
  }

}