import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', {open: 'never'}]],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {name: 'chromium-desktop', use: {...devices['Desktop Chrome']}},
    {name: 'chromium-dark', use: {...devices['Desktop Chrome'], colorScheme: 'dark'}},
    {name: 'chromium-mobile', use: {...devices['Pixel 7']}},
    {
      name: 'chromium-narrow',
      use: {
        viewport: {width: 320, height: 700},
        isMobile: true,
        hasTouch: true,
        userAgent: devices['Pixel 7'].userAgent,
      },
    },
    {
      name: 'chromium-tablet',
      use: {
        viewport: {width: 768, height: 1024},
        isMobile: true,
        hasTouch: true,
        userAgent: devices['Pixel 7'].userAgent,
      },
    },
  ],
  webServer: {
    command: 'pnpm start',
    url: 'http://127.0.0.1:3000/pt',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
