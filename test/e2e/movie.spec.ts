import { test, expect } from "@playwright/test";

test.describe("Movie Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/movie/238", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 238,
          title: "The Godfather",
          category: "Crime / Drama",
          rating: "8.686",
          release_date: "1972-03-14",
          runtime: 175,
          overview:
            "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
          posterUrl: "/images/test-movie.jpg",
        }),
      });
    });

    await page.goto("/movie/238");
  });

  test("should display movie details correctly", async ({ page }) => {
    await expect(page.getByTestId("movie-title")).toHaveText("The Godfather");
    await expect(page.getByTestId("movie-rating")).toContainText("8.686");
    await expect(page.getByTestId("movie-release-date")).toContainText("1972-03-14");
    await expect(page.getByTestId("movie-runtime")).toContainText("175 min");
    await expect(page.getByTestId("movie-description")).toContainText(
      "Spanning the years 1945 to 1955"
    );
  });

  test("should add movie to wishlist", async ({ page }) => {
    const wishlistButton = page.getByTestId("wishlist-button");

    await expect(wishlistButton).toBeVisible();
    await expect(wishlistButton).toBeEnabled();

    await wishlistButton.click();

    await expect(
      page.getByText("The Godfather has been added to your wishlist!", { exact: true }).first()
    ).toBeVisible();

    await expect(wishlistButton).toHaveText("Add to Wishlist");
  });
});
