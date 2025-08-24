import { test, expect } from '@playwright/test';

test.describe('Combined Theme and Language Functionality', () => {
  test('should handle both theme and language changes together', async ({ page }) => {
    await page.goto('/');
    
    // Change theme to dark
    const themeTrigger = page.getByTestId('theme-trigger');
    await themeTrigger.click();
    await page.getByText('Dark').click();
    
    // Change language to Spanish
    const languageTrigger = page.getByTestId('language-trigger');
    await languageTrigger.click();
    await page.getByText('Spanish').click();
    
    // Verify both changes
    await expect(themeTrigger).toContainText('Dark');
    await expect(languageTrigger).toContainText('Spanish');
    
    // Refresh page
    await page.reload();
    
    // Verify both persist
    await expect(themeTrigger).toContainText('Dark');
    await expect(languageTrigger).toContainText('Spanish');
  });

  test('should verify cookies are set correctly', async ({ page }) => {
    await page.goto('/');
    
    // Change theme and language
    const themeTrigger = page.getByTestId('theme-trigger');
    await themeTrigger.click();
    await page.getByText('Light').click();
    
    const languageTrigger = page.getByTestId('language-trigger');
    await languageTrigger.click();
    await page.getByText('Spanish').click();
    
    // Check cookies in browser
    const cookies = await page.context().cookies();
    const themeCookie = cookies.find(c => c.name === 'theme');
    const languageCookie = cookies.find(c => c.name === 'language');
    
    expect(themeCookie?.value).toBe('light');
    expect(languageCookie?.value).toBe('es');
  });
});
