import { test, expect } from '@playwright/test';
import { adminData } from '../test-data/login.data';

test.describe('Login tests', () => {
  test('successful login', async ({ page }) => {
    // Arrange
    const adminEmail = adminData.adminEmail;
    const adminPassword = adminData.adminPassword;
    const baseUrl = 'http://localhost:5173/';

    // Act
    await page.goto(baseUrl);
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(adminEmail);
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill(adminPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Assert
    await expect(page.locator('#user-name')).toHaveText(adminEmail);
  });
});
