import { test, expect } from '@playwright/test';

test.describe('Language Functionality', () => {
  test('should change language and persist across page refresh', async ({ page }) => {
    await page.goto('/');
    
    // Check initial language (should be English)
    const languageTrigger = page.getByTestId('language-trigger');
    await expect(languageTrigger).toContainText('English');
    
    // Open language dropdown
    await languageTrigger.click();
    
    // Select Spanish
    await page.getByText('Spanish').click();
    
    // Verify language changed
    await expect(languageTrigger).toContainText('Spanish');
    
    // Refresh page
    await page.reload();
    
    // Verify language persists
    await expect(languageTrigger).toContainText('Spanish');
  });

  test('should translate UI text when language changes', async ({ page }) => {
    await page.goto('/');
    
    // Check English text
    await expect(page.getByText('Theme & Language Toggle App')).toBeVisible();
    
    // Change to Spanish
    const languageTrigger = page.getByTestId('language-trigger');
    await languageTrigger.click();
    await page.getByText('Spanish').click();
    
    // Verify Spanish text appears
    await expect(page.getByText('Aplicación de Cambio de Tema e Idioma')).toBeVisible();
  });
});
