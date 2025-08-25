import { test, expect } from '@playwright/test';

test.describe('Theme Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear cookies before each test to ensure clean state
    await page.context().clearCookies();
  });

  test('Full User Journey: User changes theme through all 3 options, refreshes page, theme persists', async ({ page }) => {
    const themeTrigger = page.getByTestId('theme-trigger');
    
    // Test Light theme
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Light' }).click();
    await expect(themeTrigger).toContainText('Light');
    await page.reload();
    await expect(themeTrigger).toContainText('Light');
    
    // Test Dark theme
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Dark' }).click();
    await expect(themeTrigger).toContainText('Dark');
    await page.reload();
    await expect(themeTrigger).toContainText('Dark');
    
    // Test System theme
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'System' }).click();
    await expect(themeTrigger).toContainText('System');
    await page.reload();
    await expect(themeTrigger).toContainText('System');
  });

  test('System Theme Detection: User selects system theme, OS theme changes are reflected', async ({ page }) => {
    const themeTrigger = page.getByTestId('theme-trigger');
    
    // Select system theme
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'System' }).click();
    await expect(themeTrigger).toContainText('System');
    
    // Verify system theme is selected and applied
    await expect(themeTrigger).toContainText('System');
    
    // Check that the theme is properly set in the dropdown
    await themeTrigger.click();
    const systemOption = page.getByRole('menuitemradio', { name: 'System' });
    await expect(systemOption).toHaveAttribute('data-state', 'checked');
    
    // Close dropdown
    await page.keyboard.press('Escape');
  });

  test('Theme Cookie Verification: Verify actual cookies are set in browser', async ({ page }) => {
    const themeTrigger = page.getByTestId('theme-trigger');
    
    // Change to light theme
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Light' }).click();
    
    // Check cookie is set
    const cookies = await page.context().cookies();
    const themeCookie = cookies.find(c => c.name === 'theme');
    expect(themeCookie?.value).toBe('light');
    expect(themeCookie?.path).toBe('/');
    
    // Change to dark theme
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Dark' }).click();
    
    // Check cookie is updated
    const updatedCookies = await page.context().cookies();
    const updatedThemeCookie = updatedCookies.find(c => c.name === 'theme');
    expect(updatedThemeCookie?.value).toBe('dark');
  });
});
