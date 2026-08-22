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
    {name: 'chromium-mobile', use: {...devices['Pixel 7']}},
  ],
  webServer: {
    command: 'npx --yes pnpm@11.22.0 start',
    url: 'http://127.0.0.1:3000/pt',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
