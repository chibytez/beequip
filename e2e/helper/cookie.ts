import { Page, Locator } from '@playwright/test';

/**
 * Handles cookie consent modal with flexible options
 * @param page - Playwright page instance
 * @param options - Configuration options
 * @param options.strategy - 'accept-all' | 'necessary-only' (default: 'accept-all')
 * @param options.waitForHidden - Wait for modal to close (default: true)
 */
 export async function handleCookieConsent(
    page: Page,
    options?: {
      strategy?: 'accept-all' | 'necessary-only';
      waitForHidden?: boolean;
    }
  ) {
    const strategy = options?.strategy || 'accept-all';
    const shouldWait = options?.waitForHidden ?? true;
  
    const acceptAllBtn = page.getByRole('button', { name: 'Alle cookies toestaan' });
    const necessaryOnlyBtn = page.getByRole('button', { name: 'Alleen noodzakelijke cookies' });
  
    try {
      const button = strategy === 'accept-all' ? acceptAllBtn : necessaryOnlyBtn;
      await button.click({ timeout: 5000 });
  
      if (shouldWait) {
        await page.locator('text=Leuk dat je onze website bezoekt!').waitFor({ state: 'hidden', timeout: 3000 });
      }
    } catch (error) {
      console.warn('Cookie consent handling failed:', error instanceof Error ? error.message : error);
      // Fail silently in case modal doesn't appear
    }
  }