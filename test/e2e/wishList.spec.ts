import { test, expect } from "@playwright/test";

test.describe("Wishlist Page (fast, mocked)", () => {
  // Preload empty wishlist for each test by default
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("wishlist", JSON.stringify([]));
    });
  });

  test("should show NoPage when wishlist is empty", async ({ page }) => {
    await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

    // Expect the NoPage component to render
    await expect(page.getByTestId("no-page")).toBeVisible();
    await expect(page.getByText("Looks like this scene got lost")).toBeVisible();
  });

  test("should display movies in wishlist", async ({ page }) => {
    // Preload a movie into wishlist
    await page.addInitScript(() => {
      localStorage.setItem(
        "wishlist",
        JSON.stringify([
          {
            id: "123",
            title: "Inception",
            category: "Sci-Fi",
            posterUrl: "/test-inception.jpg",
          },
        ])
      );
    });

    await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

    // Verify the movie card is visible
    await expect(page.getByText("Inception")).toBeVisible();
    await expect(page.getByText("Sci-Fi")).toBeVisible();
    await expect(page.getByRole("button", { name: "Remove" })).toBeVisible();
  });

  test("should remove a movie from wishlist", async ({ page }) => {
    // Preload a movie into wishlist
    await page.addInitScript(() => {
      localStorage.setItem(
        "wishlist",
        JSON.stringify([
          {
            id: "456",
            title: "The Dark Knight",
            category: "Action",
            posterUrl: "/test-tdk.jpg",
          },
        ])
      );
    });

    await page.goto("/wishlist", { waitUntil: "domcontentloaded" });

    const removeButton = page.getByRole("button", { name: "Remove" });

    // Click "Remove"
    await removeButton.click();

    // Check toast appears
    await expect(
      page.getByText("The Dark Knight removed from wishlist")
    ).toBeVisible();

    // Wishlist should now render NoPage again
    await expect(page.getByTestId("no-page")).toBeVisible();
  });
});
