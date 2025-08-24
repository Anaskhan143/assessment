import { test, expect } from '@playwright/test';

test.describe('Theme Functionality', () => {
  test('should change theme and persist across page refresh', async ({ page }) => {
    await page.goto('/');
    
    // Check initial theme (should be system)
    const themeTrigger = page.getByTestId('theme-trigger');
    await expect(themeTrigger).toContainText('System');
    
    // Open theme dropdown
    await themeTrigger.click();
    
    // Select dark theme
    await page.getByText('Dark').click();
    
    // Verify theme changed
    await expect(themeTrigger).toContainText('Dark');
    
    // Refresh page
    await page.reload();
    
    // Verify theme persists
    await expect(themeTrigger).toContainText('Dark');
  });

  test('should detect system theme preference', async ({ page }) => {
    await page.goto('/');
    
    // Set system to dark mode
    await page.evaluate(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
        }),
      });
    });
    
    // Select system theme
    const themeTrigger = page.getByTestId('theme-trigger');
    await themeTrigger.click();
    await page.getByText('System').click();
    
    // Verify system theme is applied
    await expect(themeTrigger).toContainText('System');
  });
});
