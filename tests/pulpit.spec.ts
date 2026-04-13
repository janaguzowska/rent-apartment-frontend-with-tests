import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
  // const baseUrl = 'http://localhost:5173/';
  const adminEmail = 'admin@admin.pl';
  const adminPassword = 'admin';

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Search offers in Warsaw', async ({ page }) => {
    const studioInOldTown = 'Modern Studio in Old Town';

    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(adminEmail);
    await page.getByRole('textbox', { name: 'Password' }).fill(adminPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByTestId('city-select').click();
    await page.getByRole('option', { name: 'Warsaw' }).click();
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('link', { name: studioInOldTown }).first().click();
    await page.getByTestId('offer__name').click();

    await expect(page.getByTestId('offer__name')).toHaveText(studioInOldTown);
  });

  test('Reservation apartment by user', async ({ page }) => {
    const colosseum2 = 'Luxury Villa near Colosseum2';
    const userName = 'Adam';
    const userLastName = 'Kwiatkowski';

    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(adminEmail);
    await page.getByRole('textbox', { name: 'Password' }).fill(adminPassword);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: colosseum2 }).first().click();
    await page
      .getByRole('textbox', { name: 'Check-in date - Check-out date' })
      .click();
    await page.getByRole('row', { name: 'Choose Monday, April 13th,' }).click();
    await page
      .getByRole('gridcell', { name: 'Choose Sunday, April 19th,' })
      .click();
    await page.getByRole('button', { name: 'Reserve' }).click();
    await page.getByTestId('firstName').fill(userName);
    await page.getByTestId('lastName').fill(userLastName);
    await page.getByRole('button', { name: 'Next step' }).click();

    await expect(
      page.getByTestId(`participant-${userName} ${userLastName}`),
    ).toContainText(`${userName} ${userLastName}`);
  });
});
