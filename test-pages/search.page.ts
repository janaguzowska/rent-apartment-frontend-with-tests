import { Locator, Page } from '@playwright/test';

export class SearchPage {
  private page: Page;
  private citySelect: Locator;
  private searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.citySelect = this.page.getByTestId('city-select');
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
  }

  async selectCity(city: string) {
    await this.citySelect.click();
    await this.page.getByRole('option', { name: city }).click();
  }

  async search() {
    await this.searchButton.click();
  }
}
