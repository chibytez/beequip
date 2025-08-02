import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config';

export class QuotePage {

    readonly page: Page;
    readonly nameInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly preference: Locator;
    readonly requestDealBtn: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('[data-hook="request-deal-name-input"]');
        this.phoneInput = page.locator('[data-hook="request-deal-tel-input"]');
        this.emailInput = page.locator('[data-hook="request-deal-email-input"]');
        this.preference = page.locator('.sc-khQegj.bQKRSx').first();
        this.requestDealBtn = page.locator('[data-hook="request-deal-submit-button"]');
        this.confirmationMessage = page.locator('[data-hook="request-advice-thank-you"]')
        
    }

    /**
     * Submits a quote request with user details
     * @param userDetails - Object containing user information
     * @param userDetails.name - User's full name
     * @param userDetails.phone - User's phone number
     * @param userDetails.email - User's email address
     */
    async submitQuoteRequest(userDetails: {
        name: string;
        phone: string;
        email: string;
    }){
        await this.nameInput.fill(userDetails.name);
        await this.phoneInput.fill(userDetails.phone);
        await this.emailInput.fill(userDetails.email);
        await this.preference.check();
        await this.requestDealBtn.click()
    }

    /**
     * Verifies the quote confirmation message is visible
     * @throws Will throw an error if confirmation message is not found
     */
    async verifyConfirmation() {
        await this.confirmationMessage.waitFor()
        await expect(this.page.getByText('We hebben de offerte naar je toegestuurd via e-mail')).toBeVisible();
    }
}