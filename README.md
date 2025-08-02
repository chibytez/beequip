# Test automation engineer test

We'll be using this test to assess your skill level as a test automation engineer. This test is designed to test your skills which are needed in the day-to-day job of a test automation engineer at [Beequip](https://beequip.com). 
We expect you to spend a maximum of four hours on this test. You can use Google and Stack Overflow, just like you would normally do. Don't worry when you run out of time though, we would still like to see what you came up with!

## Objectives and requirements

Use the Playwright set-up to implement and end-to-end test to the user journey of visiting Beequip's website, finding pre-owned equipment on the marketplace and requesting a quote using the lease calculator.
This means that we expect you to come up with assertions for the following interactions:

  - Visit the **test** website of Beequip (https://staging.beequip.com/)
    - This website is protected by Basic authentication, in the `tests/example.spec.js` credentials are provided to run the Playwright tests
    - You can use the same credentials to navigate the page on your own browser
  - Navigate from the website to the Market_Vrachtwagen_ with _Schuifzeilen_place
  - Find a  that fits the following requirements:
    - With a _bouwjaar_ between 2018 and 2023
    - With a _kilometerstand_ less than 300.000 kilometers
    - With six _cilinders_
  - Navigate to the ad of the found equipment
  - Calculate a monthly price using the lease calculator
    - Requests to the lease calculator require an additional header for login-bypass. 
      - `x-vercel-protection-bypass: VreVj3DC9fVuVRcQzUoz3rtAgitcbX6M` 
    - Search for Beequip as the company (_KVK-nummer:_ 63204258)
    - Use the `@example.com` or `@mailinacomtor.com` domein
    - **Caution:** Don't calculate for other companies, to prevent burdening our sales team
  - Increase the _aanbetaling_ and _looptijd_ to reduce the monthly price
  - Request a quote
  - **Stretch goal:** Add assertions for the email contents
  - **Stretch goal:** Add data-driving tests for the _aanbetaling_ and _looptijd_ components

Requirements that you need to take into account:

  - Playwright should be used to implement the tests
  - Typescript is not mandatory
  - At least two browsers should be supported
  - A report with the test findings should be produced

## Getting started

Make sure that you can run Node 18.x and Yarn 1.22.x on your laptop and get started using:

```
# Install the dependencies
yarn install

# Run the tests
yarn playwright test
yarn playwright test --ui
```

## Deliverables

Send us a link to the hosted repository with your code. It can be hosted anywhere e.g. Github, Gitlab as long as you provide us access. 
Include all the code and instructions that are necessary to run the end-to-end tests and to verify the requirements.
Write a small paragraph (3-6 sentences) on your approach and design decisions.

## Questions

In case you have questions about the test you can contact Jan van der Pas (jan.vanderpas@beequip.nl) or Marthyn Olthof (marthyn.olthof@beequip.nl).


## Solutions:

### Approach & Design Decisions
This test suite follows the Page Object Model pattern to create maintainable and reusable test code. I prioritized role-based selectors over fragile CSS classes for better test stability, and implemented data-driven tests for lease term variations. The authentication flow is handled through fixtures to ensure proper setup before each test. TypeScript provides type safety, and the config separation (test data vs. framework config) enables easy environment-specific adjustments. The suite verifies the complete user journey from truck search to lease quote request while handling dynamic pricing calculations.

## Setup Instructions
 1. Install dependencies
  # Using npm:
  npm install
  npm install -D @playwright/test typescript

  # Using Yarn:
  yarn add -D @playwright/test typescript

## Run all tests in UI mode:
npm run test
# or 
yarn test

## Run tests in specific browsers:

# Chrome
npm run test:chromium
yarn test:chromium

# Firefox
npm run test:firefox 
yarn test:firefox

## View HTML test report:
npm run test:report
yarn test:report

## Project Structure

e2e/
├── config.ts              # Environment configuration
├── fixtures.ts            # Test fixtures
├── pages/                 # Page objects
│   ├── basePage.ts        # Base page class
│   ├── homePage.ts        # Home page interactions
│   ├── marketplacePage.ts # Marketplace page
│   ├── truckAdPage.ts     # Truck listing page
│   ├── leaseCalculatorPage.ts # Lease calculator
│   └── quotePage.ts       # Quote request page
specs/
    └── beequip.spec.ts       # Main test scenarios# beequip
