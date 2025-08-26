import { test, expect } from "@playwright/test";

test.describe("Movie Page", () => {
  // navigate directly to a movie page (replace 123 with a real test movie ID in your DB / mock API)
  test.beforeEach(async ({ page }) => {
    await page.goto("/movie/123");
  });

  test("should display movie details correctly", async ({ page }) => {
    await expect(page.getByTestId("movie-page")).toBeVisible();
    await expect(page.getByTestId("movie-title")).toBeVisible();
    await expect(page.getByTestId("movie-category")).toBeVisible();
    await expect(page.getByTestId("movie-rating")).toBeVisible();
    await expect(page.getByTestId("movie-release-date")).toBeVisible();
    await expect(page.getByTestId("movie-runtime")).toBeVisible();
    await expect(page.getByTestId("movie-description")).toBeVisible();
    await expect(page.getByTestId("movie-poster")).toBeVisible();
  });

  test("should add movie to wishlist", async ({ page }) => {
    const wishlistButton = page.getByTestId("wishlist-button");

    // Click to add
    await wishlistButton.click();

    // Check toast appeared
    await expect(page.getByText("has been added to your wishlist")).toBeVisible();

    // Button should be disabled now
    await expect(wishlistButton).toBeDisabled();
  });

  test("should not add twice", async ({ page }) => {
    const wishlistButton = page.getByTestId("wishlist-button");

    // First click
    await wishlistButton.click();
    await expect(page.getByText("has been added to your wishlist")).toBeVisible();

    // Second click attempt
    await wishlistButton.click();
    await expect(page.getByText("is already in your wishlist")).toBeVisible();
  });
});
