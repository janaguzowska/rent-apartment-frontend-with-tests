import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
  test.only('successful login', async ({ page }) => {
    // Arrange
    const adminEmail = 'admin@admin.pl';
    const baseUrl = 'http://localhost:5173/';

    // Act
    await page.goto(baseUrl);
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(adminEmail);
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Assert
    await expect(page.locator('#user-name')).toHaveText('admin1@admin.pl');
  });
});
