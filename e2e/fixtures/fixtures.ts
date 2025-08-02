import { test as base } from '@playwright/test';
import { HomePage } from '../Pages/homePage'
import { MarketplacePage } from '../Pages/marketplacePage';
import { TruckAdPage } from '../Pages/truckAdPage';
import { LeaseCalculatorPage } from '../Pages/leaseCalculatorPage';
import { QuotePage } from '../Pages/quotePage';
import { config } from '../config'

type MyFixtures = {
    homePage: HomePage;
    marketplacePage: MarketplacePage;
    truckAdPage: TruckAdPage;
    leaseCalculatorPage: LeaseCalculatorPage;
    quotePage: QuotePage;
}

export const test = base.extend<MyFixtures>({
    page: async ({ page}, use) => {
        await page.setExtraHTTPHeaders({
            Authorization: `Basic ${btoa(`${config.auth.username}:${config.auth.password}`)}` 
        });
        await use(page);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateTo('');
        await use(homePage);
    },
    marketplacePage: async ({ page }, use) => {
        await use(new MarketplacePage(page));
    },
    truckAdPage: async ({ page }, use) => {
        await use(new TruckAdPage(page));
    },
    leaseCalculatorPage: async ({ page }, use) => {
        await use(new LeaseCalculatorPage(page));
    },
    quotePage: async ({ page }, use) => {
        await use(new QuotePage(page));
    }
})

export { expect } from '@playwright/test';