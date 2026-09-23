
import { test, expect } from '@playwright/test';
test('home has destacados', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Destacados')).toBeVisible();
});
