import { Page, Locator } from '@playwright/test';
import { config } from '../config';

export class LeaseCalculatorPage {
    readonly page: Page;
    readonly companySearchInput: Locator;
    readonly leaseCompany: Locator;
    readonly emailInput: Locator;
    readonly calculateLeaseBtn: Locator;
    readonly depositInput: Locator;
    readonly durationInput: Locator;
    readonly suggestionContainer: Locator;
    readonly getQuoteBtn: Locator;
    readonly monthlyPayment: Locator;

    constructor(page: Page) {
        this.page = page;
        this.companySearchInput = page.locator('[data-hook="company-search-input"]');
        this.leaseCompany = page.locator('#downshift-0-item-0');
        this.emailInput = page.locator('[data-hook="contact-person-email"]');
        this.calculateLeaseBtn = page.locator('[data-hook="go-to-lease-price"]');
        this.depositInput = page.locator('[data-hook="downpayment-input"]');
        this.durationInput = page.locator('[data-hook="tenor-input"]');
        this.suggestionContainer = page.locator('[data-hook="suggestions-container"]');
        this.getQuoteBtn = page.locator('[data-hook="go-to-advice-page"]');
        this.monthlyPayment = page.locator('[data-hook="monthly-payment"]');
        
    }

    /**
     * Calculate lease for a specific company and email
     * @param company - Lease company name to search and select
     * @param email - Email address to input
     */
    async calculateLease(company: string, email: string) {
        await this.companySearchInput.fill(company)
        await this.leaseCompany.click()
        await this.emailInput.fill(email)

        await this.page.route('**/api/lease-calculator/calculate', route => {
            route.continue({
              headers: {
                ...route.request().headers(),
                [config.bypassHeader.name]: config.bypassHeader.value
              }
            });
        });
        await this.calculateLeaseBtn.click()
    };

    /**
     * Adjust lease terms and get a new quote
     * @param deposit - Down payment amount (e.g., "5000")
     * @param duration - Lease duration in months (e.g., "36")
     */
    async adjustLeaseTerms(deposit: string, duration: string){
        await this.suggestionContainer.waitFor({state: 'visible', timeout: 20000})
        await this.depositInput.fill(deposit);
        await this.page.waitForTimeout(1000)
        await this.durationInput.clear()
        await this.durationInput.fill(duration);
        await this.getQuoteBtn.click();
    };

    /**
     * Gets the numeric monthly payment value from the UI
     * @returns Monthly payment amount as a number
     * @throws Error if value can't be retrieved or parsed
     * 
     */
     async getMonthlyPaymentValue(): Promise<number> {
        try {
        const paymentText = await this.monthlyPayment.innerText();
        return this.parsePaymentText(paymentText);
        } catch (error) {
        console.error('Error getting monthly payment value:', error);
        throw new Error('Could not retrieve monthly payment value');
        }
    };

    /**
     * Parses payment text into a numeric value
     * @param text - Raw payment text (e.g., "€ 1,274*")
     * @returns Parsed numeric value (e.g., 1274)
     * @throws Error if text cannot be parsed to a valid number
     */
    private parsePaymentText(text: string): number {
        const numericString = text.replace(/[^\d,.]/g, '')
                                .replace(',', '.'); 
        const value = parseFloat(numericString);
        
        if (isNaN(value)) {
        throw new Error(`Could not parse payment value from text: "${text}"`);
        }
        return value;
    };
}