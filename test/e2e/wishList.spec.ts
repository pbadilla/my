import { test, expect } from "@playwright/test";

import { minimalMovie } from '../../src/utils/minimalMovie';

test.describe("Wishlist Page (fast, mocked)", () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "wishlist-storage",
        JSON.stringify({
          state: { items: [] },
          version: 0,
        })
      );
    });
  });

  test("should show NoPage when wishlist is empty", async ({ page }) => {
    await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

    await expect(page.getByTestId("no-page")).toBeVisible();
    await expect(
      page.getByText("Looks like this scene got lost")
    ).toBeVisible();
  });

  test("should display movies in wishlist", async ({ page }) => {
    const inception = minimalMovie({
      id: 123,
      title: "Inception",
      posterUrl: "/test-inception.jpg",
      genres: ["Sci-Fi", "Thriller"],
    });

    await page.addInitScript((movie) => {
      localStorage.setItem(
        "wishlist-storage",
        JSON.stringify({ state: { items: [movie] }, version: 0 })
      );
    }, inception);

    await page.goto("/wishlist");

    await expect(page.getByText("Inception")).toBeVisible({ timeout: 10000 });
  });

  test("should remove a movie from wishlist", async ({ page }) => {
    // Preload the movie into localStorage using the helper
    const darkKnight = minimalMovie({
      id: 456,
      title: "The Dark Knight",
      posterUrl: "/test-tdk.jpg",
      genres: ["Action"],
    });

    await page.addInitScript((movie) => {
      localStorage.setItem(
        "wishlist-storage",
        JSON.stringify({ state: { items: [movie] }, version: 0 })
      );
    }, darkKnight);

    await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

    // Locate the remove button for this movie
    const removeButton = page.getByTestId("remove-wishlist-button");
    await expect(removeButton).toBeVisible();

    await removeButton.click();

    // Verify the "removed" toast/message appears
    await expect(
      page.getByText("The Dark Knight removed from wishlist").first()
    ).toBeVisible({ timeout: 5000 });

    // Verify that the "NoPage" placeholder is visible now
    await expect(page.getByTestId("no-page")).toBeVisible();
  });


});
