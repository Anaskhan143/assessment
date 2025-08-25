import { test, expect } from '@playwright/test';

test.describe('Combined Theme and Language Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear cookies before each test to ensure clean state
    await page.context().clearCookies();
  });

  test('Combined Usage: User changes both settings, closes browser, reopens, both persist', async ({ page }) => {
    const themeTrigger = page.getByTestId('theme-trigger');
    const languageTrigger = page.getByTestId('language-trigger');
    
    // Change theme to Dark
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Dark' }).click();
    await expect(themeTrigger).toContainText('Dark');
    
    // Change language to Spanish
    await languageTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Spanish' }).click();
    await expect(languageTrigger).toContainText('Español');
    
    // Simulate browser restart by opening a new page in the same context
    const newPage = await page.context().newPage();
    await newPage.goto('/');
    const newThemeTrigger = newPage.getByTestId('theme-trigger');
    const newLanguageTrigger = newPage.getByTestId('language-trigger');
    
    // Both settings should persist
    await expect(newThemeTrigger).toContainText('Oscuro'); // Spanish translation
    await expect(newLanguageTrigger).toContainText('Español');
    
    await newPage.close();
  });

  test('Cookie Verification: Verify actual cookies are set in browser', async ({ page }) => {
    const themeTrigger = page.getByTestId('theme-trigger');
    const languageTrigger = page.getByTestId('language-trigger');
    
    // Set specific values
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Light' }).click();
    
    await languageTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Spanish' }).click();
    
    // Check cookies are set with correct properties
    const cookies = await page.context().cookies();
    
    const themeCookie = cookies.find(c => c.name === 'theme');
    expect(themeCookie?.value).toBe('light');
    expect(themeCookie?.path).toBe('/');
    expect(themeCookie?.httpOnly).toBe(false);
    
    const languageCookie = cookies.find(c => c.name === 'language');
    expect(languageCookie?.value).toBe('es');
    expect(languageCookie?.path).toBe('/');
    expect(languageCookie?.httpOnly).toBe(false);
  });

  test('Complex Workflow: Multiple theme and language changes with persistence', async ({ page }) => {
    const themeTrigger = page.getByTestId('theme-trigger');
    const languageTrigger = page.getByTestId('language-trigger');
    
    // Test sequence: Light + English
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Light' }).click();
    
    await languageTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'English' }).click();
    
    await page.reload();
    await expect(themeTrigger).toContainText('Light');
    await expect(languageTrigger).toContainText('English');
    
    // Test sequence: Dark + Spanish
    await themeTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Dark' }).click();
    
    await languageTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Spanish' }).click();
    
    await page.reload();
    await expect(themeTrigger).toContainText('Oscuro'); // Spanish translation
    await expect(languageTrigger).toContainText('Español');
  });
});
