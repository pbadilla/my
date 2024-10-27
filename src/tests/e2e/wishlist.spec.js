import { test, expect } from '@playwright/test';

test.describe('WishList Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/wishlist', { waitUntil: 'networkidle' });
  });

  test('renders the WishList component with Header, Body, and Footer', async ({ page }) => {
    await expect(page.locator('[data-testid="wishlist"]')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('[data-testid="wishlist-body"]')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('displays no wishlist message', async ({ page }) => {
    await page.goto('http://localhost:3001/wishlist', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-testid="wishlist-no-wishlist"]')).toBeVisible();
    await expect(page.locator('p.no-wishlist')).toContainText('No movies in your wishlist yet!');
  });

  // test('renders movies in the wishlist', async ({ page }) => {
  //   await expect(page.locator('[data-testid="wishlist-list"] [data-testid="wishlist-item"]')).toHaveCount(2);
  //   await expect(page.locator('[data-testid="wishlist-item"]').first().locator('img')).toHaveAttribute('alt', 'Poster of Movie Title 1');
  //   await expect(page.locator('[data-testid="wishlist-item"]').first().locator('span')).toContainText('Movie Title 1');
  // });

  // test('navigates to movie details on click', async ({ page }) => {
  //   await page.locator('[data-testid="wishlist-item"]').first().click();
  //   await expect(page).toHaveURL(/\/movie\/firstMovieType\/firstMovieId/);
  // });

  // test('removes a movie from the wishlist', async ({ page }) => {
  //   await page.locator('[data-testid="wishlist-item"]').first().locator('.delete-icon').click();
  //   await expect(page.locator('[data-testid="wishlist-list"]')).toHaveCount(1);
  // });
});
