const { test, expect } = require('@playwright/test');

// 把瀏覽器版單元測試 (tests.html) 納入 CI：
// tests.html 載入真正的 growth.js + who.js，跑完會顯示總結。
// 這裡斷言全部通過、且沒有任何 .test.fail，公式 drift 就會在 CI 被擋下。
test('unit tests in tests.html all pass', async ({ page }) => {
  await page.goto('/tests.html');
  await expect(page.locator('.summary')).toContainText('All', { timeout: 10000 });
  await expect(page.locator('.test.fail')).toHaveCount(0);
});
