import { test, expect } from '@playwright/test';

test.describe('Language Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear cookies before each test to ensure clean state
    await page.context().clearCookies();
  });

  test('Language Persistence: User changes language, refreshes page, language persists', async ({ page }) => {
    const languageTrigger = page.getByTestId('language-trigger');
    
    // Change to Spanish
    await languageTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Spanish' }).click();
    await expect(languageTrigger).toContainText('Español');
    
    // Refresh page
    await page.reload();
    
    // Language should persist
    await expect(languageTrigger).toContainText('Español');
  });

  test('UI Translation: Should translate UI text when language changes', async ({ page }) => {
    // Check English text initially
    await expect(page.getByRole('banner').getByRole('heading', { name: 'Theme & Language Toggle App' })).toBeVisible();
    await expect(page.getByText('A simple web application demonstrating cookie-based session management with React Router v7 and shadcn/ui')).toBeVisible();
    
    // Change to Spanish
    const languageTrigger = page.getByTestId('language-trigger');
    await languageTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Spanish' }).click();
    
    // Check Spanish text
    await expect(page.getByRole('banner').getByRole('heading', { name: 'Aplicación de Alternancia de Tema e Idioma' })).toBeVisible();
    await expect(page.getByText('Una aplicación web simple que demuestra la gestión de sesiones basada en cookies con React Router v7 y shadcn/ui')).toBeVisible();
  });

  test('Language Cookie Verification: Verify actual cookies are set in browser', async ({ page }) => {
    const languageTrigger = page.getByTestId('language-trigger');
    
    // Change to Spanish
    await languageTrigger.click();
    await page.locator('[role="menu"]').waitFor({ state: 'visible' });
    await page.getByRole('menuitemradio', { name: 'Spanish' }).click();
    
    // Check cookie is set
    const cookies = await page.context().cookies();
    const languageCookie = cookies.find(c => c.name === 'language');
    expect(languageCookie?.value).toBe('es');
    expect(languageCookie?.path).toBe('/');
  });
});
