import { test, expect } from '@playwright/test';

test.describe('Movie Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/movie/top_rated/278', { waitUntil: 'networkidle' });
  });

  test('renders the Movie component with Header, Body, and Footer', async ({ page }) => {
    await expect(page.locator('[data-testid="movie"]')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('[data-testid="movie-body"]')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('renders movie details correctly', async ({ page }) => {
    await expect(page.locator('[data-testid="movies-container"] [data-testid="movie-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="movies-container"] [data-testid="movie-overview"]')).toBeVisible();
    await expect(page.locator('[data-testid="movies-container"] [data-testid="movie-popularity"]')).toBeVisible();
    await expect(page.locator('[data-testid="movies-container"] [data-testid="movie-genre"]')).toBeVisible();
  });

  // test('adds movie to wishlist', async ({ page }) => {
  //   await page.goto('http://localhost:3001/movie/top_rated/278', { waitUntil: 'networkidle' }); 
  //   await page.waitForSelector('#movie-button-wishlist', { state: 'visible', timeout: 60000 });
  //   const button = page.locator('#movie-button-wishlist');
  //   await expect(button).toHaveText('Add to whistList'); 
  //   await button.click({ timeout: 10000 }); 
  // });

  // test('navigates to movie homepage', async ({ page }) => {
  //     const homepageButton = page.locator('#movie-button-go-to-homepage');
  //     await homepageButton.waitFor({ state: 'visible' }); 
  //     await expect(homepageButton).toHaveText('Go to movie\'s homepage'); 
  //     await homepageButton.click({ timeout: 10000 });
  //     await expect(page).toHaveURL(/https:\/\/www.themoviedb.org/); 
  // });
  
});
