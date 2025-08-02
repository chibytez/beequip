import { test, expect } from "../fixtures/fixtures";
import { config } from '../config';
test.describe('Beequip Marketplace Lease Quote Journey', () => {
    test('Complete lease quote journey for a truck with filters', async ({
      homePage,
      marketplacePage,
      page,
      truckAdPage,
      leaseCalculatorPage,
      quotePage
    }) => {
      await test.step('Navigate to marketplace', async () => {
        await homePage.navigateToMarketplace();
      });

      await test.step('Navigate to Schuifzeilen section', async () => {
        await marketplacePage.navigateToSchuifzeilen();
      });

      await test.step('Apply truck filters', async () => {
        await truckAdPage.filterTruck('2018', '2023', '300000');
      });

      await test.step('Select first search result', async () => {
        await truckAdPage.searchResult.first().click();
      });

      await test.step('Initiate lease calculation', async () => {
        await truckAdPage.calculateAmountBtn.click();
      });

      await test.step('Calculate lease with Beequip', async () => {
        await leaseCalculatorPage.calculateLease("Beequip", config.testUser.email);
        await page.waitForTimeout(10000); // Consider replacing with a more reliable wait
      });

      await test.step('Adjust lease terms', async () => {
        await leaseCalculatorPage.adjustLeaseTerms('5000', '95');
      });

      await test.step('Submit quote request', async () => {
        await quotePage.submitQuoteRequest({
          name: config.testUser.name,
          phone: config.testUser.phone,
          email: config.testUser.email
        });
      });

      await test.step('Verify confirmation', async () => {
        await quotePage.verifyConfirmation();
      });
    });
    
    test.describe('Data-driven lease term tests', () => {
      const testCases = [
        { downPayment: '2000', duration: '24' },
        { downPayment: '5000', duration: '48' },
        { downPayment: '10000', duration: '60' }
      ];

      for (const testCase of testCases) {
        test(`Verify monthly price with downPayment ${testCase.downPayment} and term ${testCase.duration}`, async ({
          page,
          homePage,
          marketplacePage,
          truckAdPage,
          leaseCalculatorPage,
          quotePage
        }) => {
          await test.step('Navigate to marketplace', async () => {
            await homePage.navigateToMarketplace();
          });

          await test.step('Navigate to Schuifzeilen section', async () => {
            await marketplacePage.navigateToSchuifzeilen();
          });

          await test.step('Apply truck filters', async () => {
            await truckAdPage.filterTruck('2018', '2023', '300000');
          });

          await test.step('Select first search result', async () => {
            await truckAdPage.searchResult.first().click();
          });

          await test.step('Initiate lease calculation', async () => {
            await truckAdPage.calculateAmountBtn.click();
          });

          await test.step('Calculate lease with Beequip', async () => {
            await leaseCalculatorPage.calculateLease("Beequip", config.testUser.email);
            await page.waitForTimeout(10000); // Consider replacing with a more reliable wait
          });

          await test.step(`Adjust lease terms with ${testCase.downPayment} down payment and ${testCase.duration} months duration`, async () => {
            await leaseCalculatorPage.adjustLeaseTerms(testCase.downPayment, testCase.duration);
          });

          await test.step('Get and verify monthly payment value', async () => {
            const monthlyPrice = await leaseCalculatorPage.getMonthlyPaymentValue();
            expect(monthlyPrice).toBeLessThanOrEqual(Number(testCase.duration));
          });
        });
      }
    });
})