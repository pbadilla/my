import { test, expect } from '@playwright/test';

test.describe('Home Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  });

  test('renders the Home component with Header, Body, and Footer', async ({ page }) => {
    await expect(page.locator('[data-testid="home"]')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('[data-testid="home-body"]')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('renders three Carousel components with correct types', async ({ page }) => {
    const carousels = page.locator('[data-testid="carousel"]');
    await expect(carousels).toHaveCount(3, { timeout: 10000 });

    await expect(carousels.nth(0)).toBeVisible();
    await expect(carousels.nth(1)).toBeVisible();
    await expect(carousels.nth(2)).toBeVisible();
  });

  test('scrolls through carousels and verifies items are displayed', async ({ page }) => {
    const carousels = page.locator('[data-testid="carousel"]');
    const count = await carousels.count();
  
    await expect(count).toBeGreaterThan(0);
  
    for (let i = 0; i < count; i++) {
      const carousel = carousels.nth(i);
      await carousel.scrollIntoViewIfNeeded();
      const items = carousel.locator('.carousel-item');
      const carouselItem = page.locator('figure.carousel-item_details').nth(0);
      await expect(carouselItem).toHaveClass(/carousel-item_details/);
    }
  });
});
