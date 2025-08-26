import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to homepage
    await page.goto("/");
  });

  test("should display home layout with hero section", async ({ page }) => {
    // Check if Layout hero section exists
    const hero = page.locator("header"); // adjust selector if needed
    await expect(hero).toBeVisible();
  });

  test("should render Top Rated Movies carousel", async ({ page }) => {
    const topRated = page.getByRole("heading", { name: "Top Rated Movies" });
    await expect(topRated).toBeVisible();
  });

  test("should render Popular Movies carousel", async ({ page }) => {
    const popular = page.getByRole("heading", { name: "Popular Movies" });
    await expect(popular).toBeVisible();
  });

  test("should render Upcoming Movies carousel", async ({ page }) => {
    const upcoming = page.getByRole("heading", { name: "Upcoming Movies" });
    await expect(upcoming).toBeVisible();
  });

  test("should allow navigation inside a carousel", async ({ page }) => {
    // Example: click on first movie card in Top Rated section
    const topRatedSection = page.locator("section:has-text('Top Rated Movies')");
    const firstCard = topRatedSection.locator(".movie-card").first();

    await expect(firstCard).toBeVisible();
    await firstCard.click();

    // Expect to navigate to a movie detail page (adjust URL pattern)
    await expect(page).toHaveURL(/\/movie\//);
  });
});
