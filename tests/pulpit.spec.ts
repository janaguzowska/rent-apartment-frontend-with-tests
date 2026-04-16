import { test, expect } from '@playwright/test';
import { adminData } from '../test-data/login.data';
import { LoginPage } from '../test-pages/login.page';
import { AuthNavigationPage } from '../test-pages/auth-navigation.page';
import { reservationGuest } from '../test-data/users.data';
import { offersData } from '../test-data/offers.data';
import { SearchPage } from '../test-pages/search.page';
export { adminData } from '../test-data/login.data';

test.describe('Login tests', () => {
  const adminEmail = adminData.adminEmail;
  const adminPassword = adminData.adminPassword;

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Search offers in Warsaw', async ({ page }) => {
    const studioInOldTown = offersData.warsawOffer.title;
    const warsawCity = offersData.warsawOffer.city;

    const authNavigationPage = new AuthNavigationPage(page);
    const loginPage = new LoginPage(page);

    await authNavigationPage.openLoginForm();
    await loginPage.login(adminEmail, adminPassword);

    const searchPage = new SearchPage(page);

    await searchPage.selectCity(warsawCity);
    await searchPage.search();
    await page.getByRole('link', { name: studioInOldTown }).first().click();
    await page.getByTestId('offer__name').click();

    await expect(page.getByTestId('offer__name')).toHaveText(studioInOldTown);
  });

  test('Reservation apartment by user', async ({ page }) => {
    const colosseum2 = offersData.romeOffer.title;
    const userName = reservationGuest.firstName;
    const userLastName = reservationGuest.lastName;

    const authNavigationPage = new AuthNavigationPage(page);
    const loginPage = new LoginPage(page);

    await authNavigationPage.openLoginForm();
    await loginPage.login(adminEmail, adminPassword);

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
