const { test, expect } = require('@playwright/test');

test.describe('Baby Growth Tracker — smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login screen is visible on first load', async ({ page }) => {
    await expect(page.locator('#loginScreen')).toBeVisible();
    await expect(page.locator('.app-title')).toContainText('寶貝成長紀錄');
  });

  test('language toggle switches between zh and en', async ({ page }) => {
    await expect(page.locator('.app-title')).toContainText('寶貝成長紀錄');
    await page.locator('#loginLangEn').click();
    await expect(page.locator('.app-title')).toContainText('Baby Growth Tracker');
    await page.locator('#loginLangZh').click();
    await expect(page.locator('.app-title')).toContainText('寶貝成長紀錄');
  });

  test('page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle('寶貝成長紀錄');
  });

  test('google sign-in button is present', async ({ page }) => {
    await expect(page.locator('.google-btn')).toBeVisible();
  });

  test('home and child screens are hidden on initial load', async ({ page }) => {
    await expect(page.locator('#homeScreen')).toBeHidden();
    await expect(page.locator('#childScreen')).toBeHidden();
  });
});
