import { test, expect } from '@playwright/test';
import path from 'path';

const pages = ['index', 'about', 'skills', 'projects', 'certificates', 'contact'];

for (const pageName of pages) {
  test(`visual regression test for ${pageName} page`, async ({ page }) => {
    // Setting a consistent viewport for all screenshots
    await page.setViewportSize({ width: 1280, height: 800 });
    const filePath = path.join(process.cwd(), `${pageName}.html`);
    await page.goto(`file://${filePath}`);
    // A brief wait to ensure all elements have loaded
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot(`${pageName}.png`, { fullPage: true, animations: 'disabled' });
  });
}
