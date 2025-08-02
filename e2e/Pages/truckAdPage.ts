import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class TruckAdPage extends BasePage {
    readonly bouwjaarBtn: Locator;
    readonly fromYearInput: Locator;
    readonly toYearInput: Locator;
    readonly okBtn: Locator;
    readonly KilometerstandBtn: Locator;
    readonly cilindersBtn: Locator;
    readonly checkbox: Locator;
    readonly searchResult: Locator;
    readonly calculateAmountBtn: Locator;

    constructor(page: Page) {
        super(page)
        this.bouwjaarBtn = page.locator('legend[aria-controls]:has-text("Bouwjaar")');
        this.fromYearInput = page.locator('input[name="from"][type="number"]');
        this.toYearInput = page.locator('input[name="to"][type="number"]');
        this.okBtn = page.getByRole('button', { name: 'Ok' });
        this.KilometerstandBtn = page.locator('legend[aria-controls]:has-text("Kilometerstand")');
        this.cilindersBtn = page.locator('legend[aria-controls]:has-text("Aantal cilinders")');
        this.checkbox = page.locator('input[type="checkbox"]:nth-match(:visible)');
        this.searchResult = page.locator('[data-hook="object-card"]');
        this.calculateAmountBtn = page.locator('[data-hook="lease-offer-button"]')
    }

    /**
     * Applies filters to truck search results
     * 
     * @param yearFrom - Minimum manufacturing year (e.g., "2018")
     * @param yearTo - Maximum manufacturing year (e.g., "2023")
     * @param mileage - Maximum kilometer/mileage value (e.g., "300000")
     * Note: Contains brief timeouts for UI stabilization
     */

    async filterTruck(
        yearFrom: string,
        yearTo: string,
        mileage: string,
    ){
      await this.bouwjaarBtn.click();
      await this.fromYearInput.fill(yearFrom);
      await this.toYearInput.fill(yearTo);
      await this.okBtn.click();
      await this.bouwjaarBtn.click();
      await this.page.waitForTimeout(1000)
      await this.KilometerstandBtn.click()
      await this.toYearInput.fill(mileage);
      await this.okBtn.click();
      await this.KilometerstandBtn.click()
      await this.page.waitForTimeout(1000)
      await this.cilindersBtn.click();
      const checkbox =  this.page.getByRole('checkbox', { name: '6 2' })
      await checkbox.check()
      await this.page.waitForTimeout(1000)
    };
};